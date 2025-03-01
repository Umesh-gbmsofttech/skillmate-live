import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Loading';
import Fuse from 'fuse.js';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '../utility/ToastService';
import Search from '../Search';
import baseUrl from '../urls/baseUrl'
import { fetchCourses, deleteCourse } from '../redux/coursesSlice';
import CustomButton from '../utility/CustomButton';
import ConfirmationDialog from '../utility/ConfirmationDialog';


function ManageCoursesList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isFullDescriptionDialogOpen, setIsFullDescriptionDialogOpen] = useState(false);
    const [fullDescriptionContent, setFullDescriptionContent] = useState('');
    const dispatch = useDispatch();
    const { courses, status, error } = useSelector((state) => state.courses);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchCourses());
        } else {
            showWarningToast('Authorization token is missing or invalid.');
        }
        setLoading(false);
    }, [token, dispatch]);

    if (status === 'loading') return <Loading />;
    if (status === 'failed') return <Typography color="error">{error?.message || error}</Typography>;

    // Configure Fuse.js for fuzzy search
    const fuse = new Fuse(courses, {
        keys: ['courseName', 'description', 'price', 'days'],
        threshold: 0.3, // Adjust for strictness (lower means stricter matching)
    });

    const filteredCourses = searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : courses;

    const handleCourseEditClick = (course) => {
        navigate('/admin-profile/edit-courses', { state: { course } });
    };

    const handleCourseAddClick = () => {
        navigate('/admin-profile/edit-course', { state: { course: null } });
    };

    const handleDeleteCourse = (courseId) => {
        setCourseToDelete(courseId);
        setIsConfirmDialogOpen(true); // Open the confirmation dialog
    };

    const handleConfirmDelete = () => {
        if (courseToDelete) {
            dispatch(deleteCourse(courseToDelete));
        }
        setIsConfirmDialogOpen(false);
    };


    const handleCancel = () => {
        setIsConfirmDialogOpen(false); // Close the dialog without deleting
        setCourseToDelete(null); // Clear the course to delete
    };

    const handleReadMore = (description) => {
        setFullDescriptionContent(description);
        setIsFullDescriptionDialogOpen(true); // Open the dialog to show the full description
    };

    const handleCloseDescriptionDialog = () => {
        setIsFullDescriptionDialogOpen(false); // Close the full description dialog
    };

    if (loading) {
        return <Loading />;
    }

    // if (error) {
    //     return <Typography color="error">{error}</Typography>;
    // }

    return (
        <Grid container spacing={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Grid item xs={12}>
                <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: 'inline-block', padding: '0 80px', border: "none" }}>
                    Course&apos;s List
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Search onSearch={setSearchQuery} />
            </Grid>

            <Grid item xs={12}>
                <Typography sx={{ marginBottom: 2, fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)' }}>
                    Number of Results: {filteredCourses.length}
                </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
                <CustomButton text={'Add New Course'} onClick={handleCourseAddClick} />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={3}>
                    {filteredCourses.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography sx={{ marginBottom: 2, fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)' }}>
                                No courses available.
                            </Typography>
                        </Grid>
                    ) : (
                        filteredCourses.map((course) => (
                            <Grid key={course.id} item xs={12} sm={6} md={4} lg={3}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`data:image/jpeg;base64,${course.image}` || '/path/to/placeholder-image.jpg'}
                                        alt={`${course.courseName} cover`}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }} style={{ padding: "8px" }}>
                                        <Typography sx={{ fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)', fontWeight: 'bold' }} gutterBottom>
                                            {course.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                            Duration: {course.days}
                                        </Typography>
                                        <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                            Time: {course.time}
                                        </Typography>
                                        <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                            Price: {course.price}
                                        </Typography>

                                        <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                            Description: {course.description.length > 40 ? `${course.description.substring(0, 40)}...` : course.description}
                                            {course.description.length > 40 && (
                                                <Button size="small" sx={{ marginLeft: 'auto', ":focus": { border: "none", outline: "none" }, ":hover": { border: "none", outline: "none" } }} onClick={() => handleReadMore(course.description)}>
                                                    Read More
                                                </Button>
                                            )}
                                        </Typography>
                                    </CardContent>

                                    <Grid container justifyContent="space-around" spacing={1} sx={{ paddingBottom: 2 }}>
                                        <Grid item>
                                            <CustomButton text={'Edit'} padding={'5px 5px'} onClick={() => handleCourseEditClick(course)} />
                                        </Grid>
                                        <Grid item>
                                            <CustomButton text={'Delete'} padding={'5px 5px'} color={'var(--color-p2)'} backgroundColor={'var(--color-p4)'} onClick={() => handleDeleteCourse(course.id)} />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                open={isConfirmDialogOpen}
                onClose={handleCancel}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this course?"
            />

            {/* Full Description Dialog */}
            <Dialog open={isFullDescriptionDialogOpen} onClose={handleCloseDescriptionDialog}>
                <DialogTitle>Description:</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{fullDescriptionContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDescriptionDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default ManageCoursesList;
