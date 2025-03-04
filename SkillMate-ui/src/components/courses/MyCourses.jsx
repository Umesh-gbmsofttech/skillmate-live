import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import logo from "../../assets/skillmate.jpg";
import { fetchCoursesAndBatches } from "../redux/myCoursesSlice";
import LiveSessions from "../subscription/LiveSessions";
import { showErrorToast, showSuccessToast } from "../utility/ToastService";
import Details from "../utility/Details";

function MyCourses() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { courses, loading, error } = useSelector((state) => state.myCourses);
    const [fullDescription, setFullDescription] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    console.log(courses)

    useEffect(() => {
        if (isAuthenticated && userData?.id && courses.length >= 0) {
            dispatch(fetchCoursesAndBatches(userData.id));
        }
    }, [isAuthenticated, userData?.id, courses.length, dispatch]);

    // Handle open dialog
    const handleOpenDialog = (description) => {
        setFullDescription(description);
        setOpenDialog(true);
    };

    // Handle close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFullDescription('');
    };

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
        <Box padding={4} textAlign={'center'}>
            <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: { xs: 'var(--font-size-p2)', md: 'var(--font-size-p1)' }, fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: { xs: 'block', md: 'inline-block' }, border: "none", padding: { xs: '0 20px', md: '0px' }, mb: 3 }}>
                My Courses
            </Typography>

            <Typography sx={{ marginBottom: 2, fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)' }}>
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
                                <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p2)', mb: 1 }}>{course.title}</Typography>
                                <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p3)' }}>Price: {course.price} /-</Typography>
                                <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p3)' }}>Duration: {course.days} Days</Typography>
                                <Typography onClick={() => handleOpenDialog(course.description)} sx={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p3)', cursor: 'pointer', mt: 1 }}>Description: {course.description}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Meetings: {course.meetings?.length || 0}
                                </Typography>
                            </CardContent>
                            <Box sx={{ textAlign: "center", justifyContent: "center", paddingTop: "10px" }}>
                                <Typography onClick={async () => { showSuccessToast(`hi ${userData?.name} redirecting to review page`) }} sx={{ cursor: "pointer", display: 'inline' }}>  write review</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <LiveSessions myCourses={courses} userData={userData} token={token} />

            <Details open={openDialog} onClose={handleCloseDialog} title="Course Description" content={fullDescription} />
        </Box>
    );
}

export default MyCourses;
