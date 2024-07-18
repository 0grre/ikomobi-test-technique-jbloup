require('dotenv').config({ path: '../.env' });
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received with email:', email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    console.log('Creating JWT token with payload:', payload);

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          console.log('JWT token created:', token);
          res.json({ token });
        }
    );
  } catch (err) {
    console.error('Server error: '+process.env.JWT_SECRET, err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
