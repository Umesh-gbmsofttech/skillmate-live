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
                    // console.log("trainer's batch id: " + batch?.id);
                    const response = await axios.get(`http://localhost:8080/students/batch/${batch.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    // console.log('students by batch id: ' + response.data)
                    allStudents = [...allStudents, ...response.data];
                    // console.log('all students: ', allStudents);
                } catch (error) {
                    // console.error('Error fetching students:', error);
                    showErrorToast(`Error fetching students: ${error}`);
                }
            }

            // Now fetch courses for each student
            const studentsWithCourses = await Promise.all(
                allStudents.map(async (student) => {
                    try {
                        if (student?.id !== '' && student?.id !== undefined) {
                            const coursesResponse = await axios.get(`http://localhost:8080/students/fetch/my-courses/${student.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            // Attach the fetched courses to the student
                            student.courses = coursesResponse.data;
                            // console.log("student", student.id)
                            // console.log('student my courses: ', coursesResponse.data);
                        }
                    } catch (error) {
                        // console.error(`Error fetching courses for student ${student.id}:`, error);
                        showErrorToast(`Error fetching courses for student ${student.id}:, ${error}`);
                    }
                    return student;
                })
            );

            setStudents(studentsWithCourses);
        };

        if (trainerBatches.length) fetchStudents();
    }, [trainerBatches, token]);

    console.log("Students: ", students)
    // Fetch batches for the trainer
    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/batches/by-trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTrainerBatches(response.data);
                // console.log('trainer batches: ', response.data);
            } catch (error) {
                // console.error('Error fetching batches:', error);
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

            // console.log("Checking student:", student.id);
            // console.log("Student Courses:", studentCourses);
            // console.log("Selected Course:", meetingDetails.selectedCourse);
            // console.log("Student Batches:", studentBatches);
            // console.log("Selected Batches:", meetingDetails.selectedBatches);

            const courseMatches = studentCourses.includes(parseInt(meetingDetails.selectedCourse)); // Ensure they are integers
            const batchMatches = studentBatches.some((batchId) =>
                meetingDetails.selectedBatches.includes(batchId)
            );

            return courseMatches;
            // return courseMatches && batchMatches;
        }).map((student) => ({
            id: student.id,
        }));

        console.log("Selected Student IDs: ", selectedStudentIds);




        console.log(students)
        if (selectedStudentIds.length === 0) {
            showWarningToast("No students match the selected course and batch.");
            return;
        }

        // Submit meeting details with selected students
        try {
            const response = await axios.post("http://localhost:8080/meetings/create", {
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
            // console.error("Error saving meeting:", error);
            showErrorToast(`Error saving meeting: ${error}`);
        }
    };

    return (
        <div style={{ padding: '40px 120px 10px 120px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Create a Meeting
                </Typography>
                <Grid container spacing={2}>
                    {/* Multiple Batches Selection */}
                    <Grid item xs={12}>
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
                                        {/* Display the course name or a fallback message */}
                                        <ListItemText
                                            primary={batch?.course ? `Batch Id: ${batch.id} ` : `${batch.id} `}
                                        />

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Single Course Selection */}
                    <Grid item xs={12}>
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
