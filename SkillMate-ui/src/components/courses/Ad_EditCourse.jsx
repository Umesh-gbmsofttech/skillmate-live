// import React, { useState } from 'react';
// import './Ad_EditCourse.css';
// import profilePic from '../../assets/profilePic.jpg';

// function AdEditCourse() {
//     const [showProfile, setShowProfile] = useState(true);

//     const course = {
//         profilePic,
//         courseName: 'Full-stack Development',
//         Duration: '180 days',
//         time: '1 hr daily',
//         price: '$100',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tincidunt neque, ac pellentesque felis. Donec euismod orci vel velit hendrerit, ut efficitur ex laoreet. Nulla facilisi. Donec vitae metus id nisi gravida scelerisque. Proin vel velit vel felis faucibus maximus in eu neque.',
//     };

//     const handleSubmitClick = () => {
//         console.log('Account has been updated successfully.');
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         console.log(file);
//     };

//     return (
//         <div className="admin__edit-course-ed-container">
//             <div className="ad__-course-ed-header">
//                 <h1 className="ad__-course-ed-header__welcome">Edit Course</h1>
//             </div>

//             <div className="ad__-course-ed-details">
//                 <div className="ad__-course-ed-header__profile-container">
//                     <img className="ad__-course-ed-header__picture" src={course.profilePic} alt="Profile" />
//                     <div className="ad__-course-ed-header__file-upload">
//                         <input
//                             type="file"
//                             id="ad__course-ed-profile-image"
//                             className="ad__-course-ed-header__file-input"
//                             onChange={handleFileChange}
//                         />
//                         <button
//                             className="ad__-course-ed-header__file-button"
//                             onClick={() => document.getElementById('ad__course-ed-profile-image').click()}
//                         >
//                             Choose Cover Image
//                         </button>
//                     </div>
//                 </div>

//                 <p className="ad__-course-ed-details__item">Name: {course.courseName}</p>
//                 <p className="ad__-course-ed-details__item">Name: {course.Duration}</p>
//                 <p className="ad__-course-ed-details__item">Name: {course.time}</p>
//                 <p className="ad__-course-ed-details__item">Name: {course.price}</p>
//                 <p className="ad__-course-ed-details__item">Name: {course.description}</p>
//             </div>

//             <div className="ad__-course-ed-actions">
//                 <button className="ad__-course-ed-actions__submit" onClick={handleSubmitClick}>
//                     Update course
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default AdEditCourse;







import React, { useState, useEffect } from 'react';
import './Ad_EditCourse.css';
import profilePic from '../../assets/profilePic.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Import useDispatch to dispatch actions
import { updateCourse } from '../redux/courseActions'; // Import the updateCourse action
import axios from 'axios';

function AdEditCourse() {
    const [courseName, setCourseName] = useState('');
    const [days, setDays] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const dispatch = useDispatch();  // Initialize useDispatch hook
    const navigate = useNavigate();  // Initialize useNavigate hook
    const location = useLocation();
    const courseData = location.state?.course; // Get course data passed via state
    const [error, setError] = useState(null);

    useEffect(() => {
        if (courseData) {
            setCourseName(courseData.courseName);
            setDays(courseData.Duration);
            setTime(courseData.time);
            setPrice(courseData.price);
            setDescription(courseData.description);
            setProfilePic(courseData.coverImage || profilePic);
        }
    }, [courseData]);

    const handleSubmitClick = async () => {
        const updatedCourse = {
            ...courseData,
            courseName,
            days, // Ensure the field matches the backend schema
            time,
            price,
            description,
            coverImage: profilePic,
        };

        try {
            // Make an API call to update the course
            const response = await axios.put(
                `http://localhost:8080/courses/update/${courseData.id}`, // Ensure this matches your backend route
                updatedCourse
            );

            if (response.status === 200) {
                // Update course in Redux after a successful API response
                dispatch(updateCourse(updatedCourse));

                // Navigate back to the course list
                navigate('/admin-profile/manage-courses');
            } else {
                console.error('Failed to update course:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating course:', error.message);
        }
    };


    // Dispatch action to update the course in Redux


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(URL.createObjectURL(file)); // Update profilePic state with selected file
    };

    if (!courseData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginBlock: '20%' }}>Loading course details...</div>;
    }
    if (error) {
        return <div>Failed to load course details...</div>;
    }

    return (
        <div className="admin__edit-course-ed-container">
            <div className="ad__-course-ed-header">
                <h1>Edit Course</h1>
            </div>

            <div className="ad__-course-ed-details">
                <div className="ad__-course-ed-header__profile-container">
                    <img className="ad__-course-ed-header__picture" src={`data:image/jpeg;base64,${courseData.coverImage}`} alt="Course Cover" />
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

                <div className="ad__-course-ed-details__item">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>
                <div className="ad__-course-ed-details__item">
                    <label>Duration:</label>
                    <input
                        type="text"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                </div>
                <div className="ad__-course-ed-details__item">
                    <label>Time:</label>
                    <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="ad__-course-ed-details__item">
                    <label>Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="ad__-course-ed-details__item">
                    <label>Description:</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="ad__-course-ed-actions">
                <button className="ad__-course-ed-actions__submit" onClick={handleSubmitClick}>
                    Update Course
                </button>
            </div>
        </div>
    );
}

export default AdEditCourse;
