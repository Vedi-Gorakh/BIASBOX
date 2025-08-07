const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN USER
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                addresses: user.addresses || []
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET SAVED ADDRESSES
exports.getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.addresses || []);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ADD NEW ADDRESS
exports.addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.addresses.push(req.body); // req.body should have {street, city, state, zip}
        await user.save();
        res.status(201).json({ message: "Address added", addresses: user.addresses });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, email },
            { new: true }
        ).select('-password');
        res.json({ message: "Profile updated", user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: "Old password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

