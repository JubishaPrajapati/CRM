import React from 'react';
import Sidebar from '../sideBar/sideBar';
import { Outlet } from 'react-router-dom';
import './dashboardLayout.css';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
