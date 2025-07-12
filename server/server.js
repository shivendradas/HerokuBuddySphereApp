const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
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
  ssl: { rejectUnauthorized: false } // Required for Render
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
    email VARCHAR(100),
    user_type VARCHAR(20),
    description VARCHAR(100)
  );
`);

// ➕ Add Request API (with userType & description)
app.post('/api/addRequest', async (req, res) => {
  const { from, to, dateTime, name, mobile, email, userType, description } = req.body;
  try {
    await pool.query(
      `INSERT INTO travel_requests 
       (from_city, to_city, date_time, name, mobile, email, user_type, description) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [from, to, dateTime, name, mobile, email, userType, description]
    );
    res.status(200).json({ message: 'Request added successfully' });
  } catch (err) {
    console.error('Error inserting request:', err);
    res.status(500).json({ error: 'Failed to add request' });
  }
});

// 🔍 Find Buddy API (returns new fields too)
app.get('/api/findBuddy', async (req, res) => {
  const { from, to, fromDate, toDate, userType } = req.query;

  try {
    let conditions = [];
    let values = [];
    let idx = 1;

    if (from) {
      conditions.push(`from_city = $${idx++}`);
      values.push(from);
    }
    if (to) {
      conditions.push(`to_city = $${idx++}`);
      values.push(to);
    }
    if (fromDate) {
      conditions.push(`date_time >= $${idx++}`);
      values.push(fromDate);
    }
    if (toDate) {
      conditions.push(`date_time <= $${idx++}`);
      values.push(toDate);
    }
    if (userType) {
      conditions.push(`user_type = $${idx++}`);
      values.push(userType);
    }

    let query = `SELECT * FROM travel_requests`;
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY date_time ASC`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching buddy data:', err);
    res.status(500).json({ error: 'Failed to fetch buddy data' });
  }
});


// 🌐 Serve React static files in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");

  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    app.get("*", (req, res) => {
      const indexPath = path.join(buildPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(500).send("Build index.html not found");
      }
    });
  } else {
    console.warn("⚠️ Build folder not found. React app won't be served.");
  }
}

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
