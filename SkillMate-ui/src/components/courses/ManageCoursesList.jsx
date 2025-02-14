import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions';
import Loading from '../../Loading';
import Fuse from 'fuse.js';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '../utility/ToastService';
import Search from '../Search';
import baseUrl from '../urls/baseUrl'


function ManageCoursesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const courses = useSelector((state) => state.courses.courses);
    const [searchQuery, setSearchQuery] = useState('');
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isFullDescriptionDialogOpen, setIsFullDescriptionDialogOpen] = useState(false);
    const [fullDescriptionContent, setFullDescriptionContent] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${baseUrl}courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setCourses(response.data));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch courses.');
                showErrorToast('Failed to fetch courses.');
                setLoading(false);
            }
        };

        if (token) {
            fetchCourses();
        } else {
            setError('Authorization token is missing or invalid.');
            showWarningToast('Authorization token is missing or invalid.');
            setLoading(false);
        }
    }, [token, dispatch]);

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

    const handleConfirmDelete = async () => {
        if (courseToDelete) {
            try {
                const response = await axios.delete(`${baseUrl}courses/${courseToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    showSuccessToast('Course deleted successfully!');
                    const updatedCourses = courses.filter((course) => course.id !== courseToDelete);
                    dispatch(setCourses(updatedCourses)); // Update the course list in the Redux store
                } else {
                    showInfoToast('Failed to delete the course. Please try again.');
                }
            } catch (error) {
                setError('Failed to delete the course. Please try again.');
                showErrorToast('Failed to delete the course. Please try again.');
            }
        }
        setIsConfirmDialogOpen(false); // Close the dialog after confirming deletion
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
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom color='#3caacb'>
                    Courses List
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Search onSearch={setSearchQuery} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="body1" align="center" color='#3caacb'>
                    Number of Results: {filteredCourses.length}
                </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
                <Button variant="contained" color="primary" onClick={handleCourseAddClick}>
                    Add New Course
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={3}>
                    {filteredCourses.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" color="textSecondary">
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
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Duration: {course.days}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Time: {course.time}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Price: {course.price}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary" overflow="hidden">
                                            Description: {course.description.length > 40 ? `${course.description.substring(0, 40)}...` : course.description}
                                            {course.description.length > 40 && (
                                                <Button size="small" sx={{ marginLeft: 'auto' }} onClick={() => handleReadMore(course.description)}>
                                                    Read More
                                                </Button>
                                            )}
                                        </Typography>
                                    </CardContent>

                                    <Grid container justifyContent="space-around" spacing={1} sx={{ paddingBottom: 2 }}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleCourseEditClick(course)}
                                            >
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteCourse(course.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>

            {/* Confirmation Dialog */}
            <Dialog open={isConfirmDialogOpen} onClose={handleCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this course?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

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
