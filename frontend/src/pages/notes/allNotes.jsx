import React, { useEffect, useState } from 'react';
import { getAllNote, deleteNote } from '../../services/noteService';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './allNotes.css';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getAllNote();
                setNotes(data);
            } catch (error) {
                console.error('Error fetching all notes:', error);
            }
        }
        fetchNotes();
    }, []);

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


    return (
        <div className="all-notes">
            <h2>All Notes</h2>
            <button className='add-note-btn' onClick={() => navigate('/notes/new')}> Add New Note</button>
            {notes.length == 0 ? (
                <p>No Notes found.</p>
            ) : (
                <ul className='note-list'>
                    {notes.map((note) => (
                        <li key={note._id} className='note-item'>
                            <div className="note-header">
                                <strong>Client:</strong> {note.client?.name || 'Unknown'}
                            </div>
                            <div className="note-content">
                                <p>{note.content}</p>
                                <div className="note-footer">
                                    <small>{new Date(note.createdAt).toLocaleString()}</small>
                                    <div className="note-actions">
                                        <button
                                            onClick={() => navigate(`/notes/edit/${note._id}`)}
                                            className='edit-btn'
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note._id)}
                                            className='delete-btn'
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}
export default AllNotes;