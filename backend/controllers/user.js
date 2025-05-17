const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//register new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log('New user saved:', newUser);
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "Registration failed." });
    }
}

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
        console.log("Login response sent:", { token, userId: user._id });

        return res.status(200).json({ token, userId: user._id, userName: user.name, });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });

    }
}