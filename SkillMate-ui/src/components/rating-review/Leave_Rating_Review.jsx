import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTrainer, setStudent, clearCommunityData } from '../redux/communityDataSlice';
import { fetchCoursesAndBatches } from '../redux/myCoursesSlice';
import { fetchTrainerCourses } from '../redux/trainerCoursesSlice';
import { Box, Card, CardContent, Avatar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewsSection from './ReviewsSection';
import altImage from '../../assets/skillmate.jpg';
import writeIcon from '../../assets/writeIcon.png';

function LeaveRatingReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    // Get trainer and student from Redux
    // const trainer = useSelector((state) => state.communityData.trainer);
    const trainer = location.state?.trainer;
    const student = useSelector((state) => state.communityData.student);

    // Get courses from Redux
    const myCourses = useSelector((state) => state.myCourses.courses);
    const trainerCourses = useSelector((state) => state.trainerCourses.courses);

    console.log('My Courses:', myCourses);
    console.log('Trainer Courses:', trainerCourses);

    // Fetch enrolled courses when the component mounts
    useEffect(() => {
        if (userData?.id) {
            dispatch(fetchCoursesAndBatches(userData.id));  // Fetch student's enrolled courses
        }
    }, [dispatch, userData]);

    // Fetch trainer's courses only if a trainer exists
    useEffect(() => {
        if (trainer?.id) {
            dispatch(fetchTrainerCourses(trainer.id));
        }
    }, [dispatch, trainer]);

    // Extract course IDs for comparison
    const myCourseIds = myCourses.map(course => course.id);
    const trainerCourseIds = trainerCourses.map(tc => tc.course?.id); // Extract course.id from trainerCourses

    // Check if there's a matching course ID
    const hasMatchingCourse = trainer && myCourseIds.some(courseId => trainerCourseIds.includes(courseId));

    const handleRateUsClick = () => {
        navigate('/rating-reviews/page/card', { state: { trainer } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 2, backgroundColor: '#1A2130' }}>
            {trainer && (
                <>
                    <Card sx={{ display: 'flex', flexDirection: 'column', width: 440, padding: 3, borderRadius: 2, backgroundColor: '#C7EFFF', boxShadow: 3, mb: 2 }}>
                        <Avatar
                            sx={{ width: '100%', height: 180, borderRadius: 2, objectFit: 'contain', objectPosition: 'top' }}
                            src={trainer.image ? `data:image/png;base64,${trainer.image}` : altImage}
                            alt="Trainer Image"
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {trainer?.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Experience: {trainer?.experience}</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Expertise: {trainer?.technologies}</Typography>
                            <Typography variant="body1">4.5 ⭐️⭐️⭐️⭐️⭐️</Typography>
                        </CardContent>
                    </Card>

                    {hasMatchingCourse && (
                        <Button
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                color: 'primary.main',
                                mt: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    textShadow: '0 0 5px rgb(7, 212, 244)',
                                },
                            }}
                            onClick={handleRateUsClick}
                        >
                            Leave a Rating and Review <img src={writeIcon} alt="Rate Us" style={{ marginLeft: 8, width: 30 }} />
                        </Button>
                    )}
                </>
            )}

            {/* No "Leave a Rating and Review" button for students */}
            {student && (
                <Card sx={{ display: 'flex', flexDirection: 'column', width: 440, padding: 3, borderRadius: 2, backgroundColor: '#C7EFFF', boxShadow: 3, mb: 2 }}>
                    <Avatar
                        sx={{ width: '100%', height: 180, borderRadius: 1, objectFit: 'cover' }}
                        src={student.profilePic ? `data:image/png;base64,${student.profilePic}` : altImage}
                        alt="Student Image"
                    />
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {student?.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>Experience: {student?.experience}</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Expertise:
                            {student?.courses && student.courses.length > 0 ? (
                                student.courses.map((course, idx) => <li key={idx}>{course.courseName}</li>)
                            ) : (
                                <li>No expertise listed</li>
                            )}
                        </Typography>
                        <Typography variant="body1">4.5 ⭐️⭐️⭐️⭐️⭐️</Typography>
                    </CardContent>
                </Card>
            )}

            <ReviewsSection trainer={trainer} />
        </Box>
    );
}

export default LeaveRatingReview;
