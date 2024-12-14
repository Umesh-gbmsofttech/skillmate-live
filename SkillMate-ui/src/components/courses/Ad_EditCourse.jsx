import React, { useState } from 'react';
import './Ad_EditCourse.css';
import profilePic from '../../assets/profilePic.jpg';

function AdEditCourse() {
    const [showProfile, setShowProfile] = useState(true);

    const course = {
        profilePic,
        courseName: 'Full-stack Development',
        Duration: '180 days',
        time: '1 hr daily',
        price: '$100',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tincidunt neque, ac pellentesque felis. Donec euismod orci vel velit hendrerit, ut efficitur ex laoreet. Nulla facilisi. Donec vitae metus id nisi gravida scelerisque. Proin vel velit vel felis faucibus maximus in eu neque.',
    };

    const handleSubmitClick = () => {
        console.log('Account has been updated successfully.');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
    };

    return (
        <div className="admin__edit-course-ed-container">
            <div className="ad__-course-ed-header">
                <h1 className="ad__-course-ed-header__welcome">Edit Course</h1>
            </div>

            <div className="ad__-course-ed-details">
                <div className="ad__-course-ed-header__profile-container">
                    <img className="ad__-course-ed-header__picture" src={course.profilePic} alt="Profile" />
                    <div className="ad__-course-ed-header__file-upload">
                        <input
                            type="file"
                            id="ad__course-ed-profile-image"
                            className="ad__-course-ed-header__file-input"
                            onChange={handleFileChange}
                        />
                        <button
                            className="ad__-course-ed-header__file-button"
                            onClick={() => document.getElementById('ad__course-ed-profile-image').click()}
                        >
                            Choose Cover Image
                        </button>
                    </div>
                </div>

                <p className="ad__-course-ed-details__item">Name: {course.courseName}</p>
                <p className="ad__-course-ed-details__item">Name: {course.Duration}</p>
                <p className="ad__-course-ed-details__item">Name: {course.time}</p>
                <p className="ad__-course-ed-details__item">Name: {course.price}</p>
                <p className="ad__-course-ed-details__item">Name: {course.description}</p>
            </div>

            <div className="ad__-course-ed-actions">
                <button className="ad__-course-ed-actions__submit" onClick={handleSubmitClick}>
                    Update course
                </button>
            </div>
        </div>
    );
}

export default AdEditCourse;
