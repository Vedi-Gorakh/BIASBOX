const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');

// POST create order
router.post('/', auth, async (req, res) => {
  const order = new Order({
    ...req.body,
    userId: req.user.id,
    date: new Date().toLocaleDateString('en-IN')
  });

  const saved = await order.save();
  res.json(saved);
});

// GET user's orders
router.get('/my-orders', auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

module.exports = router;
