import React, { useState } from 'react';
import './Ad_EditStudent.css';
import profilePic from '../../assets/profilePic.jpg';

function AdEditStudent() {
    const [showProfile, setShowProfile] = useState(true);

    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        mobile: '+1 123-456-7890',
        address: '123 Main St, City, State, Zip',
        qualification: 'Master of Science, Computer Science',
        workStatus: 'Freelancer',
        profilePic,
        resume: 'resume.pdf',
    };

    const handleSubmitClick = () => {
        console.log('Account has been updated successfully.');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
    };

    return (
        <div className="admin__edit-student-container">
            <div className="ad__-student-header">
                <h1 className="ad__-student-header__welcome">Edit Student</h1>
            </div>

            <div className="ad__-student-details">
                <div className="ad__-student-header__profile-container">
                    <img className="ad__-student-header__picture" src={user.profilePic} alt="Profile" />
                    <div className="ad__-student-header__file-upload">
                        <input
                            type="file"
                            id="ad__st-profile-image"
                            className="ad__-student-header__file-input"
                            onChange={handleFileChange}
                        />
                        <button
                            className="ad__-student-header__file-button"
                            onClick={() => document.getElementById('ad__st-profile-image').click()}
                        >
                            Choose Profile Image
                        </button>
                    </div>
                </div>

                <p className="ad__-student-details__item">Name: {user.name}</p>
                <p className="ad__-student-details__item">Phone: {user.mobile}</p>
                <p className="ad__-student-details__item">Email: {user.email}</p>
                <p className="ad__-student-details__item">Address: {user.address}</p>
                <p className="ad__-student-details__item">Education: {user.qualification}</p>
                <p className="ad__-student-details__item">Work Status: {user.workStatus}</p>
                <p className="ad__-student-details__item">Resume: {user.resume}</p>
            </div>

            <div className="ad__-student-actions">
                <button className="ad__-student-actions__submit" onClick={handleSubmitClick}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AdEditStudent;
