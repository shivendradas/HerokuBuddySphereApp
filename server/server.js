// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
/* const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}); */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: { rejectUnauthorized: false } // Required for Render
  ssl: false
});

// Create Table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS travel_requests (
    id SERIAL PRIMARY KEY,
    from_city VARCHAR(100),
    to_city VARCHAR(100),
    date_time TIMESTAMP,
    name VARCHAR(100),
    mobile VARCHAR(20),
    email VARCHAR(100)
  );
`);

// Add Request
app.post('/api/addRequest', async (req, res) => {
  const { from, to, dateTime, name, mobile, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO travel_requests (from_city, to_city, date_time, name, mobile, email) VALUES ($1, $2, $3, $4, $5, $6)',
      [from, to, dateTime, name, mobile, email]
    );
    res.status(200).json({ message: 'Request added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add request' });
  }
});

// Find Buddy
app.get('/api/findBuddy', async (req, res) => {
  const { from, to, date } = req.query;
  try {
    const query = `
      SELECT * FROM travel_requests
      WHERE from_city = $1 AND to_city = $2 AND DATE(date_time) = $3
      ORDER BY date_time ASC;
    `;
    const result = await pool.query(query, [from, to, date]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch buddy data' });
  }
});

// Serve React static files in production
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});