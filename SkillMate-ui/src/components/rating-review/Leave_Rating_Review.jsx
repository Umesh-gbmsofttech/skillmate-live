import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTrainer, setStudent, clearCommunityData } from '../redux/communityDataSlice'; // Action creators
import { Box, Card, CardContent, Avatar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewsSection from './ReviewsSection'; // assuming this is a section that lists reviews
import altImage from '../../assets/skillmate.jpg';
import writeIcon from '../../assets/writeIcon.png';

function LeaveRatingReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Access trainer and student from Redux 
    const trainer = useSelector((state) => state.communityData.trainer);
    const student = useSelector((state) => state.communityData.student);

    // Clear previous community data when navigating to this page
    useEffect(() => {
        if (location.state?.trainer) {
            dispatch(clearCommunityData()); // Clear previous data
            dispatch(setTrainer(location.state.trainer));  // Store trainer if passed from location state
        }
        if (location.state?.student) {
            dispatch(clearCommunityData()); // Clear previous data
            dispatch(setStudent(location.state.student));  // Store student if passed from location state
        }
    }, [location.state, dispatch]);

    const user = {
        profilePic: altImage,
        name: 'John Doe',
        experience: '10 years',
        rating: '4.5 ⭐️⭐️⭐️⭐️⭐️',
    };

    const userType = trainer ? 'trainer' : student ? 'student' : '';

    const handleRateUsTypeTrainerClick = () => {
        navigate('/rating-reviews/page/card', { state: { trainer } });
    };

    const handleRateUsTypeStudentClick = () => {
        navigate('/rating-reviews/page/card', { state: { student } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 2, backgroundColor: '#1A2130' }}>
            {userType === 'trainer' && trainer && (
                <>
                    <Card sx={{ display: 'flex', flexDirection: 'column', width: 440, padding: 3, borderRadius: 2, backgroundColor: '#C7EFFF', boxShadow: 3, mb: 2 }}>
                        <Avatar
                            sx={{ width: '100%', height: 180, borderRadius: 2, objectFit: 'contain', objectPosition:'top' }}
                            src={trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : altImage}
                            alt="Trainer Image"
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {trainer?.fullName}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Experience: {trainer?.experience}</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Expertise: {trainer?.technologies}</Typography>
                            <Typography variant="body1">4.5 ⭐️⭐️⭐️⭐️⭐️</Typography>
                        </CardContent>
                    </Card>
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
                        onClick={handleRateUsTypeTrainerClick}
                    >
                        Leave a Rating and Review <img src={writeIcon} alt="Rate Us" style={{ marginLeft: 8, width: 30 }} />
                    </Button>
                </>
            )}
            {userType === 'student' && student && (
                <>
                    <Card sx={{ display: 'flex', flexDirection: 'column', width: 440, padding: 3, borderRadius: 2, backgroundColor: '#C7EFFF', boxShadow: 3, mb: 2 }}>
                        <Avatar
                            sx={{ width: '100%', height: 180, borderRadius: 1, objectFit: 'cover' }}
                            src={student.profilePic ? `data:image/png;base64,${student.profilePic}` : altImage}
                            alt="Student Image"
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {student?.fullName}
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
                            marginBottom: 2,
                            '&:hover': {
                                textShadow: '0 0 5px rgb(7, 212, 244)',
                                backgroundColor: 'rgb(214, 214, 214)',
                            },
                        }}
                        onClick={handleRateUsTypeStudentClick}
                    >
                        Leave a Rating and Review <img src={writeIcon} alt="Rate Us" style={{ marginLeft: 8, width: 3 }} />
                    </Button>
                </>
            )}

            <ReviewsSection user={userType === 'trainer' && trainer ? trainer : userType === 'student' && student ? student : null} />
        </Box>
    );
}

export default LeaveRatingReview;
