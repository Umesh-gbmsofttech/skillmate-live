// import React from 'react';
// import './ManageCoursesList.css'; // Changed the CSS file name to match
// import editIcon from '../../assets/editIcon.png'; // Assuming editIcon remains the same
// import courseCoverImage from '../../assets/skillmate.jpg'; // Assuming a cover image for the course
// import Search from '../Search';
// import { useNavigate } from 'react-router-dom';

// function ManageCoursesList() {
//     const navigate = useNavigate();
//     const handleStudentEditClick = () => {
//         navigate('/admin-profile/edit-students', { state: { studentId: '123' } });
//     }
//     const handleStudentAddClick = () => {
//         navigate('/admin-profile/edit-students', { state: { studentId: '123' } });
//     }
//     const courses = [
//         {
//             coverImage: courseCoverImage,
//             courseName: 'Full-stack Development',
//             Duration: '180 days',
//             time: '1 hr daily',
//             price: '$100',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tincidunt neque, ac pellentesque felis.',
//         },
//         {
//             coverImage: courseCoverImage,
//             courseName: 'React.js Basics',
//             Duration: '120 days',
//             time: '45 mins daily',
//             price: '$80',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tincidunt neque, ac pellentesque felis.',
//         },
//     ];

//     return (
//         <div className="admin-dashboard-manage-courses-container">
//             <div className="admin-welcome">
//                 <h1>Hello, Admin!</h1>
//                 <p>Courses List</p>
//             </div>

//             <Search />
//             <button onClick={handleStudentAddClick} className="add__new-course-btn">Add New Course</button>

//             <div className="ad__courses-list">
//                 {courses.map((course, index) => (
//                     <div key={index} className="ad__courses-list-card">
//                         <img className="course-cover-image" src={course.coverImage} alt={`${course.courseName} cover`} />
//                         <div className="courses-details-data">
//                             <h3>{course.courseName}</h3>
//                             <p>Duration: {course.Duration}</p>
//                             <p>Time: {course.time}</p>
//                             <p>Price: {course.price}</p>
//                             <p>Description: {course.description}</p>
//                         </div>
//                         <button onClick={handleStudentEditClick} className="ad_edit_course-btn">
//                             <img src={editIcon} alt="edit" />
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ManageCoursesList;



import React, { useEffect, useState } from 'react';
import './ManageCoursesList.css';
import editIcon from '../../assets/editIcon.png';
import courseCoverImage from '../../assets/skillmate.jpg';
import Search from '../Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions'; // Import the action

function ManageCoursesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const courses = useSelector((state) => state.courses.courses); // Get courses from Redux store

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/courses/fetch', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setCourses(response.data)); // Dispatch action to store courses in Redux
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch courses.');
                setLoading(false);
            }
        };

        if (token) {
            fetchCourses();
        } else {
            setError('Authorization token is missing or invalid.');
            setLoading(false);
        }
    }, [token, dispatch]);

    const handleStudentEditClick = (course) => {
        navigate('/admin-profile/edit-courses', { state: { course } });
    };

    const handleStudentAddClick = () => {
        navigate('/admin-profile/edit-course', { state: { course: null } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="admin-dashboard-manage-courses-container">
            <div className="admin-welcome">
                <h1>Hello, Admin!</h1>
                <p>Courses List</p>
            </div>
            <Search />
            <button onClick={handleStudentAddClick} className="add__new-course-btn">Add New Course</button>
            <div className="ad__courses-list">
                {courses.map((course) => (
                    <div key={course._id} className="ad__courses-list-card">
                        <img
                            className="course-cover-image"
                            src={course.coverImage || courseCoverImage}
                            alt={`${course.courseName} cover`}
                        />
                        <div className="courses-details-data">
                            <h3>{course.courseName}</h3>
                            <p>Duration: {course.days}</p>
                            <p>Time: {course.time}</p>
                            <p>Price: {course.price}</p>
                            <p>Description: {course.description}</p>
                        </div>
                        <button onClick={() => handleStudentEditClick(course)} className="ad_edit_course-btn">
                            <img src={editIcon} alt="edit" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageCoursesList;

