const express = require('express');
const translationController = require('../controllers/translationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to search or view translations
router.get('/search', translationController.getTranslations); // Confirmed to use getTranslations

// Protected route to add a new translation
router.post('/add', authMiddleware, translationController.addTranslation);

module.exports = router;
