const express = require('express');
const app = express();
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hamperly API is running');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
