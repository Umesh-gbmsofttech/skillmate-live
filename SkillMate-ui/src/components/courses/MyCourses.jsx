import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MyCourses.css';
import logo from '../../assets/skillmate.jpg';
import axios from 'axios';
import LiveSessions from '../subscription/LiveSessions';

function MyCourses() {
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch courses when the component mounts
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/students/fetch/my-courses/${userData.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyCourses(response.data);
        } catch (error) {
            setError('Error fetching courses.');
        } finally {
            setLoading(false);
        }
    };
    console.log('courses my: ', myCourses)

    // Corrected useEffect: Logs courses only when `myCourses` updates
    // useEffect(() => {
    //     console.log(myCourses)
    //     myCourses.forEach((course) => {
    //         console.log('COURSES:');
    //         console.log('course id:', course.id);
    //         // console.log('course cover image:', course.coverImage);
    //         console.log('course name:', course.courseName);
    //         console.log('course price:', course.price);
    //         console.log('course description:', course.description);
    //         console.log('course days:', course.days);
    //     });
    // }, [myCourses]); // Dependency updated to `myCourses`

    // Fetch courses when authenticated user changes
    useEffect(() => {
        if (isAuthenticated && userData?.id) {
            fetchCourses();
        }
    }, [isAuthenticated, userData?.id, token]); // Added `?.` for safety

    if (loading) {
        return <div>Loading courses...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (myCourses.length === 0) {
        return <p></p>;
    }

    return (
        <div className="my-courses-container">
            <h1>My Courses</h1>

            {/* Fixed: Display course names properly */}
            <h1>{myCourses.map((course) => course.courseName).join(', ')}</h1>

            {myCourses?.length > 0 ? (
                <div className="my-courses-list">
                    {myCourses.map((course) => (
                        <div key={course.id} className="my-course-card">
                            <img
                                src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
                                alt={course.courseName}
                                className="course-image"
                            />
                            <div className="my-course-info">
                                <h2 className="my-course-title">{course.courseName}</h2>
                                <p className="my-course-price">Price: {course.price}</p>
                                <p className="my-course-description">Description: {course.description}</p>
                                <p className="my-course-days">Days: {course.days}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses purchased yet.</p>
            )}

            <LiveSessions myCourses={myCourses} />
        </div>
    );
}

export default MyCourses;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import './MyCourses.css';
// import logo from '../../assets/skillmate.jpg';
// import axios from 'axios';

// function MyCourses() {
//     const token = useSelector((state) => state.auth.token);
//     const userData = useSelector((state) => state.auth.userData);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//     const [myCourses, setMyCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch courses when the component mounts
//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8080/courses/student/${userData.id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setMyCourses(response.data); // Store courses in state
//         } catch (error) {
//             setError('Error fetching courses.');
//         } finally {
//             setLoading(false); // Stop loading when the request is done
//         }
//     };

//     //this function is to console the course details, it is working well for console the courses
//     useEffect(() => {
//         myCourses.forEach((course) => {
//             console.log('COURSES:')
//             console.log('course id: ' + course.id);
//             console.log('course cover image: ' + course.coverImage);
//             console.log('course name: ' + course.courseName);
//             console.log('course price: ' + course.price);
//             console.log('course description: ' + course.description);
//             console.log('course days: ' + course.days);
//         });
//     }, [token, isAuthenticated, userData.id]);

//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchCourses();
//         }
//     }, [isAuthenticated, userData.id, token]);

//     if (loading) {
//         return <div>Loading courses...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="my-courses-container">
//             <h1>My Courses</h1>
//             <h1>{myCourses.forEach((course) => course.name)}</h1>
//             {myCourses.length > 0 ? (
//                 <div className="my-courses-list">
//                     {myCourses.map((course) => (
//                         <div key={course.id} className="my-course-card">
//                             <img
//                                 src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
//                                 alt={course.courseName}
//                                 className="course-image"
//                             />

//                             <div className="my-course-info">
//                                 <h2 className="my-course-title">{course.courseName}</h2>
//                                 <p className="my-course-price">Price: {course.price}</p>
//                                 <p className="my-course-description">Description: {course.description}</p>
//                                 <p className="my-course-days">Days: {course.days}</p>

//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No courses purchased yet.</p>
//             )}
//         </div>
//     );
// }

// export default MyCourses;
