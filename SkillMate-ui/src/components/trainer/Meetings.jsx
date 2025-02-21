import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, Avatar, Box } from '@mui/material';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl';

function Meetings({ userData, trainerId }) {
    const [meetingDetails, setMeetingDetails] = useState({
        fromTime: "",
        toTime: "",
        meetingLink: "",
        message: "",
        selectedBatches: [],
        selectedCourse: ""
    });
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [courses, setCourse] = useState([]);
    const [previousMeetings, setPreviousMeetings] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [trainerBatches, setTrainerBatches] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`${baseUrl}batches/trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('trainer batches fetched', response.data);
                setBatches(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        };

        if (trainerId && token) {
            fetchBatches();
        }
    }, [trainerId, token]);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`${baseUrl}batches/trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTrainerBatches(response.data);
            } catch (error) {
                showErrorToast(`Error fetching batches: ${error}`);
            }
        };

        if (trainerId && token) fetchBatches();
    }, [trainerId, token]);

    const handleMeetingInputChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleBatchChange = (e) => {
        const selectedBatchId = e.target.value;
        const selectedBatch = batches.find(batch => batch.id === selectedBatchId);
        const selectedCourse = selectedBatch ? selectedBatch.course : {};

        // Set meeting details based on the selected batch
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            selectedBatches: [selectedBatchId],
            selectedCourse: selectedCourse.id,
            fromTime: selectedBatch.startTime,
            toTime: selectedBatch.endTime,
        }));
    };

    const handleSubmit = async () => {
        if (!meetingDetails.meetingLink || !meetingDetails.fromTime || !meetingDetails.toTime || !meetingDetails.selectedBatches.length || !meetingDetails.selectedCourse) {
            showWarningToast("Please fill out all fields.");
            return;
        }

        const startTime = meetingDetails.fromTime;
        const endTime = meetingDetails.toTime;

        // Prepare the payload for the backend
        const payload = {
            startTime: startTime,
            endTime: endTime,
            meetingLink: meetingDetails.meetingLink,
            course: { id: meetingDetails.selectedCourse },
            trainer: { id: trainerId },
            batch: { id: meetingDetails.selectedBatches[0] },  // Only one batch can be selected
        };

        try {
            // Send the data to the backend
            const response = await axios.post(`${baseUrl}meetings`, payload);
            showSuccessToast("Meeting created successfully");

            // Reset meeting details after successful submission
            setMeetingDetails({
                fromTime: "",
                toTime: "",
                meetingLink: "",
                message: "",
                selectedBatches: [],
                selectedCourse: "",
            });

            // Update the list of previous meetings
            setPreviousMeetings((prevMeetings) => [response.data, ...prevMeetings]);
        } catch (error) {
            showErrorToast(`Error saving meeting: ${error}`);
        }
    };


    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Create a Meeting
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Choose Batch</InputLabel>
                            <Select
                                label="Choose Batch"
                                value={meetingDetails.selectedBatches[0] || ''}
                                onChange={handleBatchChange}
                                renderValue={(selected) => batches.find(batch => batch.id === selected)?.course.title + batches.id || 'Select Batch'}
                            >
                                {trainerBatches.map((batch) => (
                                    <MenuItem key={batch.id} value={batch.id}>
                                        <Checkbox checked={meetingDetails.selectedBatches.indexOf(batch.id) > -1} />
                                        <ListItemText primary={`Batch Id: ${batch.id} - ${batch.course.title}`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        {meetingDetails.selectedCourse && (
                            <Box display="flex" alignItems="center">
                                <Avatar src={`data:image/jpeg;base64,${batches.find(batch => batch.id === meetingDetails.selectedBatches[0])?.course.image}`} />
                                <Typography variant="body1" style={{ marginLeft: '10px' }}>
                                    {batches.find(batch => batch.id === meetingDetails.selectedBatches[0])?.course.title}
                                </Typography>
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Meeting Link"
                            name="meetingLink"
                            value={meetingDetails.meetingLink}
                            onChange={handleMeetingInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="From Time"
                            type="time"
                            name="fromTime"
                            value={meetingDetails.fromTime}
                            onChange={handleMeetingInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="To Time"
                            type="time"
                            name="toTime"
                            value={meetingDetails.toTime}
                            onChange={handleMeetingInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            value={meetingDetails.message}
                            onChange={handleMeetingInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Previous Meetings
                </Typography>
                <ul>
                    {previousMeetings.map((meeting, index) => (
                        <li key={index}>
                            {meeting.meetingLink} - {meeting.startTime} to {meeting.endTime}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Meetings;
