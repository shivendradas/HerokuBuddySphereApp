// routes/propertyRequests.js
const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
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
  const { EMAIL_USER, EMAIL_PASS, JWT_SECRET, CLIENT_URL, CLIENT_ID,
    CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
  /*  const oAuth2Client = new google.auth.OAuth2(
     CLIENT_ID,
     CLIENT_SECRET,
     REDIRECT_URI
   );
 console.log("Refresh Token", REFRESH_TOKEN);
   oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN }); */

  // Setup Nodemailer transporteCLIENT_SECRET r
  /* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    }
  }); */

  // Register new user and send verification email
  router.post('/registeruser/register', async (req, res) => {
    const { email, userId, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    // Additional validation here

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    const url = `${CLIENT_URL}/api/registeruser/verify-email?token=${token}`;

    /* const accessToken = await oAuth2Client.getAccessToken();
console.log("Access Token", accessToken.token);
console.log("Email User", EMAIL_USER);
console.log("Client ID", CLIENT_ID);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token
      },
      logger: true,
      debug: true
    }); */

    /* const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Please click this link to verify your email and complete registration:</p>
             <a href="${url}">${url}</a>`,
    }; */
    try {
      //await transporter.sendMail(mailOptions);
      await pool.query(
        `INSERT INTO users 
         (email, user_id, password, email_verified)
         VALUES ($1,$2,$3,$4)`,
        [email, userId, password, true]
      );
      // TODO: email verification do later
      //res.json({ message: 'Verification email sent. Please click on verify link and then login.' });
      res.json({ message: 'Registration successful. You can now log in.' });
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
