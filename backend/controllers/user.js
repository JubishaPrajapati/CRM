const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        // console.log("Login response sent:", { token, userId: user._id });

        return res.status(200).json({ token, userId: user._id, userName: user.name, });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });

    }
}