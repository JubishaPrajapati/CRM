import React, { useEffect, useState } from 'react';
import { getAllMeetings, deleteMeeting } from '../../services/meetingService';
import { useNavigate } from 'react-router-dom';
import './meetingList.css';

const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    const fetchMeetings = async () => {
        try {
            const data = await getAllMeetings();

            console.log('Fetched meetings:', data);
            setMeetings(data);
        } catch (error) {
            console.error('Failed to fetch meetings:', error);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteMeeting(id);
            fetchMeetings();
        } catch (error) {
            console.error('Error deleting meeting:', error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB'); // e.g., "03/05/2025"

    };

    return (
        <div className="meeting-list">
            <h2>Meeting List</h2>
            <button onClick={() => navigate('/meetings/new')} className="meetingadd-btn">
                Add New Meeting
            </button>

            {meetings.length === 0 ? (
                <p>No meetings found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Agenda</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map(meeting => (
                            <tr key={meeting._id}>
                                <td data-label="Client">{meeting.client?.name || 'N/A'}</td>
                                <td data-label="Date">{formatDate(meeting.date)}</td>
                                <td data-label="Time">{meeting.time}</td>
                                <td data-label="Location">{meeting.location}</td>
                                <td data-label="Agenda">{meeting.agenda}</td>
                                <td data-label="Actions" className='meetingaction-btns'>
                                    <button onClick={() => navigate(`/meetings/edit/${meeting._id}`)} className='meetingedit-btn'>Edit</button>
                                    <button onClick={() => handleDelete(meeting._id)} className='meetingdelete-btn'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MeetingList;
