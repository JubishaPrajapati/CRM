import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllMeetings } from '../../services/meetingService';
import './calendarView.css';

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const meetings = await getAllMeetings();
                const formattedEvents = meetings.map(meeting => ({
                    id: meeting._id,
                    title: meeting.client?.name || 'Unknown Client',
                    date: meeting.date,
                    extendedProps: {
                        time: meeting.time,
                        location: meeting.location,
                        agenda: meeting.agenda,
                        notes: meeting.client?.notes || [],
                        clientId: meeting.client?._id || '',
                    }
                }))
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Event loading meetings:', error);
            }
        }
        fetchMeetings();
    }, []);

    const handleEventClick = (info) => {
        const clientId = info.event.extendedProps.clientId;
        if (clientId) {
            navigate(`/clients/${clientId}`);
        } else {
            alert('Client ID not found for this event.');
        }
    }


    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                height="auto"
                dateClick={(info) => {
                    navigate(`/calendar/day/${info.dateStr}`);
                }}
                dayMaxEventRows={true}
                eventContent={(arg) => {
                    return (
                        <div>
                            <b>{arg.event.title}</b>
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default CalendarView;