require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/event-recommendation"
};

module.exports = env;