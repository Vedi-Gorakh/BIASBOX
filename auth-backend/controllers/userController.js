const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 📦 GET saved addresses
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.addresses || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
};

// ➕ POST add new address
exports.addAddress = async (req, res) => {
  const { street, city, state, zip } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.addresses.push({ street, city, state, zip });
    await user.save();
    res.status(201).json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: "Error adding address" });
  }
};

// 🙋‍♂️ GET profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// ✏️ PUT update profile
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// 🔒 PUT change password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password" });
  }
};
