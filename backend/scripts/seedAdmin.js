require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = process.env.MONGODB_URI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const existingAdmin = await User.findOne({ email: 'admin1@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit();
    }

    await User.create({
      name: 'Admin1',
      email: 'admin1@example.com',
      password: 'Admin1234',
      role: 'admin'
    });

    console.log('✅ Admin user seeded!');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to seed admin:', err);
    process.exit(1);
  }
};

seedAdmin();
