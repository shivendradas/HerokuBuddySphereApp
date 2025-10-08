// routes/propertyRequests.js
const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

module.exports = (pool) => {
  // Create Table if not exists
  pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(50) PRIMARY KEY,
      user_id VARCHAR(25),
      password VARCHAR(25),
      email_verified boolean DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const { EMAIL_USER, EMAIL_PASS, JWT_SECRET, CLIENT_URL } = process.env;

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or 587
    secure: true, // true for 465, false for 587
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // Register new user and send verification email
  router.post('/registeruser/register', async (req, res) => {
    const { email, userId, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    // Additional validation here

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    const url = `${CLIENT_URL}/api/registeruser/verify-email?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Please click this link to verify your email and complete registration:</p>
             <a href="${url}">${url}</a>`,
    };
    try {
      await transporter.sendMail(mailOptions);
      await pool.query(
        `INSERT INTO users 
         (email, user_id, password, email_verified)
         VALUES ($1,$2,$3,$4)`,
        [email, userId, password, false]
      );
      res.json({ message: 'Verification email sent. Please click on verify link and then login.' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send verification email' });
    }
  });

  // Verify email route
  router.get('/registeruser/verify-email', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(400).json({ message: 'Token is missing' });

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      await pool.query(
        `UPDATE users SET email_verified = $1 WHERE email = $2`,
        [true, payload.email]
      );
      res.json({ message: 'Email verified successfully!', email: payload.email });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  });

  // New Login Route
  router.post('/registeruser/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Find user by email
      const result = await pool.query(
        'SELECT email, password, email_verified FROM users WHERE email = $1',
        [email]
      );
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const user = result.rows[0];

      // Check if email is verified
      if (!user.email_verified) {
        return res.status(403).json({ message: 'Please verify your email before logging in' });
      }

      // Check password match - for security, consider hashing passwords in production
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Optional: create JWT token for session
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  });

  return router;
};
