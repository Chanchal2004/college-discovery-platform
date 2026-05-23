import pool from '../config/database';

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Colleges table
    await client.query(`
      CREATE TABLE IF NOT EXISTS colleges (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'Private',
        established INTEGER,
        rating DECIMAL(2,1) NOT NULL DEFAULT 0,
        fees_min INTEGER NOT NULL DEFAULT 0,
        fees_max INTEGER NOT NULL DEFAULT 0,
        description TEXT,
        image_url VARCHAR(500),
        tags TEXT[],
        campus_size VARCHAR(100),
        website VARCHAR(255),
        placement_rate DECIMAL(4,1),
        avg_package DECIMAL(10,2),
        highest_package DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_colleges_rating ON colleges (rating DESC)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_colleges_fees_min ON colleges (fees_min)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_colleges_placement_rate ON colleges (placement_rate DESC)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_colleges_tags ON colleges USING GIN (tags)');

    // Ensure tags column exists on existing installations
    await client.query('ALTER TABLE colleges ADD COLUMN IF NOT EXISTS tags TEXT[]');

    // Courses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        fees INTEGER NOT NULL,
        degree_type VARCHAR(50) NOT NULL,
        description TEXT
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses (college_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_courses_name ON courses (name)');

    // Placements table
    await client.query(`
      CREATE TABLE IF NOT EXISTS placements (
        id SERIAL PRIMARY KEY,
        college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
        year INTEGER NOT NULL,
        placement_rate DECIMAL(4,1),
        avg_package DECIMAL(10,2),
        highest_package DECIMAL(10,2),
        students_placed INTEGER,
        total_students INTEGER,
        top_recruiters TEXT[]
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_placements_college_id ON placements (college_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_placements_year ON placements (year DESC)');

    // Reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
        author VARCHAR(255) NOT NULL,
        rating DECIMAL(2,1) NOT NULL,
        title VARCHAR(255),
        comment TEXT NOT NULL,
        pros TEXT,
        cons TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_reviews_college_id ON reviews (college_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews (created_at DESC)');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email)');

    // Saved colleges
    await client.query(`
      CREATE TABLE IF NOT EXISTS saved_colleges (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, college_id)
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_saved_colleges_user_id ON saved_colleges (user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_saved_colleges_college_id ON saved_colleges (college_id)');

    // Saved comparisons
    await client.query(`
      CREATE TABLE IF NOT EXISTS saved_comparisons (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        college_ids INTEGER[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_saved_comparisons_user_id ON saved_comparisons (user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_saved_comparisons_created_at ON saved_comparisons (created_at DESC)');

    await client.query('COMMIT');
    console.log('✅ All tables created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default createTables;
