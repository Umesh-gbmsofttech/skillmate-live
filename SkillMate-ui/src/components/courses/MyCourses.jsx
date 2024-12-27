import React from 'react';
import { useSelector } from 'react-redux';
import './MyCourses.css';
import logo from '../../assets/skillmate.jpg';

function MyCourses() {
    // Access purchased courses from Redux store
    const token = useSelector((state) => state.auth.token);
    const courses = useSelector((state) => state.courses.courses);

    const myCourses = [
        {
            title: "Introduction to React",
            date: "November 1, 2024",
            duration: "1 hour",
            imageUrl: logo,
            alt: "https://via.placeholder.com/300",
        },
        {
            title: "Advanced JavaScript",
            date: "November 3, 2024",
            duration: "2 hours",
            imageUrl: logo,
            alt: "https://via.placeholder.com/300",
        },
        {
            title: "CSS Grid and Flexbox",
            date: "November 5, 2024",
            duration: "1.5 hours",
            imageUrl: logo,
            alt: "https://via.placeholder.com/300",
        },
    ];

    return (
        <div className="my-courses-container">
            <h1>My Courses</h1>
            {myCourses.length > 0 ? (
                myCourses.map((course) => (
                    <div key={course._id} className="course-item">
                        <img src={course.imageUrl} alt={course.alt} />
                        <div className="course-details">
                            <h2>{course.name}</h2>
                            <p>{course.price}</p>
                            <p>{course.duration}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No courses purchased yet.</p>
            )}
        </div>
    );
}

export default MyCourses;
// import React from 'react';
// import './MyCourses.css';
// import logo from '../../assets/skillmate.jpg';

// function MyCourses() {

//     const sessions = [
//         {
//             title: "Introduction to React",
//             date: "November 1, 2024",
//             duration: "1 hour",
//             imageUrl: logo,
//             alt: "https://via.placeholder.com/300",
//         },
//         {
//             title: "Advanced JavaScript",
//             date: "November 3, 2024",
//             duration: "2 hours",
//             imageUrl: logo,
//             alt: "https://via.placeholder.com/300",
//         },
//         {
//             title: "CSS Grid and Flexbox",
//             date: "November 5, 2024",
//             duration: "1.5 hours",
//             imageUrl: logo,
//             alt: "https://via.placeholder.com/300",
//         },
//     ];

//     return (
//         <div className='my-courses-container'>
//             <h1>My Courses</h1>
//             <div className='my-courses-list'>
//                 {sessions.map((session, index) => (
//                     <div key={index} className='my-course-card'>
//                         <img src={session.imageUrl} alt={session.alt} className='session-image' />
//                         <div className='my-course-info'>
//                             <h2 className='my-course-title'>{session.title}</h2>
//                             <p className='my-course-date'>Date: {session.date}</p>
//                             <p className='my-course-duration'>Duration: {session.duration}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MyCourses;







