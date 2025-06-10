const Hamper = require('../models/Hamper');

// Create a new hamper
exports.createHamper = async (req, res) => {
  try {
    const hamper = await Hamper.create(req.body);
    res.status(201).json(hamper);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create hamper', details: err.message });
  }
};

// Get all hampers
exports.getAllHampers = async (req, res) => {
  try {
    const hampers = await Hamper.find();
    res.json(hampers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve hampers' });
  }
};

// Get a single hamper by ID
exports.getHamperById = async (req, res) => {
  try {
    const hamper = await Hamper.findById(req.params.id);
    if (!hamper) return res.status(404).json({ error: 'Hamper not found' });
    res.json(hamper);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching hamper' });
  }
};

// Update a hamper by ID
exports.updateHamper = async (req, res) => {
  try {
    const hamper = await Hamper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hamper) return res.status(404).json({ error: 'Hamper not found' });
    res.json(hamper);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update hamper' });
  }
};

// Delete a hamper by ID
exports.deleteHamper = async (req, res) => {
  try {
    const hamper = await Hamper.findByIdAndDelete(req.params.id);
    if (!hamper) return res.status(404).json({ error: 'Hamper not found' });
    res.json({ message: 'Hamper deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hamper' });
  }
};


