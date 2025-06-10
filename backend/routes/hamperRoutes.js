const express = require('express');
const router = express.Router();

const {
  getAllHampers,
  getHamperById,
  createHamper,
  updateHamper,
  deleteHamper
} = require('../controllers/hamperController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllHampers);
router.get('/:id', getHamperById);

// Admin routes
router.post('/', protect, adminOnly, createHamper);
router.put('/:id', protect, adminOnly, updateHamper);
router.delete('/:id', protect, adminOnly, deleteHamper);

module.exports = router;
