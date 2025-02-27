import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrainerBatches } from '../redux/trainerBatchesSlice';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
} from '../utility/ToastService';
import baseUrl from '../urls/baseUrl';
import axios from 'axios';

function Meetings({ userData, trainerId }) {
    const dispatch = useDispatch();
    const { batches, loading, error } = useSelector(
        (state) => state.trainerBatches
    );
    const token = useSelector((state) => state.auth.token);

    const [meetingDetails, setMeetingDetails] = useState({
        fromTime: '',
        toTime: '',
        meetingLink: '',
        message: '',
        selectedBatches: [],
        selectedCourse: '',
    });

    const [previousMeetings, setPreviousMeetings] = useState([]);

    // Fetch batches only if trainerId is available and batches are not yet loaded
    useEffect(() => {
        if (trainerId && batches.length === 0) {
            dispatch(fetchTrainerBatches(trainerId));
        }
    }, [trainerId, batches.length, dispatch]);

    // Optimized handleMeetingInputChange using useCallback
    const handleMeetingInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    }, []);

    // Optimized handleBatchChange using useCallback and refactored logic
    const handleBatchChange = useCallback((e) => {
        const selectedBatchId = e.target.value;
        const selectedBatch = batches.find((batch) => batch.id === selectedBatchId);

        if (selectedBatch) {
            setMeetingDetails((prevDetails) => ({
                ...prevDetails,
                selectedBatches: [selectedBatchId],
                selectedCourse: selectedBatch.course.id,
                fromTime: selectedBatch.startTime,
                toTime: selectedBatch.endTime,
            }));
        } else {
            setMeetingDetails((prevDetails) => ({
                ...prevDetails,
                selectedBatches: [],
                selectedCourse: '',
                fromTime: '',
                toTime: '',
            }));
        }
    }, [batches]);

    // Optimized handleSubmit using useCallback and refactored logic
    const handleSubmit = useCallback(async () => {
        if (
            !meetingDetails.meetingLink ||
            !meetingDetails.fromTime ||
            !meetingDetails.toTime ||
            !meetingDetails.selectedBatches.length ||
            !meetingDetails.selectedCourse
        ) {
            showWarningToast('Please fill out all fields.');
            return;
        }

        const payload = {
            startTime: meetingDetails.fromTime,
            endTime: meetingDetails.toTime,
            meetingLink: meetingDetails.meetingLink,
            course: { id: meetingDetails.selectedCourse },
            trainer: { id: trainerId },
            batch: { id: meetingDetails.selectedBatches[0] },
        };

        try {
            const response = await axios.post(`${baseUrl}meetings`, payload);
            showSuccessToast('Meeting created successfully');

            setMeetingDetails({
                fromTime: '',
                toTime: '',
                meetingLink: '',
                message: '',
                selectedBatches: [],
                selectedCourse: '',
            });

            setPreviousMeetings((prevMeetings) => [
                response.data,
                ...prevMeetings,
            ]);
        } catch (error) {
            showErrorToast(`Error saving meeting: ${error}`);
        }
    }, [meetingDetails, trainerId]);

    // Memoized batch selection information
    const selectedBatch =
        meetingDetails.selectedBatches.length > 0
            ? batches.find((batch) => batch.id === meetingDetails.selectedBatches[0])
            : null;

    const selectedCourse = selectedBatch?.course;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Paper style={{ padding: '20px' }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontFamily: 'var(--font-p2)',
                        color: 'var(--color-p2)',
                    }}
                >
                    Create a Meeting
                </Typography>
                <Grid container spacing={2} direction="column"> {/* Changed direction to column */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel
                                sx={{
                                    textAlign: 'center',
                                    fontFamily: 'var(--font-p2)',
                                    color: 'var(--color-p2)',
                                }}
                            >
                                Choose Batch
                            </InputLabel>
                            <Select
                                sx={{
                                    textAlign: 'center',
                                    fontFamily: 'var(--font-p2)',
                                    color: 'var(--color-p2)',
                                }}
                                label="Choose Batch"
                                value={meetingDetails.selectedBatches[0] || ''}
                                onChange={handleBatchChange}
                                renderValue={(selected) => {
                                    const batch = batches.find((batch) => batch.id === selected);
                                    return batch ? batch.course.title : 'Select Batch';
                                }}
                            >
                                {batches.map((batch) => (
                                    <MenuItem
                                        sx={{
                                            fontFamily: 'var(--font-p2)',
                                            color: 'var(--color-p2)',
                                        }}
                                        key={batch.id}
                                        value={batch.id}
                                    >
                                        <Checkbox
                                            checked={meetingDetails.selectedBatches.includes(
                                                batch.id
                                            )}
                                        />
                                        <ListItemText
                                            sx={{
                                                fontFamily: 'var(--font-p2)',
                                                color: 'var(--color-p2)',
                                            }}
                                            primary={`Batch Id: ${batch.id} - ${batch.course.title}`}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        {selectedCourse && (
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    src={`data:image/jpeg;base64,${selectedCourse.image}`}
                                />
                                <Typography
                                    variant="body1"
                                    style={{ marginLeft: '10px' }}
                                    sx={{
                                        fontFamily: 'var(--font-p2)',
                                        color: 'var(--color-p2)',
                                    }}
                                >
                                    {selectedCourse.title}
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12} >
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
        </div>
    );
}

export default Meetings;
