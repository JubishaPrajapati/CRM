const express = require('express');
const router = express.Router();
const { createNote, getNoteCount, getAllNotes, getNotesByClientId, getNoteById, updateNote, deleteNote } = require('../controllers/note');

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/noteCount', getNoteCount);
router.get('/:id', getNoteById);
router.get('/client/:clientId', getNotesByClientId);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
