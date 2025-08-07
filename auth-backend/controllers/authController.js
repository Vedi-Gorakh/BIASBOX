// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            console.log("❌ Register attempt failed: User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        console.log("✅ New user registered:", user.email);

        res.status(201).json({ 
            message: "User created successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (err) {
        console.error("❌ Error in register:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Login failed: User not found");
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Login failed: Wrong password");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        console.log("✅ Login successful:", user.email);

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (err) {
        console.error("❌ Error in login:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
