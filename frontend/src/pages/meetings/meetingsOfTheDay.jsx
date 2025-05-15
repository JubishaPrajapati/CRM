import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllMeetings } from "../../services/meetingService";
import './meetingsOfTheDay.css';

const MeetingsOfTheDay = () => {
    const { date } = useParams();
    const navigate = useNavigate();
    const [filteredMeetings, setFilteredMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            const allMeetings = await getAllMeetings();
            const dayMeetings = allMeetings.filter(m => {
                const meetingDate = new Date(m.date).toISOString().split('T')[0];
                return meetingDate === date;
            });
            setFilteredMeetings(dayMeetings);
        }
        fetchMeetings();
    }, [date]);



    return (
        <div style={{ padding: '20px' }}>
            {/* for format as may 15,2025 */}
            <h2>Meetings on {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>

            {filteredMeetings.length == 0 ? (
                <p>No meetings on this day.</p>
            ) : (
                <ul>
                    {filteredMeetings.map(meeting => (
                        <li key={meeting._id} style={{ marginBottom: '1rem' }}>
                            <strong>Client:</strong> {meeting.client?.name}<br />
                            <strong>Time:</strong> {new Date(`1970-01-01T${meeting.time}:00`).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}<br />
                            <strong>Location:</strong> {meeting.location}<br />
                            <strong>Agenda:</strong> {meeting.agenda}<br />
                            <button onClick={() => navigate(`/clients/${meeting.client?._id}`)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default MeetingsOfTheDay;