const mongoose = require('mongoose');
const env = require('../config/env');
const Event = require('../model/Event');
const dummyEvents = require('../config/mockEvents');

async function seedDatabase() {
  console.log(`Connecting to MongoDB at: ${env.MONGODB_URI}`);

  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB connection successful!");

    // Clear existing events
    await Event.deleteMany({});
    console.log("Cleared existing events from database.");

    // Insert dummy events
    const inserted = await Event.insertMany(dummyEvents);
    console.log(`Successfully seeded database with ${inserted.length} dummy events!`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
}

seedDatabase();
