const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, email },
            { new: true, runValidators: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
