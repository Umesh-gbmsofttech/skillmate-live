import React, { useState } from 'react';
import './StudentProfile.css';
import defaultProfilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import { useLocation } from 'react-router-dom';

function StudentProfileUpdate() {
    const [showProfile, setShowProfile] = useState(true);
    const location = useLocation();
    const { username } = location.state || { username: 'Admin' };
    const userData = location.state?.userData || {};

    const [formData, setFormData] = useState({
        name: userData.name || '',
        mobile: userData.mobile || '',
        email: userData.email || '',
        address: userData.address || '',
        qualification: userData.qualification || '',
        workStatus: userData.workStatus || '',
        technologies: userData.technologies ? userData.technologies.join(', ') : '',
        resume: userData.resume || '',
        profilePic: userData?.profilePic
            ? `data:image/jpeg;base64,${userData.profilePic}`
            : defaultProfilePic,
    });

    const updateUrl = `http://localhost:8080/students/update/${userData.id}`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    [name]: reader.result,
                }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmitClick = async () => {
        try {
            const response = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    technologies: formData.technologies.split(',').map((tech) => tech.trim()), // Convert back to array
                }),
            });

            if (response.ok) {
                console.log('Account has been updated successfully');
            } else {
                console.error('Failed to update account');
            }
        } catch (error) {
            console.error('Error while updating account:', error);
        }
    };

    return (
        <div className="student-container-profile">
            <div className="student-container-profile-welcome">
                <img
                    className="student-profile-picture"
                    src={formData.profilePic}
                    alt="Profile"
                />
                <h1 className="student-welcome-text">Welcome, {username}</h1>
                <div className="student-action-button-container">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide' : 'View'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img src={editIcon} alt="Edit" />
                </div>
            </div>

            {showProfile && (
                <div className="student-profile-details">
                    <label htmlFor="profilePic">Select a profile picture:</label>
                    <input
                        className="Student-details__item"
                        type="file"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <label>Name:</label>
                    <input
                        className="Student-details__item"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label>Phone:</label>
                    <input
                        className="Student-details__item"
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                    <label>Email:</label>
                    <input
                        className="Student-details__item"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label>Address:</label>
                    <textarea
                        className="Student-details__item"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <label>Education:</label>
                    <input
                        className="Student-details__item"
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                    />
                    <label>Work Status:</label>
                    <input
                        className="Student-details__item"
                        type="text"
                        name="workStatus"
                        value={formData.workStatus}
                        onChange={handleChange}
                    />
                    <label>Technologies:</label>
                    <input
                        className="Student-details__item"
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                    />
                    <label>Resume:</label>
                    <input
                        className="Student-details__item"
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />
                </div>
            )}

            <div className="student-profile-action-buttons">
                <button onClick={handleSubmitClick}>Submit</button>
            </div>
        </div>
    );
}

export default StudentProfileUpdate;
