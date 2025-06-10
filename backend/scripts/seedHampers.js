// scripts/seedHampers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hamper = require('../models/Hamper');

dotenv.config();

const hampers = [
  {
    name: 'Deluxe Spa Hamper',
    description: 'Relaxing spa products including bath salts, essential oils, and a scented candle.',
    price: 79.99,
    category: 'Spa',
    itemsIncluded: ['Bath salts', 'Essential oils', 'Candle'],
    stock: 10
  },
  {
    name: 'Gourmet Food Hamper',
    description: 'Includes artisan crackers, cheeses, and jams for food lovers.',
    price: 89.95,
    category: 'Food',
    itemsIncluded: ['Crackers', 'Cheese', 'Jam'],
    stock: 15
  },
  {
    name: 'Newborn Baby Hamper',
    description: 'A thoughtful gift with soft toys, baby clothes, and baby lotion.',
    price: 65.00,
    category: 'Baby',
    itemsIncluded: ['Plush toy', 'Baby bodysuit', 'Lotion'],
    stock: 8
  }
];

const seedHampers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Hamper.insertMany(hampers);
    console.log('✅ Hampers seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding hampers:', err);
    process.exit(1);
  }
};

seedHampers();
