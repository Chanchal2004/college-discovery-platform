import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import createTables from './db/migrate';
import seedDatabase from './db/seed';

import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import savedRoutes from './routes/saved';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// FIXED CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/saved', savedRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

const start = async () => {
  try {
    await createTables();
    console.log('📦 Database tables ready');

    const { Pool } = require('pg');

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const count = await pool.query(
      'SELECT COUNT(*) FROM colleges'
    );

    if (parseInt(count.rows[0].count) === 0) {
      console.log('🌱 Seeding database...');
      await seedDatabase();
    } else {
      console.log(`📊 Database has ${count.rows[0].count} colleges`);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
