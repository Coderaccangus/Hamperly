const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = async (userId) => {
  const user = await User.findById(userId);
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({ name, email, password, role });
    const token = await generateToken(user._id);


    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err); 
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role 
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
