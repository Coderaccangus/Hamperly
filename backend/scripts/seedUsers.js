require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = process.env.MONGODB_URI;

const users = [
  { name: 'User One', email: 'user1@example.com', password: 'Password123', role: 'user' },
  { name: 'User Two', email: 'user2@example.com', password: 'Password123', role: 'user' },
  { name: 'User Three', email: 'user3@example.com', password: 'Password123', role: 'user' }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await User.insertMany(users);
    console.log('✅ Seeded 3 users successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to seed users:', err);
    process.exit(1);
  }
};

seedUsers();
