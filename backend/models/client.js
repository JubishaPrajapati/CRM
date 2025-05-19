const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: String,
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'interested', 'closed'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

clientSchema.virtual('notes', {
    ref: 'note',
    localField: '_id',
    foreignField: 'client',
})

module.exports = mongoose.model('client', clientSchema);