const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const exists = await User.findOne({ email });
        if (exists) {
            console.log("❌ Register attempt failed: User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Login failed: User not found");
            return res.status(400).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
