import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
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
                remark: `Meeting joining at ${new Date().toLocaleTimeString()}`,
                student: { id: userData.id },
                course: { id: courseId },
            };

            const response = await axios.post(`${baseUrl}attendances/create`, attendanceData, {
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
        <Box padding={4}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                Upcoming Live Sessions
            </Typography>
            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            )}
            <Grid container spacing={3} justifyContent="center">
                {myCourses.filter(course => course?.meetings[0]?.meetingLink).length > 0 ? (
                    myCourses.filter(course => course?.meetings[0]?.meetingLink).map((course, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    alt={course.courseName}
                                    height="200"
                                    image={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">{course.courseName}</Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                                        Start Time: {course.meetings[0]?.fromTime || 'TBA'}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {course.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            marginTop: 2,
                                            width: '80%',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                backgroundColor: '#0056b3',
                                            },
                                        }}
                                        onClick={() => handleJoinClick(course)}
                                    >
                                        Join Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                        <Typography variant="h6" color="textSecondary">
                            No live sessions available.
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Box>
    );
}

export default LiveSessions;
// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
// import logo from '../../assets/skillmate.jpg';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// function LiveSessions({ myCourses }) {
//     const userData = useSelector((state) => state.auth.userData);
//     const [isLoading, setIsLoading] = useState(false);
//     const [loadingCourseId, setLoadingCourseId] = useState(null); // Track which course is loading
//     const [meetingLink, setMeetingLink] = useState(null); // Store meeting link to track attendance update

//     // Function to handle the join button click
//     const handleJoinClick = (course) => {
//         const link = course?.meetings[0]?.meetingLink;
//         if (link) {
//             const currentTime = new Date();
//             const formattedTime = currentTime.toISOString().slice(11, 19); // Extract "HH:mm:ss"

//             // Create attendance record when joining
//             createAttendance(course.id, formattedTime);

//             // Open the meeting link in the current tab
//             window.location.href = link; // This will open the link in the current tab

//             // Set meetingLink to the current meeting link to track when the user leaves
//             setMeetingLink(link);
//         } else {
//             console.log("Meeting link not available for the course:", course.courseName);
//         }
//     };

//     // Function to create attendance record when the student joins
//     const createAttendance = async (courseId, inTime) => {
//         setIsLoading(true);
//         try {
//             const attendanceData = {
//                 inTime: inTime,
//                 remark: `Meeting joining at ${new Date().toLocaleTimeString()}`,
//                 student: { id: userData.id },
//                 course: { id: courseId },
//             };

//             const response = await axios.post(`${baseUrl}attendances`, attendanceData, {
//                 headers: {
//                     Authorization: `Bearer ${userData.token}`,
//                 },
//             });

//             console.log('Attendance created:', response.data);
//         } catch (error) {
//             console.error('Error creating attendance record for student:', error);
//             alert('There was an error while marking your attendance. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Function to update attendance record when the student leaves (or exits the meeting)
//     const updateAttendance = async (exitTime, formattedExitTime) => {
//         try {
//             const attendanceData = {
//                 outTime: formattedExitTime,
//                 remark: `Meeting exit at ${new Date().toLocaleTimeString()}`,
//                 student: { id: userData.id },
//             };
//             console.log('Attendance updated:', attendanceData);
//             const response = await axios.put(`${baseUrl}attendances`, attendanceData, {
//                 headers: {
//                     Authorization: `Bearer ${userData.token}`,
//                 },
//             });

//             console.log('Attendance updated:', response.data);
//         } catch (error) {
//             console.error('Error updating attendance record:', error);
//             alert('There was an error while updating your attendance. Please try again.');
//         }
//     };

//     // Handle the visibilitychange event when the user switches tabs or closes the tab
//     useEffect(() => {
//         const handleVisibilityChange = () => {
//             if (document.visibilityState === 'hidden' && meetingLink) {
//                 // User is navigating away or closing the tab
//                 const exitTime = new Date();
//                 const formattedExitTime = exitTime.toISOString().slice(11, 19); // Format exit time
//                 updateAttendance(exitTime, formattedExitTime);
//             }
//         };

//         // Add visibilitychange event listener
//         document.addEventListener('visibilitychange', handleVisibilityChange);

//         // Cleanup the event listener on component unmount
//         return () => {
//             document.removeEventListener('visibilitychange', handleVisibilityChange);
//         };
//     }, [meetingLink]); // Re-run effect only when meetingLink changes

//     return (
//         <Box padding={4}>
//             <Typography variant="h4" color="primary" gutterBottom align="center">
//                 Upcoming Live Sessions
//             </Typography>
//             {isLoading && (
//                 <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                     <CircularProgress />
//                 </Box>
//             )}
//             <Grid container spacing={3} justifyContent="center">
//                 {myCourses.filter(course => course?.meetings[0]?.meetingLink).length > 0 ? (
//                     myCourses.filter(course => course?.meetings[0]?.meetingLink).map((course, index) => (
//                         <Grid item xs={12} sm={6} md={4} key={index}>
//                             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                 <CardMedia
//                                     component="img"
//                                     alt={course.courseName}
//                                     height="200"
//                                     image={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
//                                     sx={{ objectFit: 'cover' }}
//                                 />
//                                 <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//                                     <Typography variant="h6">{course.courseName}</Typography>
//                                     <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
//                                         Start Time: {course.meetings[0]?.fromTime || 'TBA'}
//                                     </Typography>
//                                     <Typography variant="body2" color="textSecondary">
//                                         {course.description}
//                                     </Typography>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         sx={{
//                                             marginTop: 2,
//                                             width: '80%',
//                                             '&:hover': {
//                                                 transform: 'scale(1.05)',
//                                                 backgroundColor: '#0056b3',
//                                             },
//                                         }}
//                                         onClick={() => handleJoinClick(course)}
//                                         disabled={isLoading || loadingCourseId === course.id}
//                                     >
//                                         {isLoading && loadingCourseId === course.id ? 'Joining...' : 'Join Now'}
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                         <Typography variant="h6" color="textSecondary">
//                             No live sessions available.
//                         </Typography>
//                     </Box>
//                 )}
//             </Grid>
//         </Box>
//     );
// }

// export default LiveSessions;
