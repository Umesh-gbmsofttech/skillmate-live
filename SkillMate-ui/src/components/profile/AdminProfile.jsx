import React from 'react';
import './AdminProfile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/skillmate.jpg'

function AdminProfile() {
    const navigate = useNavigate();

    const location = useLocation();
    const { username } = location.state || { username: 'Admin' };

    const handleManageTrainerClick = () => {
        navigate('/admin-profile/manage-trainers', { state: { username } });
    };
    const handleManageStudentClick = () => {
        navigate('/admin-profile/manage-students', { state: { username } });
    };
    const handleManageCoursesClick = () => {
        navigate('/admin-profile/manage-courses', { state: { username } });
    };
    return (
        <div className="admin-container-profile">
            <div className="admin-container-profile-welcome">
                <img className="admin-profile-picture" src={logo} alt="Profile" />
                <h1 className="admin-welcome-text">Welcome, {username}</h1>
            </div>
            <h1 className='admin-container-profile-manage-board-heading'>Manage</h1>
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
