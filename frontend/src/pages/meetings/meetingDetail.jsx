import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMeetingById } from '../../services/meetingService';

const MeetingDetail = () => {
    const { id } = useParams();
    const [meeting, setMeeting] = useState(null);

    useEffect(() => {
        const fetchingMeeting = async () => {
            try {
                const data = await getMeetingById(id);
                setMeeting(data);
            } catch (error) {
                console.error('Error fetching meeting', error);
            }
        }
        fetchingMeeting();
    }, [id]);


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB'); // e.g., "03/05/2025"

    };

    if (!meeting) return <p>Loading...</p>;

    return (
        <div className="meeting-detail-container">
            <h2>Meeting with {meeting.client?.name}</h2>

            <div className="meeting-info">
                <p><strong>Date:</strong> {formatDate(meeting.date)}</p>
                <p><strong>Time:</strong> {meeting.time}</p>
                <p><strong>Location:</strong> {meeting.location}</p>
                <p><strong>Agenda:</strong> {meeting.agenda}</p>
            </div>

            <div className="notes section">
                <h3>Client Notes:</h3>
                {meeting.client?.notes?.length > 0 ? (
                    <ul>
                        {meeting.client.notes.map((note, index) => (
                            <li key={index}>
                                <p> {note.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No notes available.</p>
                )}
            </div>
        </div>
    )
}

export default MeetingDetail;