const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get current user's profile
router.get('/', authMiddleware, getProfile);

// Update profile details
router.put('/', authMiddleware, updateProfile);

module.exports = router;
