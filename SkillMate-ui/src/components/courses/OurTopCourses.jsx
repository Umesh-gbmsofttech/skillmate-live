import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Button, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // MUI Edit icon

function OurTopCourses() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const courses = useSelector((state) => state.courses.courses);
    const username = useSelector((state) => state.auth.username);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visibleCards, setVisibleCards] = useState([]);

    // Ref to hold the course cards
    const cardRefs = useRef([]);

    const handleBuyNowClick = (course) => {
        navigate('/subscriptions', { state: { course } });
    };

    const handleCourseEditClick = (course) => {
        navigate('/admin-profile/edit-courses', { state: { course } });
    };

    useEffect(() => {
        if (!courses || courses.length === 0) {
            const fetchCourses = async () => {
                setLoading(true);
                try {
                    const response = await axios.get('http://localhost:8080/courses/fetch', {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    dispatch({ type: "SET_COURSES", payload: response.data });
                } catch (error) {
                    setError('Failed to fetch courses.');
                } finally {
                    setLoading(false);
                }
            };

            fetchCourses();
        }

        // Intersection Observer
        cardRefs.current = cardRefs.current.slice(0, courses?.length);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

        cardRefs.current.forEach((course, index) => {
            if (course) observer.observe(course);
        });

        return () => observer.disconnect();
    }, [courses, dispatch]);

    return (
        <Box sx={{ backgroundColor: '#1A2130', padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#A6CDC6' }}>
                Our Top Courses
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {courses?.map((course, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box
                            ref={(el) => (cardRefs.current[index] = el)}
                            sx={{
                                boxShadow: 4,
                                backgroundColor: '#FBF5DD',
                                borderRadius: 2,
                                overflow: 'hidden',
                                opacity: 0,
                                transform: 'translateY(50px)',
                                transition: 'transform 0.8s ease, opacity 1.8s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                '&.visible': {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                },
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: 10,
                                },
                            }}
                        >
                            <img
                                src={`data:image/jpeg;base64,${course.coverImage}`}
                                alt={course.courseName}
                                style={{ width: '100%', height: 230, objectFit: 'cover' }}
                            />
                            <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 1 }}>
                                    {course.courseName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#555', marginBottom: 1 }}>
                                    {course.trainerName || 'Trainer Name'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#555', marginBottom: 1 }}>
                                    {course.rating || 'No reviews yet'}
                                </Typography>
                                <Box sx={{ marginTop: 'auto' }}>
                                    <Button
                                        onClick={() => handleBuyNowClick(course)}
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        Buy Now
                                    </Button>
                                    {username === 'ADMIN' && (
                                        <IconButton
                                            onClick={() => handleCourseEditClick(course)}
                                            sx={{
                                                position: 'absolute',
                                                top: 300,
                                                right: 16,
                                                width: 20,
                                                height: 20,
                                                '&:hover': { transform: 'scale(1.1)', backgroundColor: 'yellowgreen' },
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default OurTopCourses;
