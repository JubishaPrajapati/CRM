import { useEffect, useState, useContext } from 'react';
import { deleteNote } from '../../services/noteService';
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
                setNotes((prevNotes) => prevNotes.filter(note => note._id !== noteId))
            } catch (error) {
                console.error('Error deleting note:', error)
            }
        }
    }

    const handleEdit = (note) => {
        setEditNoteId(note._id);
        setEditedContent(note.content);
    };

    const handleCancel = () => {
        setEditNoteId(null);
        setEditedContent('');
    }

    useEffect(() => {
        if (selectedClient?._id) {
            fetchNotes(selectedClient._id);
        }
    }, [selectedClient]);


    return (
        <div className='note-list'>
            <h3>Notes for {selectedClient?.name}</h3>

            {notes.length == 0 ? (
                <p>No notes found.</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li key={note._id} className='note-item'>
                            {editNoteId === note._id ? (
                                <div className="edit-form">
                                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                                    <div className="note-actions">
                                        <button onClick={() => handleSave(note._id)} className='save-btn'>Save</button>
                                        <button onClick={handleCancel} className='cancel-btn'>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="note-content">{note.content}</div>
                                    <div className="note-footer">
                                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                                        <div>
                                            <button onClick={() => handleEdit(note)} className='edit-btn'>Edit</button>
                                            <button onClick={() => handleDelete(note._id)} className='delete-btn'>Delete</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default NoteList;