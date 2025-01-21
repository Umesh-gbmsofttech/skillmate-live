import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

function Meetings() {
    const [meetingDetails, setMeetingDetails] = useState({
        fromTime: "",
        toTime: "",
        meetingLink: "",
        message: "",
    });
    const [previousMeetings, setPreviousMeetings] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const trainerId = useSelector((state) => state.auth.userData.id);

    // Handle input changes for meeting form
    const handleMeetingInputChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle meeting creation
    const handleSubmit = async () => {
        if (!meetingDetails.meetingLink || !meetingDetails.fromTime || !meetingDetails.toTime) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/meetings/create", {
                meetingLink: meetingDetails.meetingLink,
                fromTime: meetingDetails.fromTime,
                toTime: meetingDetails.toTime,
                message: meetingDetails.message,
                trainer: { id: trainerId },
            });

            alert("Meeting saved successfully");

            // Reset meeting form fields after submission
            setMeetingDetails({
                fromTime: "",
                toTime: "",
                meetingLink: "",
                message: "",
            });

            // Update previous meetings state
            setPreviousMeetings((prevMeetings) => [response.data, ...prevMeetings]);
        } catch (error) {
            console.error("Error saving meeting:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Update Meeting Link
                </Typography>
                <Grid container spacing={2}>
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
                            label="Meeting Link"
                            name="meetingLink"
                            value={meetingDetails.meetingLink}
                            onChange={handleMeetingInputChange}
                            placeholder="Enter meeting link"
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
                            placeholder="Enter meeting message"
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
