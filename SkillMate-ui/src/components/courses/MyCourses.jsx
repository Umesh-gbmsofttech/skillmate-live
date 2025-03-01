import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import logo from "../../assets/skillmate.jpg";
import { fetchCoursesAndBatches } from "../redux/myCoursesSlice";
import LiveSessions from "../subscription/LiveSessions";

function MyCourses() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { courses, loading, error } = useSelector((state) => state.myCourses);

    console.log(courses)

    useEffect(() => {
        if (isAuthenticated && userData?.id && courses.length >= 0) {
            dispatch(fetchCoursesAndBatches(userData.id));
        }
    }, [isAuthenticated, userData?.id, courses.length, dispatch]);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
    }

    if (error) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6" color="error">{error}</Typography></Box>;
    }

    if (courses.length < 0) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6">No courses purchased yet.</Typography></Box>;
    }

    return (
        <Box padding={4}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                My Courses
            </Typography>

            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
                Number of Courses: {courses.length}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardMedia
                                component="img"
                                alt={course.title}
                                height="200"
                                image={course.image ? `data:image/png;base64,${course.image}` : logo}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>{course.title}</Typography>
                                <Typography variant="body2" color="textSecondary">Price: {course.price}</Typography>
                                <Typography variant="body2" color="textSecondary">Description: {course.description}</Typography>
                                <Typography variant="body2" color="textSecondary">Days: {course.days}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Meetings: {course.meetings?.length || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <LiveSessions myCourses={courses} userData={userData} token={token} />
        </Box>
    );
}

export default MyCourses;
