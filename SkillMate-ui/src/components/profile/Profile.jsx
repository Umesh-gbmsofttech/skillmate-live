import React, { useContext } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import MyCourses from './MyCourses';
import { GlobalContext } from '../context/GlobalContext';

function Profile() {
    const { user, clearUserData } = useContext(GlobalContext);
    const navigate = useNavigate();

    // Handle profile-related actions
    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        clearUserData(); // Assuming this will log the user out and clear context
        navigate('/login'); // Navigate to login after logging out
    };

    const handleDeleteProfileClick = () => {
        navigate('/delete-profile');
    };

    const handleUpdateProfileClick = () => {
        navigate('/update-profile');
    };

    if (!user) {
        return <p className='profile-container-unknown-user'>Please log in to view your profile.</p>;
    }

    return (
        <>
            <div className='profile-container'>
                <div className='profile-picture'>
                    <img src={user.profilePic} alt="Profile" />
                </div>

                <div className='profile-details'>
                    <h1>Welcome, {user.name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.mobile}</p>
                    <p>Address: {user.address}</p>
                    <p>Education: {user.qualification}</p>
                    {user.experience && <p>Experience: {user.experience} years</p>}
                    {user.workStatus && <p>Work Status: {user.workStatus}</p>}
                    {user.companyName && <p>Company: {user.companyName}</p>}
                    {user.technologies && <p>Technologies: {user.technologies.join(', ')}</p>}
                </div>

                {/* Action Buttons */}
                <div className="profile-action-buttons">
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleDeleteProfileClick}>Delete Profile</button>
                    <button onClick={handleUpdateProfileClick}>Update Profile</button>
                </div>
            </div>

            {/* My Courses Section */}
            <div className="profile-my-courses-container">
                <MyCourses />
            </div>
        </>
    );
}

export default Profile;
