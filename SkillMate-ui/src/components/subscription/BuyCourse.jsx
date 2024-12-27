import React from 'react';
import './BuyCourse.css';
import writeIcon from '../../assets/writeIcon.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyCourses } from '../redux/courseActions';

function BuyCourse({ course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleBuyCourse = async () => {
    if (!token || !isAuthenticated) {
      navigate('/login');
      return;
    }

    const url =
      userData.roles[0] === 'STUDENT'
        ? `http://localhost:8080/students/students/${userData.id}/add-course`
        : `http://localhost:8080/trainers/students/${userData.id}/add-course`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course.id), // Adjusted format
      });

      if (!response.ok) {
        throw new Error('Failed to map course to user');
      }

      dispatch(addToMyCourses(course));
      navigate('/my-courses');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to buy the course. Please try again.');
    }
  };

  const handleRateUsClick = () => {
    navigate('/rating-reviews/page/card');
  };

  return (
    <div className="buy-course-container">
      {course ? (
        <div className="course-section">
          <div className="course-image">
            <img src={`data:image/jpeg;base64,${course.coverImage}`} alt={course.courseName} />
          </div>
          <div className="course-details">
            <h1 className="course-title">{course.courseName}</h1>
            <p className="course-price">Price: ${course.price}</p>
            <p className="course-duration">Duration: {course.duration} days</p>
            <details>
              <summary>See the full details of this course ...</summary>
              <p>{course.description}</p>
            </details>
            <button className="buy-button" onClick={handleBuyCourse}>
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
      <div className="leave__a-rating-review" onClick={handleRateUsClick}>
        <h2>
          Leave a Rating and Review <img src={writeIcon} alt="Rate Us" />
        </h2>
      </div>
    </div>
  );
}

export default BuyCourse;
