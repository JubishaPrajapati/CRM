const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('task', taskSchema);