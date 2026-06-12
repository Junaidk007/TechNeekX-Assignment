const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Database] MongoDB connection established successfully.');
  } catch (err) {
    console.warn('[Database WARNING] Could not connect to MongoDB. Server will fall back to using in-memory mock data.');
    console.warn(`[Database WARNING Detail] ${err.message}`);
  }
};

module.exports = connectDB;
