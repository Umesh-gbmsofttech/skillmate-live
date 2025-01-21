import React, { useEffect, useState } from 'react';
import './ManageCoursesList.css';
import editIcon from '../../assets/editIcon.png';
import courseCoverImage from '../../assets/skillmate.jpg';
import Search from '../Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions';
import deleteIcon from '../../assets/deleteIcon.png';

function ManageCoursesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const courses = useSelector((state) => state.courses.courses);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/courses/fetch', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setCourses(response.data));
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

    // Filter courses based on search query (courseName, description, price, days)
    const filteredCourses = courses.filter((course) =>
        course.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.price && course.price?.toString().includes(searchQuery)) ||
        (course.days && course.days?.toString().includes(searchQuery))
    );


    const handleStudentEditClick = (course) => {
        navigate('/admin-profile/edit-courses', { state: { course } });
    };

    const handleStudentAddClick = () => {
        navigate('/admin-profile/edit-course', { state: { course: null } });
    };

    const handleDeleteCourse = async (courseId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this course?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/courses/delete/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedCourses = courses.filter((course) => course.id !== courseId);
            dispatch(setCourses(updatedCourses));
        } catch (error) {
            setError('Failed to delete the course. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Ensure courses is an array
    const validCourses = Array.isArray(courses) ? courses : [];

    return (
        <div className="admin-dashboard-manage-courses-container">
            <div className="admin-welcome">
                <h1>Hello, Admin!</h1>
                <p>Courses List</p>
            </div>

            <Search onSearch={setSearchQuery} />
            {/* .......................................... */}
            {filteredCourses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                filteredCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <h3>{course.courseName}</h3>
                        <p>Duration: {course.days} days</p>
                    </div>
                ))
            )}
            {/* ........................................... */}

            <button onClick={handleStudentAddClick} className="add__new-course-btn">Add New Course</button>

            <div className="ad__courses-list">
                {validCourses.length === 0 ? (
                    <p>No courses available.</p>
                ) : (
                    validCourses.map((course, index) => (
                        <div key={index} className="ad__courses-list-card">
                            <img className="course-cover-image" src={course.coverImage || courseCoverImage} alt={`${course.courseName} cover`} />
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
                            <button onClick={() => handleDeleteCourse(course.id)} className="ad_delete_course-btn">
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ManageCoursesList;
