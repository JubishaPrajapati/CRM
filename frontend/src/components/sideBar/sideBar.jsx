import { NavLink, Link } from 'react-router-dom';
import './sideBar.css';

const SideBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
    }
    return (
        <div className="sidebar">
            <Link to="/dashboard"><h1>CRM</h1></Link>
            <nav>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/clients"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Clients
                </NavLink>
                <NavLink
                    to="/meetings"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Meetings
                </NavLink>
                <NavLink
                    to="/notes"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Notes
                </NavLink>
                <NavLink
                    to="/login"
                    onClick={handleLogout}
                >
                    Logout
                </NavLink>
            </nav>
        </div>
    );
}

export default SideBar;
