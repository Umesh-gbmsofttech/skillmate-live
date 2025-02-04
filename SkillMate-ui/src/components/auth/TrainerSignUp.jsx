import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/authSlice';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import { TextField, Button, Checkbox, FormControl, InputLabel, Select, MenuItem, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

const TrainerSignUp = () => {
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [workingStatus, setWorkingStatus] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const username = useSelector((state) => state.auth.username);
    const [showPDF, setShowPDF] = useState(false);

    const dispatch = useDispatch();

    const handleTechnologiesChange = (e) => {
        const { value } = e.target;
        setTechnologies((prevTechnologies) => {
            if (prevTechnologies.includes(value)) {
                return prevTechnologies.filter((tech) => tech !== value);
            } else {
                return [...prevTechnologies, value];
            }
        });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError('File size must be less than 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setError('Please upload a valid PDF file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setResume(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fullName') setFullName(value);
        if (name === 'mobileNumber') setMobileNumber(value);
        if (name === 'email') setEmail(value);
        if (name === 'address') setAddress(value);
        if (name === 'qualification') setQualification(value);
        if (name === 'experience') setExperience(value);
        if (name === 'workingStatus') setWorkingStatus(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !mobileNumber || !email || !address || !qualification || !experience || !profilePic || !workingStatus || technologies.length === 0 || !resume) {
            setError('Please fill in all fields, upload a profile picture, and a resume.');
            showWarningToast('Please fill in all fields, upload a profile picture, and a resume.');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number.');
            showWarningToast('Please enter a valid 10-digit mobile number.');
            return;
        }

        setError(null);

        const trainerData = {
            fullName,
            mobileNumber,
            email,
            address,
            qualification,
            experience,
            workingStatus,
            technologies,
            profilePic,
            resume,
        };

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/trainers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trainerData),
            });

            if (response.ok) {
                const result = await response.json();
                showSuccessToast('Trainer data submitted successfully!');
                dispatch(setUserData(result.userData));
            }
        } catch (error) {
            setError('Network error. Please check your connection or try again later.');
            showErrorToast('Network error. Please check your connection or try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Box bgcolor="white" p={3} borderRadius={2} boxShadow={3} width="100%" maxWidth="600px">
                <form onSubmit={handleSubmit}>
                    {username && <Typography variant="h6" align="center">Welcome, {username}</Typography>}
                    {!username && <Typography variant="h4" align="center" gutterBottom>Trainer Sign Up</Typography>}

                    <Box textAlign="center" mb={2}>
                        {profilePic ? (
                            <Box component="img" src={`data:image/jpeg;base64,${profilePic}`} alt="Profile Preview" width={120} height={120} borderRadius="50%" />
                        ) : (
                            <Typography variant="body1" color="textSecondary">No Profile Picture</Typography>
                        )}
                    </Box>

                    <Box mb={2}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            style={{ display: 'none' }}
                            id="profilePicInput"
                        />
                        <label htmlFor="profilePicInput">
                            <Button variant="outlined" fullWidth component="span">
                                Upload Profile Picture
                            </Button>
                        </label>
                    </Box>

                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={fullName}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Mobile"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Address"
                        name="address"
                        value={address}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Qualification"
                        name="qualification"
                        value={qualification}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Experience (years)"
                        name="experience"
                        value={experience}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Current Work Status</InputLabel>
                        <Select
                            name="workingStatus"
                            value={workingStatus}
                            onChange={handleInputChange}
                            required
                        >
                            <MenuItem value="full-time">Full-time</MenuItem>
                            <MenuItem value="part-time">Part-time</MenuItem>
                            <MenuItem value="freelance">Freelance</MenuItem>
                            <MenuItem value="un-employed">Unemployed</MenuItem>
                        </Select>
                    </FormControl>

                    <Box mb={2}>
                        <Typography variant="body1" gutterBottom>Technologies:</Typography>
                        <Box display="flex" flexWrap="wrap">
                            {['Java', 'Spring Boot', 'JavaScript', 'React', 'Angular', 'React Native'].map((tech) => (
                                <Box key={tech} mr={2} mb={1}>
                                    <Checkbox
                                        value={tech}
                                        checked={technologies.includes(tech)}
                                        onChange={handleTechnologiesChange}
                                    />
                                    {tech}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box mb={2}>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                            style={{ display: 'none' }}
                            id="resumeInput"
                        />
                        <label htmlFor="resumeInput">
                            <Button variant="outlined" fullWidth component="span">
                                Upload Resume (PDF)
                            </Button>
                        </label>
                    </Box>
                    {resume && (
                        <Box mb={2} textAlign="center">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setShowPDF(true)}  // Show PDF in iframe when clicked
                            >
                                View Resume
                            </Button>
                        </Box>
                    )}

                    <Dialog open={showPDF} onClose={() => setShowPDF(false)} maxWidth="md" fullWidth>
                        <DialogTitle>Resume Preview</DialogTitle>
                        <DialogContent>
                            <iframe
                                src={`data:application/pdf;base64,${resume}`}
                                width="100%"
                                height="500px"
                                title="Resume"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowPDF(false)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Box mb={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Box>
                </form>
                <Link to="/login/mobile" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
                    Have an account? Please login
                </Link>
            </Box>
        </Box>
    );
};

export default TrainerSignUp;
