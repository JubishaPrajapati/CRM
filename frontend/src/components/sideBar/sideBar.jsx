import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    FaBars,
    FaHome,
    FaUsers,
    FaStickyNote,
    FaCalendarAlt,
    FaSignOutAlt
} from 'react-icons/fa';
import './sideBar.css';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    // Auto-collapse sidebar on small screens by default
    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };
        handleResize(); // run once on load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    };

    return (
        <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
            <div className="top-bar">
                <Link to="/dashboard">
                    <h1 className="logo">{isOpen ? 'CRM' : ''}</h1>
                </Link>
                <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </button>
            </div>
            <nav>
                <NavLink to="/dashboard">
                    <FaHome className="icon" />
                    {isOpen && <span className="label">Dashboard</span>}
                </NavLink>
                <NavLink to="/clients">
                    <FaUsers className="icon" />
                    {isOpen && <span className="label">Clients</span>}
                </NavLink>
                <NavLink to="/meetings">
                    <FaCalendarAlt className="icon" />
                    {isOpen && <span className="label">Meetings</span>}
                </NavLink>
                <NavLink to="/notes">
                    <FaStickyNote className="icon" />
                    {isOpen && <span className="label">Notes</span>}
                </NavLink>
                <NavLink to="/login" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" />
                    {isOpen && <span className="label">Logout</span>}
                </NavLink>
            </nav>
        </div>
    );
};

export default SideBar;
