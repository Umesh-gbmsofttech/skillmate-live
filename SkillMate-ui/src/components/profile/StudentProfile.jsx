import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Avatar, Dialog, Button, Divider, Card, DialogTitle } from '@mui/material';
import { Visibility, VisibilityOff, Edit, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import MyCourses from '../courses/MyCourses';
import defaultProfilePic from '../../assets/skillmate.jpg';
import CustomButton from '../utility/CustomButton';

const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
        image: userData?.image ? `data:image/jpeg;base64,${userData.image}` : defaultProfilePic,
        resume: userData?.resume,
    };

    const handleUpdateAccountClick = () => {
        navigate(`/student-profile-update/${userData.id}`);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>
                <Card
                    component={motion.div}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    sx={{ width: 400, textAlign: 'center', p: 4, borderRadius: 4, boxShadow: 6 }}
                >
                    <Avatar
                        src={user.image}
                        alt={user.name}
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                            boxShadow: 4,
                            m: '0 auto',
                            transition: '0.3s',
                            '&:hover': { transform: 'scale(1.1)' },
                        }}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <Typography variant="h5" fontWeight="bold" mt={2}>
                        {userData?.roles[0] !== 'STUDENT' ? username : user.name}
                        <IconButton onClick={handleUpdateAccountClick} color="secondary" sx={{
                            '&:focus': {
                                outline: 'none',
                                border: 'none',
                            },
                        }}>
                            <Edit />
                        </IconButton>
                    </Typography>
                    <Typography variant="subtitle2">{user.email}</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        {[{ label: "Courses", value: 0 }, { label: "Batches", value: 0 }, { label: "Meetings", value: 0 }].map((item, index) => (
                            <Box key={index} sx={{ textAlign: "center", mx: 1 }}>
                                <Typography variant="h6">{item.value}</Typography>
                                <CustomButton text={`${item.label}`} onClick={() => setOpenDialog(item.label.toLowerCase())} />
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Box>

            {showProfile && (
                <Dialog open={showProfile} onClose={() => setShowProfile(false)} maxWidth="sm" fullWidth>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" textAlign="center">My Details</Typography>
                        <IconButton onClick={() => setShowProfile(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <Close />
                        </IconButton>
                        {[
                            { label: 'Phone', value: user.mobile },
                            { label: 'Address', value: user.address },
                            { label: 'Education', value: user.qualification },
                            { label: 'Work Status', value: user.workStatus },
                        ].map(({ label, value }, index) => (
                            <Box key={index} sx={{ boxShadow: 2, borderRadius: 1, p: 1, mb: 1, ":hover": { boxShadow: 5 }, fontFamily: "var(--font-p1)", }}>
                                <Typography variant="body1" fontWeight="bold">{label}:</Typography>
                                <Typography variant="body2">{value}</Typography>
                            </Box>
                        ))}
                        {user.resume && (
                            <Button variant="outlined" sx={{ mt: 3 }} onClick={() => setShowPDF(true)}>
                                View Resume
                            </Button>
                        )}
                    </Box>
                </Dialog>
            )}

            <Dialog open={showPDF} onClose={() => setShowPDF(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" textAlign="center">My Resume</Typography>
                    <IconButton onClick={() => setShowPDF(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <Box sx={{ p: 2 }}>
                    {user.resume ? (
                        <iframe
                            src={`data:application/pdf;base64,${user.resume}`}
                            width="100%"
                            height="600px"
                            title="Resume"
                        />
                    ) : (
                        <Typography>No resume uploaded.</Typography>
                    )}
                </Box>
            </Dialog>

            <MyCourses />
        </>
    );
}

export default StudentProfile;
