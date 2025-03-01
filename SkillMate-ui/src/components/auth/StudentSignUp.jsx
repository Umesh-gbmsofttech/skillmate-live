import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Checkbox } from '@mui/material';
import { setUserData } from '../redux/authSlice';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl'


const StudentSignUp = () => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [resume, setResume] = useState(null);
    const [workingStatus, setWorkingStatus] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPDF, setShowPDF] = useState(false); // PDF view toggle
    const username = useSelector((state) => state.auth.username);

    const dispatch = useDispatch();
    let navigate = useNavigate();

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
            if (!file.type.includes('pdf')) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !mobileNumber || !email || !address || !qualification || !profilePic || !resume || !workingStatus) {
            setError('Please fill in all fields and upload a profile picture and resume.');
            showWarningToast('Please fill in all fields and upload a profile picture and resume.');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number.');
            showWarningToast('Please enter a valid 10-digit mobile number.');
            return;
        }

        const studentData = { name, mobileNumber, email, address, qualification, image: profilePic, resume, workingStatus };

        fetch(`${baseUrl}students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        showSuccessToast('Student data submitted successfully!');
                        throw new Error(text || 'An error occurred on the server.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    alert('Student data submitted successfully!');
                    // navigate("/login/mobile");
                }
            })
            .catch((error) => {
                setError(error.message || 'An error occurred while submitting the form.');
                showErrorToast(`${error.message}` || 'An error occurred while submitting the form.');
            });
        setLoading(false);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" padding='20px'>
            <Box bgcolor="#f7f7f7eb" p={3} borderRadius={2} boxShadow={3} width="100%" maxWidth="600px">
                <form onSubmit={handleSubmit}>
                    {username && <Typography variant="h6" align="center">Welcome, {username}</Typography>}
                    {!username && <Typography variant="h4" align="center" gutterBottom>Student Sign Up</Typography>}

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
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Mobile"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Qualification"
                        name="qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Current Work Status</InputLabel>
                        <Select
                            name="workingStatus"
                            value={workingStatus}
                            onChange={(e) => setWorkingStatus(e.target.value)}
                            required
                        >
                            <MenuItem value="full-time">Full-time</MenuItem>
                            <MenuItem value="part-time">Part-time</MenuItem>
                            <MenuItem value="freelance">Freelance</MenuItem>
                            <MenuItem value="un-employed">Unemployed</MenuItem>
                        </Select>
                    </FormControl>

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

export default StudentSignUp;
