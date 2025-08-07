const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getAddresses,
  addAddress,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/userController');

// Address Routes
router.get('/addresses', auth, getAddresses);
router.post('/addresses', auth, addAddress);

// Profile Routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

module.exports = router;

