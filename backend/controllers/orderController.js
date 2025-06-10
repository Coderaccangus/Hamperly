const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = {
      user: req.user.userId, // pulled from token
      hamper: req.body.hamper,
      quantity: req.body.quantity,
      deliveryAddress: req.body.deliveryAddress
    };

    const order = await Order.create(newOrder);
    res.status(201).json(order);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('hamper');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('hamper');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

// Get orders for the logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('hamper');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};
