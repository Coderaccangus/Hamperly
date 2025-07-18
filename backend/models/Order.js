// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hamper: { type: mongoose.Schema.Types.ObjectId, ref: 'Hamper', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
