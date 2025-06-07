const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Route imports
const userRoutes = require('./routes/userRoutes');

// Mount routes
app.use('/api/users', userRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Hamperly API is running');
});

module.exports = app;

// Start server only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
