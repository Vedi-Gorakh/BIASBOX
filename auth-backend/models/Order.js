const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  color: String,
  price: Number,
  status: { type: String, default: 'PROCESSING' },
  date: String,
  imageUrl: String,
});

module.exports = mongoose.model("Order", orderSchema);
