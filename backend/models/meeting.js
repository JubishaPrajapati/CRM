const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    agenda: {
        type: String,
        required: true,
    },
    reminderSent: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('meeting', meetingSchema);