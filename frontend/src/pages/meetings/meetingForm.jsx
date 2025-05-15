import React, { useState, useEffect } from 'react';
import { createMeeting, updateMeeting, getMeetingById } from '../../services/meetingService';
import { getAllClients } from '../../services/clientService';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
    const [clients, setClients] = useState([]);

    //to nav to clinetdetail if edit from clinetdetail
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');

    //fetching client for select dropdown
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clientList = await getAllClients();
                setClients(clientList);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, []);


    //fetching meeting for edit
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
        setMeetingDetails({ ...meetingDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateMeeting(id, meetingDetails);
                console.log('Meeting updated successfully');
            } else {
                await createMeeting(meetingDetails);
                console.log('Meeting created successfully');
            }
            navigate('/meetings');

            //to nav to clientdetail if update from clientdetail
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
        <div className='meeting-form'>
            <h2>{id ? 'Edit Meeting' : 'Create a New Meeting'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="client">Client</label>
                    <select
                        id="client"
                        name="client"
                        value={meetingDetails.client}
                        onChange={handleChange}
                        required
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

                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="agenda">Agenda</label>
                    <textarea
                        id="agenda"
                        name="agenda"
                        value={meetingDetails.agenda}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    {id ? 'Update Meeting' : 'Create Meeting'}
                </button>
            </form>
        </div>
    );
};

export default MeetingForm;
