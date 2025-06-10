require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = process.env.MONGODB_URI;

const clearUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const result = await User.deleteMany({});
    console.log(`🗑️ Cleared ${result.deletedCount} user(s) from the database`);
    process.exit();
  } catch (err) {
    console.error('❌ Failed to clear users:', err);
    process.exit(1);
  }
};

clearUsers();
