import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
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

    useEffect(() => {
        if (isAuthenticated && userData?.id) {
            fetchCourses();
        }
    }, [isAuthenticated, userData?.id, token]);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
    }

    if (error) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6" color="error">{error}</Typography></Box>;
    }

    if (myCourses.length === 0) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6">No courses purchased yet.</Typography></Box>;
    }

    return (
        <Box padding={4}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                My Courses
            </Typography>

            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
                Number of Courses: {myCourses.length}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {myCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                alt={course.courseName}
                                height="200"
                                image={course.coverImage ? `data:image/png;base64,${course.coverImage}` : logo}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>{course.courseName}</Typography>
                                <Typography variant="body2" color="textSecondary">Price: {course.price}</Typography>
                                <Typography variant="body2" color="textSecondary">Description: {course.description}</Typography>
                                <Typography variant="body2" color="textSecondary">Days: {course.days}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <LiveSessions myCourses={myCourses} />
        </Box>
    );
}

export default MyCourses;
