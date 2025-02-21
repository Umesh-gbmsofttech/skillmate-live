import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Card, CardContent, CircularProgress, CardMedia } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import Search from '../Search';
import baseUrl from '../urls/baseUrl';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import Fuse from 'fuse.js';

function AssignCourseToTrainer() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [trainers, setTrainers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [trainerToAssignCourse, setTrainerToAssignCourse] = useState(null);

    const [filteredTrainers, setFilteredTrainers] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainerCoursesResponse = await axios.get(`${baseUrl}trainer-courses`); // Trainers already assigned to courses
                const trainersResponse = await axios.get(`${baseUrl}trainers`); // All trainers
                const coursesResponse = await axios.get(`${baseUrl}courses`); // All courses

                // Get trainer IDs with assigned courses
                const trainerIdsWithCourses = trainerCoursesResponse.data.map((trainerCourse) => trainerCourse.trainer.id);

                // Filter trainers who are not assigned to any course
                const trainersWithoutCourses = trainersResponse.data.filter((trainer) => !trainerIdsWithCourses.includes(trainer.id));

                // Set trainers and courses
                setTrainers(trainersWithoutCourses);
                setCourses(coursesResponse.data);
                setFilteredTrainers(trainersWithoutCourses); // Initially set filtered trainers to all trainers
                setFilteredCourses(coursesResponse.data); // Initially set filtered courses to all courses
                setLoading(false);
            } catch (error) {
                showErrorToast('Error fetching trainers or courses data!');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fuseTrainers = new Fuse(trainers, {
            keys: ['name', 'experience', 'technologies'], // Searchable fields
            threshold: 0.3, // Adjust the threshold for fuzzy matching
        });

        const fuseCourses = new Fuse(courses, {
            keys: ['title', 'description'],
            threshold: 0.3,
        });

        if (searchQuery) {
            const filteredTrainerResults = fuseTrainers.search(searchQuery).map(result => result.item);
            const filteredCourseResults = fuseCourses.search(searchQuery).map(result => result.item);

            setFilteredTrainers(filteredTrainerResults);
            setFilteredCourses(filteredCourseResults);
        } else {
            // Reset filtered results if no search query
            setFilteredTrainers(trainers);
            setFilteredCourses(courses);
        }
    }, [searchQuery, trainers, courses]);

    const handleAssignCourse = () => {
        // Send empty trainer and course if they are not selected
        const trainerId = selectedTrainer ? selectedTrainer.id : null;
        const courseId = selectedCourse ? selectedCourse.id : null;

        setTrainerToAssignCourse({ trainer: { id: trainerId }, course: { id: courseId } });
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmAssignCourse = async () => {
        if (trainerToAssignCourse) {
            const { trainer, course } = trainerToAssignCourse;

            try {
                const response = await axios.post(`${baseUrl}trainer-courses`, {
                    trainer: { id: trainer.id },
                    course: { id: course.id }
                });

                if (response.status === 201) {
                    showSuccessToast('Course assigned to trainer successfully!');
                    setIsConfirmDialogOpen(false);
                    setTrainerToAssignCourse(null);
                } else {
                    showErrorToast('Failed to assign course to trainer.');
                }
            } catch (error) {
                showErrorToast('An error occurred while assigning the course.');
            }
        }
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false);
        setTrainerToAssignCourse(null);
    };

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3} sx={{ padding: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" color='#3caacb'>
                            Assign Course to Trainer
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Search onSearch={setSearchQuery} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" color='#3caacb'>
                            Number of Results: {filteredTrainers.length}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" color='#3caacb'>
                            Select Trainer and Course to Assign
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {filteredTrainers.map((trainer) => (
                                <Grid key={trainer.id} item xs={12} sm={6} md={4} lg={3}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={trainer.image ? `data:image/png;base64,${trainer.image}` : '/default-image.png'}
                                            alt={`${trainer.name} profile`}
                                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" gutterBottom>
                                                {trainer.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" style={{ fontSize: '13px' }}>
                                                Experience: {trainer.experience}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" style={{ fontSize: '13px' }}>
                                                Experties: {trainer.technologies.join(', ')}
                                            </Typography>
                                        </CardContent>
                                        <Grid container justifyContent="space-around" sx={{ marginBottom: '8px' }} spacing={1}>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setSelectedTrainer(trainer)}
                                                >
                                                    Select Trainer
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {selectedTrainer && (
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" color='#3caacb'>
                                Select a Course for {selectedTrainer.name}
                            </Typography>

                            <Grid container spacing={3}>
                                {filteredCourses.map((course) => (
                                    <Grid key={course.id} item xs={12} sm={6} md={4} lg={3}>
                                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={course.image ? `data:image/png;base64,${course.image}` : '/default-image.png'}
                                                alt={`${course.title} profile`}
                                                sx={{ objectFit: 'cover', objectPosition: 'top' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {course.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" style={{ fontSize: '13px' }}>
                                                    Duration: {course.days} days
                                                </Typography>
                                            </CardContent>
                                            <Grid container justifyContent="space-around" sx={{ marginBottom: '8px' }} spacing={1}>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => setSelectedCourse(course)}
                                                    >
                                                        Select Course
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}

                    {selectedTrainer && selectedCourse && (
                        <Grid item xs={12} textAlign="center" style={{ marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleAssignCourse}
                            >
                                Assign {selectedCourse.title} to {selectedTrainer.name}
                            </Button>
                        </Grid>
                    )}

                    <ConfirmationDialog
                        open={isConfirmDialogOpen}
                        onClose={handleCancel}
                        onConfirm={handleConfirmAssignCourse}
                        message="Are you sure you want to assign this course to the selected trainer?"
                    />
                </Grid>
            )}
        </>
    );
}

export default AssignCourseToTrainer;
