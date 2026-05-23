import { Router, Response } from 'express';
import pool from '../config/database';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Get saved colleges
router.get('/colleges', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT c.*, sc.created_at as saved_at FROM saved_colleges sc
       JOIN colleges c ON c.id = sc.college_id
       WHERE sc.user_id = $1 ORDER BY sc.created_at DESC`,
      [req.userId]
    );
    res.json({ colleges: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save/unsave a college
router.post('/colleges/:collegeId', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { collegeId } = req.params;
    const existing = await pool.query('SELECT id FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [req.userId, collegeId]);
    if (existing.rows.length > 0) {
      await pool.query('DELETE FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [req.userId, collegeId]);
      res.json({ saved: false, message: 'College removed from saved' });
    } else {
      await pool.query('INSERT INTO saved_colleges (user_id, college_id) VALUES ($1, $2)', [req.userId, collegeId]);
      res.json({ saved: true, message: 'College saved' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get saved comparisons
router.get('/comparisons', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM saved_comparisons WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
    const comparisons = [];
    for (const comp of result.rows) {
      const placeholders = comp.college_ids.map((_: any, i: number) => `$${i + 1}`).join(',');
      const colleges = await pool.query(`SELECT id, name, rating, location FROM colleges WHERE id IN (${placeholders})`, comp.college_ids);
      comparisons.push({ ...comp, colleges: colleges.rows });
    }
    res.json({ comparisons });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save a comparison
router.post('/comparisons', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, college_ids } = req.body;
    if (!name || !college_ids || college_ids.length < 2) {
      res.status(400).json({ error: 'Name and at least 2 college IDs required' });
      return;
    }
    const result = await pool.query(
      'INSERT INTO saved_comparisons (user_id, name, college_ids) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, name, college_ids]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a saved comparison
router.delete('/comparisons/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await pool.query('DELETE FROM saved_comparisons WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
    res.json({ message: 'Comparison deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
