import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Button } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl';
import { useSelector } from 'react-redux'; // Added useSelector import for token

function CreateBatch() {
    const [enrollments, setEnrollments] = useState([]);
    const [trainerCourse, setTrainerCourse] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token); // Assuming the token is stored in redux

    useEffect(() => {
        // Fetch enrollments
        axios.get(`${baseUrl}enrollments`)
            .then(response => {
                setEnrollments(response.data); // response contains an array of student objects
            })
            .catch(error => {
                showErrorToast('Error fetching enrollments for course');
                setError('Error fetching enrollments');
            });

        // Fetch trainerCourse
        axios.get(`${baseUrl}trainer-courses`)
            .then(response => {
                setTrainerCourse(response.data); // response contains an array of trainer objects
            })
            .catch(error => {
                showErrorToast('Error fetching trainerCourse');
                setError('Error fetching trainerCourse');
            })
            .finally(() => {
                setLoading(false); // stop loading state after both API calls
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const batchData = {
            trainer: { id: selectedTrainer }, // sending only trainer id
            enrollments: selectedStudents.map(id => ({ id })) // sending selected student ids
        };

        // POST request to create the batch with authorization header
        axios.post(`${baseUrl}batches`, batchData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adding Bearer token here
            }
        })
            .then(response => {
                showSuccessToast('Batch created successfully');
                // navigate('/batches'); // Redirect to batches page or wherever needed
            })
            .catch(error => {
                showErrorToast('Error creating batch');
            });
    };

    const handleTrainerChange = (event) => {
        setSelectedTrainer(event.target.value);
    };

    const handleStudentsChange = (event) => {
        setSelectedStudents(event.target.value);
    };

    console.log('trainerCourse: ', trainerCourse) // array of trainer objects
    console.log('enrollments: ', enrollments) // array of student objects

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="admin__batch-management">
                    <h2>Manage Batches</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Select Single Trainer */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Select Trainer</InputLabel>
                            <Select
                                name="trainer"
                                value={selectedTrainer}
                                onChange={handleTrainerChange}
                                renderValue={(selected) => {
                                    const trainer = trainerCourse.find(trainer => trainer.id === selected);
                                    return trainer ? trainer.trainer.name : 'Select Trainer';
                                }}
                            >
                                {trainerCourse?.map(trainer => (
                                    <MenuItem key={trainer.id} value={trainer.id}>
                                        <ListItemText primary={trainer.trainer.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Select Multiple Students */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Assign Students</InputLabel>
                            <Select
                                multiple
                                name="enrollments"
                                value={selectedStudents}
                                onChange={handleStudentsChange}
                                renderValue={(selected) => {
                                    return selected.map(id => {
                                        const enrollment = enrollments.find(enrollment => enrollment.student.id === id);
                                        return enrollment ? enrollment.student.name : '';
                                    }).join(', ');
                                }}
                            >
                                {enrollments?.map(enrollment => (
                                    <MenuItem key={enrollment.id} value={enrollment.student.id}>
                                        <Checkbox checked={selectedStudents.indexOf(enrollment.student.id) > -1} />
                                        <ListItemText primary={enrollment.student.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Batch
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}

export default CreateBatch;
