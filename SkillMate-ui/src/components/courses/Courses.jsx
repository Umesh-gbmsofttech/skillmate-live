import React, { useEffect, useState, useRef } from 'react';
import './Courses.css';
import logo from '../../assets/skillmate.jpg';
import referAndEarn from '../../assets/refer-earn.png';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';
import editIcon from '../../assets/editIcon.png'; // Corrected import for edit icon

function Courses() {
  const navigate = useNavigate();

  const handleCourseEditClick = () => {
    navigate('/admin-profile/edit-courses')
  }
  const handleCotactUsClick = () => {
    navigate('/contact');
  };
  const handleBuyNowClick = () => {
    navigate('/subscriptions');
  };
  const handleReferNowClick = () => {
    alert('Thanks your credit points added to your account');
  };

  const courses = [
    { id: 1, name: 'Course 1', description: 'Description of Course 1', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 2, name: 'Course 2', description: 'Description of Course 2', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 3, name: 'Course 3', description: 'Description of Course 3', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 4, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 5, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 6, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 7, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 8, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 9, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 10, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
    { id: 11, name: 'Course 4', description: 'Description of Course 4', rating: `4.5 ⭐⭐⭐⭐⭐ (1052)` },
  ];

  const [visibleCourses, setVisibleCourses] = useState([]);

  const courseRefs = useRef([visibleCourses]);

  useEffect(() => {
    courseRefs.current = courseRefs.current.slice(0, courses.length);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    // Observe each course element using ref
    courseRefs.current.forEach((course) => {
      if (course) observer.observe(course);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='list-of-courses-container'>
        <h1 className='list-of-courses-container-heading'>
          Explore a wide range of courses designed to help you succeed in the tech industry
        </h1>
        <Search />
        <div className="courses-card-container">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={(el) => (courseRefs.current[index] = el)}
              className="course-card"
            >
              <div className="course-image-container">
                <img src={logo} alt="course-logo" />
                <span className="course-rating">{course.rating}</span>
              </div>
              <div className="courses-card-container-courses-buttons">
                <button onClick={handleCotactUsClick} className="courses-card-container-courses-contact-us-button">Contact Us</button>
                <button onClick={handleBuyNowClick} className="courses-card-container-courses-buy-now-button">BUY NOW</button>
              </div>
              <img onClick={handleCourseEditClick} src={editIcon} alt="edit" className="edit-icon-a" />
            </div>
          ))}
        </div>
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
    </>
  );
}

export default Courses;



// import React, { useEffect, useState } from 'react';
// import './Courses.css';
// import logo from '../../assets/skillmate.jpg';
// import { useNavigate } from 'react-router-dom';

// function Courses({ userId }) {
//   const [userCourses, setUserCourses] = useState([]);
//   const navigate = useNavigate();

//   // Simulate fetching courses specific to a user
//   useEffect(() => {
//     if (userId) {
//       // For demonstration purposes, assuming we fetch the user's courses
//       const fetchedCourses = [
//         {
//           id: 1,
//           title: 'Web Development',
//           description: 'Learn HTML, CSS, JavaScript, and React to build dynamic web applications.',
//         },
//         {
//           id: 2,
//           title: 'Data Science',
//           description: 'Master data analysis, machine learning, and visualization using Python and R.',
//         },
//         {
//           id: 3,
//           title: 'Artificial Intelligence',
//           description: 'Explore AI fundamentals, deep learning, and natural language processing.',
//         },
//       ];
//       setUserCourses(fetchedCourses); // Here, you can fetch data from an API based on userId
//     }
//   }, [userId]);

//   // Navigate to subscriptions page
//   const handleBuyCourseClick = () => {
//     navigate('/subscriptions');
//   };

//   // Navigate to contact us page and pass course data
//   const handleContactUsClick = (courseData) => {
//     navigate('/contact', { state: { courseData } });
//   };

//   return (
//     <div>
//       <div className="course-container">
//         <h1 className="animate-text heading-primary">Courses</h1>
//         <p className="animate-text">
//           Explore a wide range of courses designed to help you succeed in the tech industry.
//         </p>
//         <div className="course-grid">
//           {userCourses.length > 0 ? (
//             userCourses.map((course) => (
//               <div key={course.id} className="course-box">
//                 <img src={logo} alt="Course Logo" />
//                 <h3 className="heading-secondary">{`Course ${course.id}: ${course.title}`}</h3>
//                 <p className="course-description">{course.description}</p>
//                 <button className="buy-button" onClick={handleBuyCourseClick}>
//                   Buy Now
//                 </button>
//                 <button className="contact-us-button" onClick={() => handleContactUsClick(course)}>
//                   Contact Us
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No courses available for this user.</p>
//           )}
//         </div>
//         <div className="referral-form-container">
//           <div className="referral-form">
//             <h2 className="heading-tertiary">Refer a Friend</h2>
//             <form>
//               <input type="text" placeholder="Name" />
//               <input type="email" placeholder="Email" />
//               <button type="submit">Refer Now</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Courses;
