const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getAllUsers, getAllOrders } = require('../controllers/adminController');

// Example admin-only routes
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/orders', protect, adminOnly, getAllOrders);

module.exports = router;
