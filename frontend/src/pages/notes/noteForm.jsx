import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getNoteById, updateNote, createNote } from '../../services/noteService';
import { getAllClients } from '../../services/clientService';
import './noteForm.css';

const NoteForm = () => {
    const { id } = useParams();

    //to get ?Clinetid for add note inside client detail
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const clientIdFromQuery = queryParams.get('clientId');

    //to redirect after updating or adding note from within clientdetail
    const from = queryParams.get('from');

    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [noteData, setNoteData] = useState({ client: '', content: '' });

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getAllClients();
            setClients(data);

            // If adding a new note and clientId is in URL, pre-select it
            if (!id && clientIdFromQuery) {
                setNoteData(prev => ({
                    ...prev, client: clientIdFromQuery,
                }))
            }
        };
        fetchClients();
    }, [id, clientIdFromQuery]);

    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                const res = await getNoteById(id);
                setNoteData({
                    client: res.client?._id || res.client,
                    content: res.content,
                });
            };
            fetchNote();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateNote(id, noteData);
            } else {
                await createNote(noteData);
            }
            navigate('/notes');

            //if adding or uodating from within clientdetail
            if (from === 'clientDetail') {
                navigate(`/clients/${noteData.client}`)
            } else {
                navigate('/notes')
            }
        } catch (err) {
            console.error('Error saving note:', err);
        }
    };

    return (
        <div className="note-form-page">
            <h2>{id ? 'Edit Note' : 'Add New Note'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="client">Client</label>
                    <select
                        id="client"
                        name="client"
                        value={noteData.client}
                        onChange={handleChange}
                        required
                        disabled={Boolean(clientIdFromQuery)}
                    >
                        <option value="">Select Client</option>
                        {clients.map(client => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Note</label>
                    <textarea
                        id="content"
                        name="content"
                        value={noteData.content}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">{id ? 'Update' : 'Add'} Note</button>
            </form>
        </div>
    );
};

export default NoteForm;
