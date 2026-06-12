const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  registrations: {
    type: Number,
    required: true,
    min: 0
  },
  time: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon', 'evening'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
