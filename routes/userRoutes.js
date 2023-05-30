const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// Get user details route (protected with JWT middleware)
router.get('/:userId', jwtMiddleware.verifyToken, userController.getUserDetails);

module.exports = router;
