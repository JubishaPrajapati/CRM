const mongoose = require('mongoose');
const userMiddleware = require('../middleware/userMiddleware');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

//apply pre-save hook
UserSchema.pre('save', userMiddleware.preSave);

//instance method
UserSchema.methods.comparePassword = userMiddleware.comparePassword;

module.exports = mongoose.model('User', UserSchema, 'userDetails');