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
app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const allowedOrigins = [
  'https://buddysphere-1lbl.onrender.com',
  'https://communityaidhub.com',
  'https://www.communityaidhub.com'
];
// Allow your frontend origin
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS origin:', origin);
    // allow requests with no origin, like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
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

// Pass pool to travelRequestsRouter
const travelRequestsRouter = require('./routes/travelRequests')(pool);
const propertyRequestsRouter = require('./routes/propertyRequests')(pool);
const registerUserRequestsRouter = require('./routes/registerUserRequests')(pool);
const matchMakingRequestRouter = require('./routes/matchMakingRequests')(pool);
const browseAdRequestRouter = require('./routes/browseAdRequests')(pool);

app.use('/api', travelRequestsRouter);
app.use('/api', propertyRequestsRouter);
app.use('/api', registerUserRequestsRouter);
app.use('/api', matchMakingRequestRouter);
app.use('/api', browseAdRequestRouter);

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
