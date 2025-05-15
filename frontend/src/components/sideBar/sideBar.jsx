// import { NavLink, Link } from 'react-router-dom';
// import './sideBar.css';

// const SideBar = () => {
//     return (
//         <div className="sidebar">
//             <Link to="/dashboard"><h2>CRM</h2></Link>
//             <nav>
//                 <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
//                 <NavLink to="/clients" activeClassName="active">Clients</NavLink>
//                 <NavLink to="/meetings" activeClassName="active">Meetings</NavLink>
//                 <NavLink to="/notes" activeClassName="active">Notes</NavLink>
//             </nav>
//         </div>
//     )
// }

// export default SideBar;

import { NavLink, Link } from 'react-router-dom';
import './sideBar.css';

const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to="/dashboard"><h2>CRM</h2></Link>
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
            </nav>
        </div>
    );
}

export default SideBar;
