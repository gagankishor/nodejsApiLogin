const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secretKey = 'my_secret_key'; 

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      return res.status(500).json({ error: 'An error occurred while registering user' });
    }

    User.register(name, email, hashedPassword, (error, userId) => {
      if (error) {
        return res.status(500).json({ error: 'An error occurred while registering user' });
      }
      return res.json({ userId });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.login(email, password, (error, user) => {
    if (error) {
      return res.status(500).json({ error: 'An error occurred while logging in' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) {
        return res.status(500).json({ error: 'An error occurred while logging in' });
      }
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

      return res.json({ token });
    });
  });
};

exports.getUserDetails = (req, res) => {
  const userId = req.params.userId;

  User.getUserById(userId, (error, user) => {
    if (error) {
      return res.status(500).json({ error: 'An error occurred while fetching user details' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user });
  });
};
