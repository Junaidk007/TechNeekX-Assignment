const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const connectDB = require('./config/db');
const recommendationRouter = require('./routers/recommendationRouter');
const eventCreateRouter = require('./routers/eventCreateRoute');

const app = express();

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Initialize Database Connection
connectDB();

// API Routes
app.use('/api', recommendationRouter);
app.use('/api', eventCreateRouter);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(env.PORT, () => {
  console.log(`[Server] Express running at http://localhost:${env.PORT}`);
});
