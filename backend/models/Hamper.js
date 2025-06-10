// models/Hamper.js
const mongoose = require('mongoose');

const hamperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Food', 'Wine', 'Spa', 'Baby', 'Other'],
      default: 'Other',
    },
    itemsIncluded: {
      type: [String], // array of item names
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hamper', hamperSchema);
