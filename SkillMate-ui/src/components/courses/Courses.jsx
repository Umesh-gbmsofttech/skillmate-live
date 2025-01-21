import React, { useEffect, useState, useRef } from 'react';
import './Courses.css';
import logo from '../../assets/skillmate.jpg';
import referAndEarn from '../../assets/refer-earn.png';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';
import editIcon from '../../assets/editIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from '../redux/courseActions';
import axios from 'axios';
import userImage from '../../assets/skillmate.jpg';

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const token = useSelector((state) => state.auth.token); // Token from Redux state
  const courses = useSelector((state) => state.courses.courses); // Courses from Redux store
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleCourseEditClick = (course) => {
    navigate('/admin-profile/edit-courses', { state: { course } });
  };

  const handleContactUsClick = (course) => {
    navigate('/contact', { state: { course } });
  };

  const handleBuyNowClick = (course) => {
    navigate('/subscriptions', { state: { course } });
  };

  const handleReferNowClick = () => {
    alert('Thanks, your credit points have been added to your account');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses/fetch', {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        dispatch(setCourses(response.data));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch, token]);

  // Filter courses based on search query
  // Filter courses based on search query (courseName, description, price, days)
  const filteredCourses = courses.filter((course) =>
    course.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.description && course.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (course.price && course.price?.toString().includes(searchQuery)) ||
    (course.days && course.days?.toString().includes(searchQuery))
  );





  const courseRefs = useRef([]); // Holds references to all course cards

  // This effect handles the visibility of course cards using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    // Observing all courses
    courseRefs.current.forEach((course) => {
      if (course) {
        observer.observe(course);
      }
    });

    return () => observer.disconnect(); // Clean up the observer on unmount
  }, [courses]); // Runs when `courses` state changes


  console.log(courses)
  return (
    <div>
      <div className="list-of-courses-container">
        <h1 className="list-of-courses-container-heading">
          Explore a wide range of courses designed to help you succeed in the tech industry
        </h1>

        <Search onSearch={setSearchQuery} />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : courses?.length > 0 ? (
          <div className="courses-card-container">
            {/* {courses?.map((course, index) => ( */}
            {filteredCourses?.map((course, index) => (
              <div
                key={course.id}
                className="course-card"
                ref={(el) => (courseRefs.current[index] = el)} // Assigning ref to each course card
              >
                <div className="course-image-container">
                  {/* Render the course image using Base64 encoding if required */}
                  <img
                    // src={course.coverImage.startsWith('data:image') ? course.coverImage : `data:image/jpeg;base64,${course.coverImage}`}
                    src={`data:image/jpeg;base64,${course?.coverImage}` || logo}
                    alt={course.courseName || 'Course Image'}
                  />
                  <span className="course-rating">{course.courseName}</span>
                  <span className="course-rating">{course.days}</span>
                  <span className="course-rating">{course.rating}</span>
                </div>
                <div className="courses-card-container-courses-buttons">
                  <button onClick={() => handleContactUsClick(course)} className="courses-card-container-courses-contact-us-button">
                    Contact Us
                  </button>
                  <button onClick={() => handleBuyNowClick(course)} className="courses-card-container-courses-buy-now-button">
                    BUY NOW
                  </button>
                </div>
                {/* <img onClick={handleCourseEditClick(course)} src={editIcon} alt="edit" className="edit-icon-a" /> */}
                <img onClick={() => handleCourseEditClick(course)} src={editIcon} alt="edit" className="edit-icon-a" />
              </div>
            ))}
          </div>
        ) : (
          <p>No courses available.</p>
        )}
      </div>

      <div className="refer-and-earn-section">
        <div className="data">
          <h2 className="refer-and-earn-section-heading">Refer and Earn</h2>
          <p className="refer-and-earn-section-description">
            Earn extra money by referring your friends and family to SkillMate. Share your referral link and get 10% off your first purchase.
          </p>
          <button onClick={handleReferNowClick} className="refer-and-earn-section-button">
            Refer Now
          </button>
        </div>
        <img src={referAndEarn} alt="Refer and Earn" />
      </div>
    </div>
  );
}

export default Courses;
