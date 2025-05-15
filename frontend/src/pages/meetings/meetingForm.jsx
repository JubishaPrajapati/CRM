import React, { useState, useEffect } from 'react';
import { createMeeting, updateMeeting, getMeetingById } from '../../services/meetingService';
import { getAllClients } from '../../services/clientService';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './meetingForm.css';

const MeetingForm = () => {
    const [meetingDetails, setMeetingDetails] = useState({
        client: '',
        date: '',
        time: '',
        location: '',
        agenda: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');
    const clientIdFromQuery = queryParams.get('clientId');

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clientList = await getAllClients();
                setClients(clientList);

                if (!id && clientIdFromQuery) {
                    setMeetingDetails(prev => ({
                        ...prev, client: clientIdFromQuery,
                    }));
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, [id, clientIdFromQuery]);

    useEffect(() => {
        if (id) {
            const fetchMeeting = async () => {
                try {
                    const res = await getMeetingById(id);
                    setMeetingDetails({
                        client: res.client?._id || res.client,
                        date: res.date?.split('T')[0],
                        time: res.time,
                        location: res.location,
                        agenda: res.agenda,
                    });
                } catch (error) {
                    console.error("Error fetching meeting:", error);
                }
            };
            fetchMeeting();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateMeeting(id, meetingDetails);
            } else {
                await createMeeting(meetingDetails);
            }

            if (from === 'clientDetail') {
                navigate(`/clients/${meetingDetails.client}`);
            } else {
                navigate('/meetings');
            }
        } catch (error) {
            console.error("Error submitting meeting:", error);
        }
    };

    return (
        <div className="meeting-form-page">
            <h2>{id ? 'Edit Meeting' : 'Add New Meeting'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="meetingform-group">
                    <label htmlFor="client">Client</label>
                    <select
                        id="client"
                        name="client"
                        value={meetingDetails.client}
                        onChange={handleChange}
                        required
                        disabled={Boolean(clientIdFromQuery)}
                    >
                        <option value="" disabled>Select Client</option>
                        {clients.map(client => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="meetingform-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={meetingDetails.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="meetingform-group">
                    <label htmlFor="time">Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={meetingDetails.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="meetingform-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={meetingDetails.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="meetingform-group">
                    <label htmlFor="agenda">Agenda</label>
                    <textarea
                        id="agenda"
                        name="agenda"
                        value={meetingDetails.agenda}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="meetingform-submit">
                    <button type="submit">{id ? 'Update' : 'Add'} Meeting</button>
                </div>
            </form>
        </div>
    );
};

export default MeetingForm;
