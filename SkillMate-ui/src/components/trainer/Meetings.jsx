import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function Meetings({ userData, trainerId, courses }) {
    const [meetingDetails, setMeetingDetails] = useState({
        fromTime: "",
        toTime: "",
        meetingLink: "",
        message: "",
        selectedBatches: [],
        selectedCourse: ""
    });
    const [previousMeetings, setPreviousMeetings] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [students, setStudents] = useState([]);
    const [trainerBatches, setTrainerBatches] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Fetch students list for each batch
    useEffect(() => {
        const fetchStudents = async () => {
            if (!trainerBatches.length) return;  // Only fetch if batches are available

            let allStudents = [];
            for (let batch of trainerBatches) {
                try {
                    const response = await axios.get(`${baseUrl}students/batch/${batch.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    allStudents = [...allStudents, ...response.data];
                } catch (error) {
                    showErrorToast(`Error fetching students: ${error}`);
                }
            }

            // Now fetch courses for each student
            const studentsWithCourses = await Promise.all(
                allStudents.map(async (student) => {
                    try {
                        if (student?.id !== '' && student?.id !== undefined) {
                            const coursesResponse = await axios.get(`${baseUrl}students/my-courses/${student.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            student.courses = coursesResponse.data;
                        }
                    } catch (error) {
                        showErrorToast(`Error fetching courses for student ${student.id}:, ${error}`);
                    }
                    return student;
                })
            );

            setStudents(studentsWithCourses);
        };

        if (trainerBatches.length) fetchStudents();
    }, [trainerBatches, token]);

    // Fetch batches for the trainer
    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`${baseUrl}batches/by-trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTrainerBatches(response.data);
            } catch (error) {
                showErrorToast(`Error fetching batches: ${error}`);
            }
        };

        if (trainerId && token) fetchBatches();
    }, [trainerId, token]);

    // Handle input changes for meeting form
    const handleMeetingInputChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle batch selection change
    const handleBatchChange = (e) => {
        const selectedBatchIds = e.target.value;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            selectedBatches: selectedBatchIds,
        }));
    };

    // Handle course selection change
    const handleCourseChange = (e) => {
        const selectedCourseId = e.target.value;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            selectedCourse: selectedCourseId,
        }));
    };

    // Handle meeting creation
    const handleSubmit = async () => {
        if (!meetingDetails.meetingLink || !meetingDetails.fromTime || !meetingDetails.toTime || !meetingDetails.selectedBatches.length || !meetingDetails.selectedCourse) {
            showWarningToast("Please fill out all fields.");
            return;
        }

        const selectedStudentIds = students.filter((student) => {
            const studentCourses = (student.courses || []).map((course) => course.id);
            const studentBatches = (student?.batches || []).map((batch) => batch.id);

            const courseMatches = studentCourses.includes(parseInt(meetingDetails.selectedCourse));
            const batchMatches = studentBatches.some((batchId) =>
                meetingDetails.selectedBatches.includes(batchId)
            );

            return courseMatches;
        }).map((student) => ({
            id: student.id,
        }));

        if (selectedStudentIds.length === 0) {
            showWarningToast("No students match the selected course and batch.");
            return;
        }

        // Submit meeting details with selected students
        try {
            const response = await axios.post("${baseUrl}meetings", {
                meetingLink: meetingDetails.meetingLink,
                fromTime: meetingDetails.fromTime,
                toTime: meetingDetails.toTime,
                message: meetingDetails.message,
                trainer: { id: trainerId },
                students: selectedStudentIds,
                courses: [{ id: meetingDetails.selectedCourse }],
                batches: meetingDetails.selectedBatches.map((batchId) => ({ id: batchId })),
            });

            showSuccessToast("Meeting created successfully");

            setMeetingDetails({
                fromTime: "",
                toTime: "",
                meetingLink: "",
                message: "",
                selectedBatches: [],
                selectedCourse: "",
            });

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
                    {/* Multiple Batches Selection */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Choose Batches</InputLabel>
                            <Select
                                label="Choose Batches"
                                multiple
                                value={meetingDetails.selectedBatches}
                                onChange={handleBatchChange}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {trainerBatches.map((batch) => (
                                    <MenuItem key={batch.id} value={batch.id}>
                                        <Checkbox checked={meetingDetails.selectedBatches.indexOf(batch.id) > -1} />
                                        <ListItemText primary={batch?.course ? `Batch Id: ${batch.id} ` : `${batch.id} `} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Single Course Selection */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Choose Course</InputLabel>
                            <Select
                                label="Choose Course"
                                value={meetingDetails.selectedCourse}
                                onChange={handleCourseChange}
                            >
                                {courses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.courseName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            {meeting.meetingLink} - {meeting.fromTime} to {meeting.toTime}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Meetings;
