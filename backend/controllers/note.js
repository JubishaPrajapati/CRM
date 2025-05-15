const Note = require('../models/note');

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all notes  counts
exports.getNoteCount = async (req, res) => {
    try {
        const count = await Note.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get  single client by id
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get all notes with client name 
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate('client', 'name');;
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get notes for a client
exports.getNotesByClientId = async (req, res) => {
    try {
        const notes = await Note.find({ client: req.params.clientId }).populate('client');
        if (!notes || notes.length === 0) return res.status(404).json({ error: 'No notes found for this client' });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
