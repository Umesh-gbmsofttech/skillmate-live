import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Button, Box, Typography, TextField } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl';
import { useSelector } from 'react-redux';

function CreateBatch() {
    const [enrollments, setEnrollments] = useState([]);
    const [trainerCourse, setTrainerCourse] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        axios.get(`${baseUrl}enrollments`)
            .then(response => {
                setEnrollments(response.data);
            })
            .catch(() => {
                showErrorToast('Error fetching enrollments for course');
                setError('Error fetching enrollments');
            });

        axios.get(`${baseUrl}courses`)
            .then(response => {
                setCourses(response.data);
            })
            .catch(() => {
                showErrorToast('Error fetching courses');
                setError('Error fetching courses');
            });

        axios.get(`${baseUrl}trainer-courses`)
            .then(response => {
                setTrainerCourse(response.data);
            })
            .catch(() => {
                showErrorToast('Error fetching trainerCourse');
                setError('Error fetching trainerCourse');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    console.log(trainerCourse);
    const filteredTrainers = useMemo(() => {
        return trainerCourse.filter(tc => tc.course.id === selectedCourse);
    }, [selectedCourse, trainerCourse]);

    const filteredStudents = useMemo(() => {
        return enrollments.filter(e => e.course.id === selectedCourse);
    }, [selectedCourse, enrollments]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTrainer) {
            showErrorToast('Trainer does not belong to the selected course.');
            return;
        }

        // The correct trainer_id is from the TrainerCourse entity
        const batchData = {
            course: { id: selectedCourse },
            trainer_id: selectedTrainer,
            students: selectedStudents.map(id => ({ id })),
            startTime,
            endTime
        };

        console.log(batchData);  // Log to verify that trainer_id is being sent

        axios.post(`${baseUrl}batches`, batchData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(() => {
                showSuccessToast('Batch created successfully');
                navigate('/path-to-redirect');  // Redirect after successful creation
            })
            .catch(() => {
                showErrorToast('Error creating batch');
            });
    };


    const handleTrainerChange = (event) => {
        const trainerId = event.target.value;
        setSelectedTrainer(trainerId);
        console.log('trainer id of selected trainer, ', trainerId);
    };

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const handleStudentsChange = (event) => {
        setSelectedStudents(event.target.value);
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        padding: 3,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            bgcolor: '#f5f5f5',
                            boxShadow: 3,
                            borderRadius: 2,
                            p: 3,
                        }}
                    >
                        <Typography variant="h4" component="h2" gutterBottom>
                            Manage Batches
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Select Course</InputLabel>
                                <Select
                                    name="course"
                                    value={selectedCourse}
                                    onChange={handleCourseChange}
                                    renderValue={(selected) => {
                                        const course = courses.find(course => course.id === selected);
                                        return course ? course.title : 'Select Course';
                                    }}
                                >
                                    {courses?.map(course => (
                                        <MenuItem key={course.id} value={course.id}>
                                            <ListItemText primary={course.title} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Select Trainer</InputLabel>
                                <Select
                                    name="trainer"
                                    value={selectedTrainer}
                                    onChange={handleTrainerChange}
                                    renderValue={(selected) => {
                                        const trainer = filteredTrainers.find(trainer => trainer.trainer.id === selected);
                                        return trainer ? trainer.trainer.name : 'No trainer for this course';
                                    }}
                                >
                                    {filteredTrainers.length > 0 ? (
                                        filteredTrainers?.map(trainer => (
                                            <MenuItem key={trainer.trainer.id} value={trainer.trainer.id}>
                                                <ListItemText primary={trainer.trainer.name} />
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No trainer available for this course</MenuItem>
                                    )}
                                </Select>
                            </FormControl>


                            <FormControl fullWidth margin="normal">
                                <InputLabel>Assign Students</InputLabel>
                                <Select
                                    multiple
                                    name="enrollments"
                                    value={selectedStudents}
                                    onChange={handleStudentsChange}
                                    renderValue={(selected) => {
                                        return selected
                                            .map(id => {
                                                const enrollment = filteredStudents.find(enrollment => enrollment.student.id === id);
                                                return enrollment ? enrollment.student.name : 'No students available for this course';
                                            })
                                            .join(', ');
                                    }}
                                >
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents?.map(enrollment => (
                                            <MenuItem key={enrollment.id} value={enrollment.student.id}>
                                                <Checkbox checked={selectedStudents.indexOf(enrollment.student.id) > -1} />
                                                <ListItemText primary={enrollment.student.name} />
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No students available for this course</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <TextField
                                type="time"
                                label="Start Time"
                                fullWidth
                                variant="outlined"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />

                            <TextField
                                type="time"
                                label="End Time"
                                fullWidth
                                variant="outlined"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />

                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Create Batch
                            </Button>
                        </form>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default CreateBatch;
