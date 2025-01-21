import React, { useState, useEffect } from 'react';
import defaultProfilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Meetings from '../trainer/Meetings';
import Attendances from '../trainer/Attendances';
import axios from 'axios';
import './TrainerProfile.css'

function TrainerProfile() {
    const [showProfile, setShowProfile] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [batch, setBatch] = useState('');
    const [batches, setBatches] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const trainerId = userData?.id;

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/batches/by-trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBatches(response.data);
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        };

        if (trainerId && token) fetchBatches();
    }, [trainerId, token]);

    return (
        <>
            <div className="trainer-header">
                <div className="trainer-header__info">
                    <img
                        className="trainer-header__picture"
                        src={userData?.profilePic ? `data:image/jpeg;base64,${userData.profilePic}` : defaultProfilePic}
                        alt="Profile"
                    />
                    <h1 className="trainer-header__welcome">Welcome, {userData?.fullName || 'Trainer'}</h1>
                </div>
                <div className="trainer-header__actions">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide Profile' : 'View Profile'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img onClick={() => navigate('/trainer-profile-update')} src={editIcon} alt="Edit Profile" />
                </div>
            </div>

            {showProfile && (
                <div className="trainer-details">
                    <p><strong>Full Name:</strong> {userData?.fullName}</p>
                    <p><strong>Mobile Number:</strong> {userData?.mobileNumber}</p>
                    <p><strong>Email:</strong> {userData?.email}</p>
                </div>
            )}

            <Meetings />

            <div className="batch-selector">
                <label>Select Batch:</label>
                <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                    <option value="">-- Select Batch --</option>
                    {batches.map((batchItem) => (
                        <option key={batchItem.id} value={batchItem.id}>Batch {batchItem.id}</option>
                    ))}
                </select>
            </div>

            <Attendances batch={batch} />
        </>
    );
}

export default TrainerProfile;
