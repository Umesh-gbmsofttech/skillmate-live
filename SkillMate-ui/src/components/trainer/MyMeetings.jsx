import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrainerMeetings } from '../redux/meetingsSlice';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import CustomButton from '../utility/CustomButton';
import { styled } from '@mui/material/styles';

const MyMeetings = ({ trainerId, courses }) => {
    const dispatch = useDispatch();
    const { meetings, loading } = useSelector((state) => state.meetings);

    useEffect(() => {
        if (trainerId && Array.isArray(courses) && courses.length > 0) {
            const courseIds = courses.map(courseObj => courseObj.course?.id).filter(id => id);
            dispatch(fetchTrainerMeetings({ trainerId, courses: courseIds }));
        }
    }, [trainerId, courses, dispatch]);

    const MeetingCard = styled(Card)(({ theme }) => ({
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[5],
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.03)', boxShadow: theme.shadows[10] },
    }));

    return (
        <Box sx={{ padding: 3, minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                My Meetings
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress size={60} thickness={5} />
                </Box>
            ) : meetings.length > 0 ? (
                <Grid container spacing={3}>
                    {meetings.map(meeting => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={meeting.id}>
                            <MeetingCard>
                                <CardMedia
                                    component="img"
                                    image={`data:image/jpeg;base64,${meeting.course?.image || ''}`}
                                    alt={meeting.course?.title || 'Course'}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {meeting.course?.title || 'Unknown Course'}
                                    </Typography>
                                    <Typography><GroupsIcon /> Batch ID: {meeting.batch?.id || 'N/A'}</Typography>
                                    <Typography><AccessTimeIcon /> Start Time: {meeting.startTime || 'N/A'}</Typography>
                                    <Typography><AccessTimeIcon /> End Time: {meeting.endTime || 'N/A'}</Typography>
                                    {meeting.meetingLink && (
                                        <CustomButton text={'Go Live'} onClick={() => window.open(meeting.meetingLink, '_blank')} width={'100%'} />
                                    )}
                                </CardContent>
                            </MeetingCard>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={{ textAlign: 'center', mt: 4, fontSize: '1.2rem' }}>
                    No meetings scheduled.
                </Typography>
            )}
        </Box>
    );
};

export default MyMeetings;
