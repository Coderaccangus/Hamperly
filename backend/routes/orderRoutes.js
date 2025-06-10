const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders
} = require('../controllers/orderController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Admin-only
router.get('/', protect, adminOnly, getAllOrders);

module.exports = router;
