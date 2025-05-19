import React, { useEffect, useState } from "react";
import SummaryCard from "../../components/summaryCards/summaryCards";
import CalendarView from "../../components/calendar/calendarView";
import { FaUserFriends, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';
import { getClientCount, getNoteCount, getMeetingCount } from "../../services/summaryCardsService";
import './dashboardHome.css';

const DashboardHome = () => {
    const [clientCount, setClientCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);
    const [meetingCount, setMeetingCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clients = await getClientCount();
                const notes = await getNoteCount();
                const meetings = await getMeetingCount();

                setClientCount(clients);
                setNoteCount(notes);
                setMeetingCount(meetings);
            } catch (error) {
                console.error('Error loading summary:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="dashboard-home">
            <h1>Welcome to crm</h1>
            <div className="summary-cards-container">
                <SummaryCard title="Total Clients" count={clientCount} icon={<FaUserFriends />} />
                <SummaryCard title="Upcoming Meetings" count={meetingCount} icon={<FaCalendarAlt />} />
                <SummaryCard title="Total Notes" count={noteCount} icon={<FaStickyNote />} />
            </div>
            <div>
                <CalendarView />
            </div>
        </div>
    )

}


export default DashboardHome;