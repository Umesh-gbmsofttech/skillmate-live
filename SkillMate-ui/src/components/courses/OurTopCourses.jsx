import React, { useEffect, useState, useRef } from 'react';
import './OurTopCourses.css';
import { useNavigate } from 'react-router-dom';
import editIcon from '../../assets/editIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function OurTopCourses() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token); // Token from Redux state
    const courses = useSelector((state) => state.courses.courses); // Courses from Redux store
    // const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleBuyNowClick = (course) => {
        navigate('/subscriptions', { state: { course } });
    };

    const handleCourseEditClick = (course) => {
        navigate('/admin-profile/edit-courses', { state: { course } });
    };


    const [visibleCards, setVisibleCards] = useState([]);

    // Ref to hold the course cards
    const cardRefs = useRef([]);

    useEffect(() => {
        // console.log(courses);
        // Ensure cardRefs is correctly initialized
        cardRefs.current = cardRefs.current.slice(0, courses?.length);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% is visible
        );

        // Observe each card element
        cardRefs.current.forEach((course, index) => {
            if (course) observer.observe(course);
        });

        return () => observer.disconnect();
    }, [courses]);
    useEffect(() => {
        if (!courses || courses.length === 0) {
            const fetchCourses = async () => {
                setLoading(true); // Ensure loading state is set before fetching
                try {
                    const response = await axios.get('http://localhost:8080/courses/fetch', {
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${token}`, // Uncomment if required
                        },
                    });
                    console.log(response.data)
                    dispatch({ type: "SET_COURSES", payload: response.data }); // Fix: Dispatching setCourses action
                } catch (error) {
                    setError('Failed to fetch courses.');
                } finally {
                    setLoading(false); // Ensure loading state is reset
                }
            };

            fetchCourses();
        }
    }, [dispatch, courses]); // Dependency updated to avoid unnecessary re-fetching


    console.log(courses)
    return (
        <div className='ourTopCoursesContainer'>
            <h3 className='ourTopCoursesHeading'>Our Top Courses</h3>
            <div className="ourTopCoursesCardSection">
                {courses?.map((course, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="courseCard"
                    >
                        {/* Render the course image using Base64 encoding */}
                        <img
                            className='cardImage'
                            src={`data:image/jpeg;base64,${course.coverImage}`}
                            alt={course.courseName}
                        />
                        <div className="cardDetails">
                            <h4 className="cardCourseName">{course.courseName}</h4>
                            <h4 className="cardTrainerName">{course.trainerName || 'Trainer Name'}</h4>
                            <p className="cardRating">{course.rating || 'No reviews yet'}</p>
                            <button onClick={() => handleBuyNowClick(course)} className="cardBuyNowButton">Buy Now</button>
                            <img onClick={() => handleCourseEditClick(course)} src={editIcon} alt="Edit" className="editIcon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurTopCourses;