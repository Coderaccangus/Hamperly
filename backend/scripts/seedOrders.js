// scripts/seedOrders.js

require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Hamper = require('../models/Hamper');

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding orders');

    // Fetch a user
    const user = await User.findOne();
    if (!user) throw new Error('No user found to assign orders');

    // Fetch 3 hampers
    const hampers = await Hamper.find().limit(3);
    if (hampers.length < 3) throw new Error('Not enough hampers to create orders');

    // Clear existing orders
    await Order.deleteMany();

    const sampleOrders = [
      {
        user: user._id,
        hamper: hampers[0]._id,
        quantity: 1,
        totalPrice: hampers[0].price,
        status: 'completed',
      },
      {
        user: user._id,
        hamper: hampers[1]._id,
        quantity: 2,
        totalPrice: hampers[1].price * 2,
        status: 'completed',
      },
      {
        user: user._id,
        hamper: hampers[2]._id,
        quantity: 1,
        totalPrice: hampers[2].price,
        status: 'completed',
      }
    ];

    await Order.insertMany(sampleOrders);
    console.log('✅ Seeded 3 completed orders');
  } catch (err) {
    console.error('❌ Failed to seed orders:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedOrders();
