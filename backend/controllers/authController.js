const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

require('dotenv').config();