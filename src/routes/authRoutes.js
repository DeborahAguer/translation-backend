// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // JWT authentication middleware

const router = express.Router();

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// Protected route to get the logged-in user's profile
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;
