import React, { useEffect, useState } from 'react';
import './Courses.css';
import logo from '../../assets/skillmate.jpg';
import { useNavigate } from 'react-router-dom';

function Courses({ userId }) {
  const [userCourses, setUserCourses] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching courses specific to a user
  useEffect(() => {
    if (userId) {
      // For demonstration purposes, assuming we fetch the user's courses
      const fetchedCourses = [
        {
          id: 1,
          title: 'Web Development',
          description: 'Learn HTML, CSS, JavaScript, and React to build dynamic web applications.',
        },
        {
          id: 2,
          title: 'Data Science',
          description: 'Master data analysis, machine learning, and visualization using Python and R.',
        },
        {
          id: 3,
          title: 'Artificial Intelligence',
          description: 'Explore AI fundamentals, deep learning, and natural language processing.',
        },
      ];
      setUserCourses(fetchedCourses); // Here, you can fetch data from an API based on userId
    }
  }, [userId]);

  // Navigate to subscriptions page
  const handleBuyCourseClick = () => {
    navigate('/subscriptions');
  };

  // Navigate to contact us page and pass course data
  const handleContactUsClick = (courseData) => {
    navigate('/contact', { state: { courseData } });
  };

  return (
    <div>
      <div className="course-container">
        <h1 className="animate-text heading-primary">Courses</h1>
        <p className="animate-text">
          Explore a wide range of courses designed to help you succeed in the tech industry.
        </p>
        <div className="course-grid">
          {userCourses.length > 0 ? (
            userCourses.map((course) => (
              <div key={course.id} className="course-box">
                <img src={logo} alt="Course Logo" />
                <h3 className="heading-secondary">{`Course ${course.id}: ${course.title}`}</h3>
                <p className="course-description">{course.description}</p>
                <button className="buy-button" onClick={handleBuyCourseClick}>
                  Buy Now
                </button>
                <button className="contact-us-button" onClick={() => handleContactUsClick(course)}>
                  Contact Us
                </button>
              </div>
            ))
          ) : (
            <p>No courses available for this user.</p>
          )}
        </div>
        <div className="referral-form-container">
          <div className="referral-form">
            <h2 className="heading-tertiary">Refer a Friend</h2>
            <form>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <button type="submit">Refer Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
