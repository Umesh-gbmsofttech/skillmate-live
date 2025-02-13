import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Avatar, Dialog, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff, Edit } from '@mui/icons-material';
import axios from 'axios';
import Loading from '../../Loading';
import Meetings from '../trainer/Meetings';
import Attendances from '../trainer/Attendances';
import defaultProfilePic from '../../assets/skillmate.jpg';

function TrainerProfile() {
    const [showProfile, setShowProfile] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [batch, setBatch] = useState('');
    const [batches, setBatches] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const trainerId = userData?.id;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPDF, setShowPDF] = useState(false);



    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/batches/by-trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
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
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/courses/trainer/${trainerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        };

        if (trainerId && token) {
            fetchCourses();
        }
    }, [trainerId, token]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Box
                        sx={{
                            maxWidth: 1000,
                            mx: 'auto',
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: 3,
                            boxShadow: 4,
                            mt: 5,
                        }}
                    >
                        {/* Profile Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar
                                src={userData?.profilePic ? `data:image/jpeg;base64,${userData.profilePic}` : defaultProfilePic}
                                alt="Profile"
                                sx={{ width: 180, height: 220, objectFit: 'cover', objectPosition: 'top', borderRadius: '0', padding: '10px' }}

                            />
                            <Typography variant="h4" fontWeight="bold">
                                Welcome, {userData?.fullName || 'Trainer'}
                            </Typography>
                            <Box>
                                <IconButton onClick={() => setShowProfile(!showProfile)} color="primary">
                                    {showProfile ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                <IconButton onClick={() => navigate(`/trainer-profile-update/${userData.id}`)} color="secondary">
                                    <Edit />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Profile Details */}
                        {showProfile && (
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    bgcolor: 'grey.50',
                                    boxShadow: 2,
                                    border: '1px solid #e0e0e0',
                                }}
                            >
                                {[{ label: 'Full Name', value: userData?.fullName },
                                { label: 'Mobile Number', value: userData?.mobileNumber },
                                { label: 'Email', value: userData?.email },
                                { label: 'Address', value: userData?.address },
                                { label: 'Qualification', value: userData?.qualification },
                                { label: 'Technologies', value: userData?.technologies.join(', ') },
                                { label: 'Experience', value: userData?.experience },
                                { label: 'Working Status', value: userData?.workingStatus }].map((item, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                            {item.label}:
                                        </Typography>
                                        <Typography variant="body1">{item.value}</Typography>
                                    </Box>

                                ))}
                                {userData.resume && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3 }}
                                        onClick={() => setShowPDF(true)}
                                    >
                                        View Resume
                                    </Button>
                                )}
                                {/* PDF Dialog */}
                                <Dialog open={showPDF} onClose={() => setShowPDF(false)} maxWidth="md" fullWidth>
                                    {userData.resume ? (
                                        <Box sx={{ height: '600px' }}>
                                            <iframe
                                                src={`data:application/pdf;base64,${userData.resume}`}
                                                title="Resume PDF"
                                                style={{ width: '100%', height: '100%', border: 'none' }}
                                            />
                                        </Box>
                                    ) : (
                                        <Typography>No resume available.</Typography>
                                    )}
                                </Dialog>
                            </Box>
                        )}

                    </Box>
                </>
            )}
            {/* Courses & Batches */}

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Meetings userData={userData} courses={courses} trainerId={trainerId} />
            </div>

            {/* Batch Selection */}
            <FormControl
                sx={{
                    maxWidth: 1000,
                    mx: 'auto',
                    boxShadow: 2,
                    mt: 5,
                    display: 'flex',
                    alignSelf: 'center',
                    justifySelf: 'center',
                }}
            >
                <InputLabel style={{ color: 'white' }}>Select Batch</InputLabel>
                <Select
                    value={batch} onChange={(e) => setBatch(e.target.value)} label="Select Batch">
                    <MenuItem value="">-- Select Batch --</MenuItem>
                    {batches.map((batchItem) => (
                        <MenuItem key={batchItem.id} value={batchItem.id}>
                            Batch {batchItem.id}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <Attendances batch={batch} />
        </>
    );
}

export default TrainerProfile;
