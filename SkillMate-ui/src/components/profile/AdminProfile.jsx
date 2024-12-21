import React from 'react';
import './AdminProfile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/skillmate.jpg';

function AdminProfile() {
    const navigate = useNavigate();

    // Fetch username or a fallback from Redux state
    const username = useSelector((state) => state.auth.username) || 'Admin';

    const handleManageTrainerClick = () => {
        navigate('/admin-profile/manage-trainers');
    };

    const handleManageStudentClick = () => {
        navigate('/admin-profile/manage-students');
    };

    const handleManageCoursesClick = () => {
        navigate('/admin-profile/manage-courses');
    };

    return (
        <div className="admin-container-profile">
            <div className="admin-container-profile-welcome">
                <img className="admin-profile-picture" src={logo} alt="Profile" />
                <h1 className="admin-welcome-text">Welcome, {username}</h1>
            </div>
            <h1 className="admin-container-profile-manage-board-heading">Manage</h1>
            <div className="admin-dashboard-control-buttons">
                <button className="admin-dashboard-button" onClick={handleManageTrainerClick}>Trainers</button>
                <button className="admin-dashboard-button" onClick={handleManageStudentClick}>Students</button>
                <button className="admin-dashboard-button" onClick={handleManageCoursesClick}>Courses</button>
                <button className="admin-dashboard-button">Messages</button>
            </div>
        </div>
    );
}

export default AdminProfile;
