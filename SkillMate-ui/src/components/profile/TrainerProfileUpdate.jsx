import React, { useState } from 'react';
import './TrainerProfile.css';
import profilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import { useLocation, useNavigate } from 'react-router-dom';

function TrainerProfileUpdate() {
    const [showProfile, setShowProfile] = useState(true);

    const location = useLocation();
    const { username } = location.state || { username: 'Admin' };

    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        mobile: '+1 123-456-7890',
        address: '123 Main St, City, State, Zip',
        qualification: 'Master of Science, Computer Science',
        experience: 5,
        workStatus: 'Freelancer',
        companyName: 'XYZ Corp.',
        technologies: ['Python', 'Django', 'Flask'],
        profilePic,
        resume: 'resume.pdf',
    };

    const handleSubmitClick = () => {
        console.log('Account has been updated successfully.');
    };

    return (
        <div className="trainer-profile">
            <div className="trainer-header">
                <img className="trainer-header__picture" src={user.profilePic} alt="Profile" />
                <h1 className="trainer-header__welcome">Welcome, {username}</h1>
                <div className="trainer-header__actions">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide Profile' : 'View Profile'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img src={editIcon} alt="Edit Profile" />
                </div>
            </div>

            {showProfile && (
                <div className="trainer-details">
                    <label htmlFor="file">select a profile picture</label>
                    <input className="trainer-details__item" type="file" />
                    <p className="trainer-details__item">Name: {user.name}</p>
                    <p className="trainer-details__item">Phone: {user.mobile}</p>
                    <p className="trainer-details__item">Email: {user.email}</p>
                    <p className="trainer-details__item">Address: {user.address}</p>
                    <p className="trainer-details__item">Education: {user.qualification}</p>
                    <p className="trainer-details__item">Experience: {user.experience} years</p>
                    <p className="trainer-details__item">Work Status: {user.workStatus}</p>
                    <p className="trainer-details__item">Company: {user.companyName}</p>
                    <p className="trainer-details__item">
                        Technologies: {user.technologies.join(', ')}
                    </p>
                    <p className="trainer-details__item">Resume: {user.resume}</p>
                </div>
            )}

            <div className="trainer-actions">
                <button className="trainer-actions__submit" onClick={handleSubmitClick}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default TrainerProfileUpdate;