const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('note', noteSchema)