import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MyCourses.css';
import logo from '../../assets/skillmate.jpg';

function MyCourses() {
    // Access purchased courses from Redux store
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
        if (isAuthenticated && userData.id) {
            const fetchCourses = async () => {
                const url = `http://localhost:8080/students/fetch/my-courses/${userData.id}`;

                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch courses');
                    }

                    // Ensure response is not empty
                    const responseText = await response.text();
                    if (responseText === '') {
                        throw new Error('Empty response from the server');
                    }

                    const data = JSON.parse(responseText); // Parse the response manually
                    setMyCourses(data || []); // Assuming the response directly returns the courses array
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };

            fetchCourses();
        }
    }, [isAuthenticated, userData.id, token]);

    return (
        <div className="my-courses-container">
            <h1>My Courses</h1>
            <div className="my-courses-list">
                {myCourses.length > 0 ? (
                    myCourses.map((course, index) => (
                        <div key={index} className="my-course-card">
                            <img
                                src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
                                alt={course.courseName}
                                className="course-image"
                            />

                            <div className="my-course-info">
                                <h2 className="my-course-title">{course.courseName}</h2>
                                <p className="my-course-price">Price: {course.price}</p>
                                <p className="my-course-description">Description: {course.description}</p>
                                <p className="my-course-students">
                                    Students enrolled: {course.students.map(student => student.fullName).join(', ')}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No courses purchased yet.</p>
                )}
            </div>
        </div>
    );
}

export default MyCourses;
