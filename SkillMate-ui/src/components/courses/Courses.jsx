// import React, { useEffect, useState, useRef } from 'react';
// import './Courses.css';
// import logo from '../../assets/skillmate.jpg';
// import referAndEarn from '../../assets/refer-earn.png';
// import { useNavigate } from 'react-router-dom';
// import Search from '../Search';
// import editIcon from '../../assets/editIcon.png'; 

// function Courses() {
//   const navigate = useNavigate();

//   const handleCourseEditClick = () => {
//     navigate('/admin-profile/edit-courses')
//   }
//   const handleCotactUsClick = () => {
//     navigate('/contact');
//   };
//   const handleBuyNowClick = () => {
//     navigate('/subscriptions');
//   };
//   const handleReferNowClick = () => {
//     alert('Thanks your credit points added to your account');
//   };

//   const courses = [
//     { id: 1, name: 'Course 1', description: 'Description of Course 1', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 2, name: 'Course 2', description: 'Description of Course 2', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 3, name: 'Course 3', description: 'Description of Course 3', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 4, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 5, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 6, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 7, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 8, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 9, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 10, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//     { id: 11, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
//   ];

//   const [visibleCourses, setVisibleCourses] = useState([]);

//   const courseRefs = useRef([visibleCourses]);

//   useEffect(() => {
//     courseRefs.current = courseRefs.current.slice(0, courses.length);

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//         }
//       });
//     }, { threshold: 0.5 });

//     // Observe each course element using ref
//     courseRefs.current.forEach((course) => {
//       if (course) observer.observe(course);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <div className='list-of-courses-container'>
//         <h1 className='list-of-courses-container-heading'>
//           Explore a wide range of courses designed to help you succeed in the tech industry
//         </h1>
//         <Search />
//         <div className="courses-card-container">
//           {courses.map((course, index) => (
//             <div
//               key={course.id}
//               ref={(el) => (courseRefs.current[index] = el)}
//               className="course-card"
//             >
//               <div className="course-image-container">
//                 <img src={logo} alt="course-logo" />
//                 <span className="course-rating">{course.rating}</span>
//               </div>
//               <div className="courses-card-container-courses-buttons">
//                 <button onClick={handleCotactUsClick} className="courses-card-container-courses-contact-us-button">Contact Us</button>
//                 <button onClick={handleBuyNowClick} className="courses-card-container-courses-buy-now-button">BUY NOW</button>
//               </div>
//               <img onClick={handleCourseEditClick} src={editIcon} alt="edit" className="edit-icon-a" />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="refer-and-earn-section">
//         <div className="data">
//           <h2 className="refer-and-earn-section-heading">Refer and Earn</h2>
//           <p className="refer-and-earn-section-description">
//             Earn extra money by referring your friends and family to SkillMate. Share your referral link and get 10% off your first purchase.
//           </p>
//           <button onClick={handleReferNowClick} className="refer-and-earn-section-button">Refer Now</button>
//         </div>
//         <img src={referAndEarn} alt="Refer and Earn" />
//       </div>
//     </>
//   );
// }

// export default Courses;



import React, { useEffect, useState } from 'react';
import './Courses.css';
import logo from '../../assets/skillmate.jpg';
import referAndEarn from '../../assets/refer-earn.png';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';
import editIcon from '../../assets/editIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from '../redux/courseActions'; // Ensure action is correctly imported
import axios from 'axios';

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token); // Token from Redux state
  const courses = useSelector((state) => state.courses.courses); // Courses from Redux store
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleCourseEditClick = () => {
    navigate('/admin-profile/edit-courses');
  };

  const handleContactUsClick = () => {
    navigate('/contact');
  };

  const handleBuyNowClick = () => {
    navigate('/subscriptions');
  };

  const handleReferNowClick = () => {
    alert('Thanks, your credit points have been added to your account');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses/fetch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setCourses(response.data)); // Dispatch the fetched courses to Redux
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch, token]);

  return (
    <div>
      <div className="list-of-courses-container">
        <h1 className="list-of-courses-container-heading">
          Explore a wide range of courses designed to help you succeed in the tech industry
        </h1>
        <Search />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : courses.length > 0 ? (
          <div className="courses-card-container">
            {courses.map((course, index) => (
              <div key={course.id} className="course-card">
                
                <div className="course-image-container">
                  <img src={logo} alt="course-logo" />
                  <span className="course-rating">{course.courseName}</span>
                <span className="course-rating">{course.days}</span>
                  <span className="course-rating">{course.rating}</span>
                </div>
                <div className="courses-card-container-courses-buttons">
                  <button onClick={handleContactUsClick} className="courses-card-container-courses-contact-us-button">Contact Us</button>
                  <button onClick={handleBuyNowClick} className="courses-card-container-courses-buy-now-button">BUY NOW</button>
                </div>
                <img onClick={handleCourseEditClick} src={editIcon} alt="edit" className="edit-icon-a" />
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
          <button onClick={handleReferNowClick} className="refer-and-earn-section-button">Refer Now</button>
        </div>
        <img src={referAndEarn} alt="Refer and Earn" />
      </div>
    </div>
  );
}

export default Courses;
