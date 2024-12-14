import React, { useState } from 'react';
import './StudentProfile.css';
import profilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import MyCourses from '../courses/MyCourses';
import LiveSessions from '../subscription/LiveSessions';
import { useLocation, useNavigate } from 'react-router-dom';

function StudentProfile() {
    const [showProfile, setShowProfile] = useState(true);

    const location = useLocation();
    const { username } = location.state || { username: 'Admin' };

    const navigate = useNavigate();

    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        mobile: '+1 123-456-7890',
        address: '123 Main St, City, State, Zip',
        qualification: 'Bachelor of Science, Computer Science',
        experience: 3,
        workStatus: 'Full-Time',
        companyName: 'XYZ Corp.',
        technologies: ['JavaScript', 'React', 'Node.js'],
        profilePic,
        resume: 'resume.pdf',
    };

    const handleUpdateAccountClick = () => {
        console.log('updating account');
        navigate('/student-profile-update', { state: { username } });
    };

    return (
        <div className="student-container-profile">
            <div className="student-container-profile-welcome">
                <img className="student-profile-picture" src={user.profilePic} alt="Profile" />
                <h1 className="student-welcome-text">Welcome, {username}</h1>
                <div className="student-action-button-container">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide' : 'View'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img onClick={handleUpdateAccountClick} src={editIcon} alt="Edit" />
                </div>
            </div>

            {showProfile && (
                <div className="student-profile-details">
                    <p className='Student-details__item'>Name: {user.name}</p>
                    <p className="Student-details__item">Phone: {user.mobile}</p>
                    <p className="Student-details__item">Email: {user.email}</p>
                    <p className="Student-details__item">Address: {user.address}</p>
                    <p className="Student-details__item">Education: {user.qualification}</p>
                    {user.experience && <p className="Student-details__item">Experience: {user.experience} years</p>}
                    {user.workStatus && <p className="Student-details__item">Work Status: {user.workStatus}</p>}
                    {user.companyName && <p className="Student-details__item">Company: {user.companyName}</p>}
                    <p className="Student-details__item">Resume: <span>{user.resume}</span></p>
                </div>
            )}

            <div className="student-profile-action-buttons">
                <p onClick={handleUpdateAccountClick}><i>Update Account</i></p>
            </div>

            <MyCourses />
            <LiveSessions />
        </div>
    );
}

export default StudentProfile;
