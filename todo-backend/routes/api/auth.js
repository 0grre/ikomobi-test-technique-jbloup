require('dotenv').config({ path: '../../.env' });
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials 2'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials 3'});
    }

    const payload = {
      user: {
        id: user.id
      }
    };

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
    console.error('Server error: ', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
