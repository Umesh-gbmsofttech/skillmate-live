import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Avatar, Dialog, Button, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Edit } from '@mui/icons-material';
import MyCourses from '../courses/MyCourses';
import defaultProfilePic from '../../assets/skillmate.jpg';

function StudentProfile() {
    const [showProfile, setShowProfile] = useState(false);
    const [showPDF, setShowPDF] = useState(false);

    const userData = useSelector((state) => state.auth.userData);
    const location = useLocation();
    const navigate = useNavigate();

    const { username } = location.state || { username: 'Admin' };

    const user = {
        name: userData?.name || 'John Doe',
        email: userData?.email || 'johndoe@example.com',
        mobile: userData?.mobileNumber || '+1 123-456-7890',
        address: userData?.address || '123 Main St, City, State, Zip',
        qualification: userData?.qualification || 'Bachelor of Science, Computer Science',
        workStatus: userData?.workingStatus || 'Full-Time',
        technologies: userData?.technologies || ['JavaScript', 'React', 'Node.js'],
        image: userData?.image
            ? `data:image/jpeg;base64,${userData.image}`
            : defaultProfilePic,
        resume: userData?.resume,
    };

    const handleUpdateAccountClick = () => {
        navigate(`/student-profile-update/${userData.id}`);
    };

    return (
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
                        src={user.image}
                        alt={user.name}
                        sx={{ width: 180, height: 220, objectFit: 'cover', objectPosition: 'top', borderRadius: '0', padding: '10px' }}
                    />
                    <Typography variant="h4" fontWeight="bold">
                        Welcome, {userData?.roles[0] !== 'STUDENT' ? username : user.name}
                    </Typography>
                    <Box>
                        <IconButton onClick={() => setShowProfile(!showProfile)} color="primary">
                            {showProfile ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <IconButton onClick={handleUpdateAccountClick} color="secondary">
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
                        {[
                            { label: 'Name', value: user.name },
                            { label: 'Phone', value: user.mobile },
                            { label: 'Email', value: user.email },
                            { label: 'Address', value: user.address },
                            { label: 'Education', value: user.qualification },
                            { label: 'Work Status', value: user.workStatus },
                        ].map((item, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {item.label}:
                                </Typography>
                                <Typography variant="body1">{item.value}</Typography>
                                {index < 5 && <Divider sx={{ mt: 1, mb: 1 }} />}
                            </Box>
                        ))}

                        {/* View Resume Button */}
                        {user.resume && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                onClick={() => setShowPDF(true)}
                            >
                                View Resume
                            </Button>
                        )}
                    </Box>
                )}

                {/* PDF Dialog */}
                <Dialog open={showPDF} onClose={() => setShowPDF(false)} maxWidth="md" fullWidth>
                    {user.resume ? (
                        <Box sx={{ height: '600px' }}>
                            <iframe
                                src={`data:application/pdf;base64,${user.resume}`}
                                title="Resume PDF"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            />
                        </Box>
                    ) : (
                        <Typography>No resume available.</Typography>
                    )}
                </Dialog>
            </Box>

            <MyCourses />
        </>
    );
}

export default StudentProfile;
