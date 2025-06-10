// scripts/clearHampers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hamper = require('../models/Hamper');

dotenv.config();

const clearHampers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Hamper.deleteMany();
    console.log('🧹 All hampers cleared');
    process.exit();
  } catch (err) {
    console.error('❌ Error clearing hampers:', err);
    process.exit(1);
  }
};

clearHampers();
