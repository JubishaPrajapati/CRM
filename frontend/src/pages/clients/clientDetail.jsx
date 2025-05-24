import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getClientById } from '../../services/clientService';
import { getMeetingByClientId } from '../../services/meetingService';
import { ClientContext } from '../../contexts/clientContext';
import { deleteNote, getNotesByClientId } from '../../services/noteService';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './clientDetail.css';

const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setSelectedClient, setSelectedClientId } = useContext(ClientContext);

    const [client, setClient] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [notes, setNotes] = useState([]);

    //fetch client
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(id);
                setClient(data);                    //setting client data in local state
                setSelectedClient(data);            //setting client data in context provider for other comp
                setSelectedClientId(data._id);      //updating selected client id in context
            } catch (error) {
                console.error('Error fetchimg client:', error);
            }
        }
        fetchClient();
    }, [id, setSelectedClient, setSelectedClientId]);

    //fetch meeting for this client
    useEffect(() => {
        if (id) {
            const fetchMeetings = async () => {
                try {
                    const data = await getMeetingByClientId(id);
                    setMeetings(data);
                } catch (error) {
                    console.error('Error fetching meetings:', error);
                }
            }
            fetchMeetings();
        }
    }, [id]);

    //fetch notes for this client
    useEffect(() => {
        if (id) {
            const fetchNotes = async () => {
                try {
                    const data = await getNotesByClientId(id);
                    setNotes(data);
                } catch (error) {
                    console.error('Error fetching notes:', error);
                }
            }
            fetchNotes();
        }
    }, [id]);

    const handleDeleteNote = async (noteId) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(noteId);
                setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    }


    if (!client) return <p>Loading...</p>

    return (
        <div className='client-detail'>
            <h2> Overall Client Detail</h2>
            <div className='top-section'>
                <div className='client-card'>
                    <h3>Client Information</h3>
                    <p><strong>Name:</strong> {client.name}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Phone:</strong> {client.phone}</p>
                    <p><strong>Address:</strong> {client.address}</p>
                    <p><strong>Status:</strong> {client.status}</p>
                    <p><strong>Created At:</strong> {new Date(client.createdAt).toLocaleString()}</p>
                </div>


                {/* Meetings Section */}
                <div className="meetings-section">
                    <h3>Meetings</h3>
                    {meetings.length === 0 ? (
                        <p>No meetings yet.</p>
                    ) : (
                        <ul className='meeting-list'>
                            {meetings.map((meeting) => (
                                <li key={meeting._id} className='meeting-item'>
                                    <p><strong>Agenda:</strong> {meeting.agenda}</p>
                                    <p><strong>Date:</strong> {new Date(meeting.date).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {meeting.time}</p>
                                    <p><strong>Location:</strong> {meeting.location}</p>
                                    <div className="meeting-actions">
                                        <button
                                            onClick={() => navigate(`/meetings/edit/${meeting._id}?from=clientDetail`)}
                                            className='clientDetail-meetingedit-btn'
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>

            {/* Notes Section */}
            <div className="notes-section">
                <h3>Notes</h3>
                <button
                    className='clientDetail-noteadd-btn'
                    onClick={() => navigate(`/notes/new?clientId=${id}&from=clientDetail`)}
                >
                    Add New Note
                </button>

                {notes.length === 0 ? (
                    <p>No notes yet.</p>
                ) : (
                    <ul className='clientDetail-note-list'>
                        {notes.map(note => (
                            <li key={note._id} className='note-item'>
                                <div className="note-content">
                                    <p>{note.content}</p>
                                    <div className="note-footer">
                                        <small>{new Date(note.createdAt).toLocaleString()}</small>
                                        <div className="note-actions">
                                            <button
                                                onClick={() => navigate(`/notes/edit/${note._id}?from=clientDetail`)}
                                                className='clientDetail-noteedit-btn'
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteNote(note._id)}
                                                className='clientDetail-notedelete-btn'
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
            <Link to='/clients' className='back-btn'>Back to client list</Link>
        </div>
    )
}
export default ClientDetail; 