import React, { useEffect, useState } from 'react';
import './LiveSessions.css';
import logo from '../../assets/skillmate.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';

function LiveSessions({ myCourses }) {
    const userData = useSelector((state) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(false);

    const handleJoinClick = (course) => {
        const meetingLink = course?.meetings[0]?.meetingLink;
        if (meetingLink) {
            // Get current time and format it to HH:mm:ss (24-hour format)
            const currentTime = new Date();
            const formattedTime = currentTime.toISOString().slice(11, 19); // Extracts "HH:mm:ss" from ISO string

            // Create attendance record
            createAttendance(course.id, formattedTime);

            // Open meeting link in a new tab
            window.open(meetingLink, '_blank', 'noopener,noreferrer');
        } else {
            console.log("Meeting link not available for the course:", course.courseName);
        }
    };


    // Function to create attendance record when student joins
    const createAttendance = async (courseId, inTime) => {
        setIsLoading(true);
        try {
            const attendanceData = {
                inTime: inTime,
                remark: `Meeting joing at ${new Date().toLocaleTimeString()}`, // You can adjust this remark if necessary
                student: {
                    id: userData.id,
                },
                course: {
                    id: courseId,
                }
            };

            const response = await axios.post('http://localhost:8080/attendances/create', attendanceData, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });

            console.log('Attendance created:', response.data);
        } catch (error) {
            console.error('Error creating attendance record for student:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='live-session-container'>
            <h1>Upcoming Live Sessions</h1>
            <div className='session-list'>
                {myCourses.filter(course => course?.meetings[0]?.meetingLink).length > 0 ? (
                    myCourses.filter(course => course?.meetings[0]?.meetingLink).map((course, index) => (
                        <div key={index} className='session-card'>
                            <img
                                src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
                                alt={course.courseName}
                                className='session-image'
                            />
                            <div className='session-info'>
                                <h2 className='session-title'>{course.courseName}</h2>
                                <p className='session-date'>Start Time: {course.meetings[0]?.fromTime || 'TBA'}</p>
                                <p className='session-description'>{course.description}</p>
                                <button
                                    className='join-button'
                                    onClick={() => handleJoinClick(course)}
                                >
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No live sessions available.</p>
                )}
            </div>
        </div>
    );
}

export default LiveSessions;
// import React, { useEffect } from 'react';
// import './LiveSessions.css';
// import logo from '../../assets/skillmate.jpg';

// function LiveSessions({ myCourses }) {

//     const handleJoinClick = (course) => {
//         const meetingLink = course?.meetings[0]?.meetingLink;
//         if (meetingLink) {
//             window.open(meetingLink, '_blank', 'noopener,noreferrer');
//         } else {
//             console.log("Meeting link not available for the course:", course.courseName);
//         }
//     };

//     return (
//         <div className='live-session-container'>
//             <h1>Upcoming Live Sessions</h1>
//             <div className='session-list'>
//                 {myCourses.filter(course => course?.meetings[0]?.meetingLink).length > 0 ? (
//                     myCourses.filter(course => course?.meetings[0]?.meetingLink).map((course, index) => (
//                         <div key={index} className='session-card'>
//                             <img
//                                 src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
//                                 alt={course.courseName}
//                                 className='session-image'
//                             />
//                             <div className='session-info'>
//                                 <h2 className='session-title'>{course.courseName}</h2>
//                                 <p className='session-date'>Start Date: {course.meetings[0]?.fromTime || 'TBA'}</p>
//                                 <p className='session-duration'>Duration: {course.duration || 'TBA'}</p>
//                                 <p className='session-description'>{course.description}</p>
//                                 <button
//                                     className='join-button'
//                                     onClick={() => handleJoinClick(course)}
//                                 >
//                                     Join Now
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No live sessions available.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default LiveSessions;
