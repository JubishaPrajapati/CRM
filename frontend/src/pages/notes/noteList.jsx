import { useEffect, useState, useContext } from 'react';
import { deleteNote, updateNote } from '../../services/noteService';
import { ClientContext } from '../../contexts/clientContext';
import { useNoteContext } from '../../contexts/noteContext';
import './noteList.css';

const NoteList = () => {
    const { selectedClient } = useContext(ClientContext);
    const { notes, setNotes, fetchNotes } = useNoteContext();
    const [editNoteId, setEditNoteId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const handleDelete = async (noteId) => {
        if (window.confirm("Delete this note?")) {
            try {
                await deleteNote(noteId);
                setNotes((prevNotes) => prevNotes.filter(note => note._id !== noteId));
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const handleEdit = (note) => {
        setEditNoteId(note._id);
        setEditedContent(note.content);
    };

    const handleSave = async (noteId) => {
        try {
            await updateNote(noteId, editedContent);
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === noteId ? { ...note, content: editedContent } : note
                )
            );
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    useEffect(() => {
        if (selectedClient?._id) {
            fetchNotes(selectedClient._id);
        }
    }, [selectedClient]);

    return (
        <div className='note-list'>
            <h3>Notes for {selectedClient?.name}</h3>

            {notes.length === 0 ? (
                <p>No notes found.</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li key={note._id} className='note-item'>
                            {editNoteId === note._id ? (
                                <div className="edit-form">
                                    <textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleSave(note._id)}
                                        className='update-btn'
                                    >
                                        Update Note
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="note-content">{note.content}</div>
                                    <div className="note-footer">
                                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                                        <div>
                                            <button
                                                onClick={() => handleEdit(note)}
                                                className='edit-btn'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(note._id)}
                                                className='delete-btn'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoteList;
