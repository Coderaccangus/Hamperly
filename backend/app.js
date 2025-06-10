const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

dotenv.config();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Middleware to parse JSON
app.use(express.json());

// Route imports
const userRoutes = require('./routes/userRoutes');
const hamperRoutes = require('./routes/hamperRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/hampers', hamperRoutes);
app.use('/api/orders', orderRoutes);


// Base route
app.get('/', (req, res) => {
  res.send('Hamperly API is running');
});

module.exports = app;

// Start server only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
