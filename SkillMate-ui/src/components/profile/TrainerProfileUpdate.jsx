import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function TrainerProfileUpdate() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        address: '',
        qualification: '',
        workingStatus: '',
        resume: '', // To store base64 PDF data or URL
        technologies: [],
        profilePic: '', // To store base64 image data
    });
    const [loading, setLoading] = useState(true);
    const { trainerId } = useParams();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(''); // To show the selected image preview
    const [pdfFile, setPdfFile] = useState(null);
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        const fetchTrainerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/trainers/fetch/${trainerId}`);
                const trainer = response.data;
                setFormData({
                    fullName: trainer.fullName || '',
                    mobileNumber: trainer.mobileNumber || '',
                    email: trainer.email || '',
                    address: trainer.address || '',
                    qualification: trainer.qualification || '',
                    experience: trainer.experience || '',
                    workingStatus: trainer.workingStatus || '',
                    technologies: trainer.technologies || [],
                    profilePic: trainer.profilePic || '',
                    resume: trainer.resume || '',
                });

                // Show profile picture preview (existing one)
                setPreviewImage(trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : 'default-avatar.png');

                // If there is a resume, set it for display
                if (trainer.resume) {
                    setPdfFile(trainer.resume); // Storing the base64 resume
                }

                setLoading(false);
            } catch (error) {
                // console.error('Error fetching trainer data:', error);
                showErrorToast('Error fetching trainer data!');
                setLoading(false);
            }
        };

        if (trainerId) {
            fetchTrainerData();
        } else {
            navigate('/admin-dashboard');
        }
    }, [trainerId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTechnologiesChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            technologies: checked
                ? [...prevData.technologies, value]
                : prevData.technologies.filter((tech) => tech !== value)
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file).then((base64Image) => {
                setFormData((prevData) => ({
                    ...prevData,
                    profilePic: base64Image // Update profilePic in formData
                }));
                setPreviewImage(base64Image); // Update preview image immediately
            });
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    resume: reader.result // Store base64 encoded resume
                }));
                setPdfFile(reader.result); // Preview the resume as base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/trainers/update/${trainerId}`, formData);
            console.log(response);
            if (response.status == 200 && response.ok) {
                showSuccessToast('Trainer updated successfully!');
                // navigate('/admin-dashboard/manage-trainers');
            } else {
                showErrorToast('Trainer not updated!');
            }
        } catch (error) {
            // console.error('Error updating trainer data:', error);
            showErrorToast('An error occurred while updating the trainer.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    let validViewPdf = pdfFile;
    if (validViewPdf && !validViewPdf.startsWith('data:application/pdf;base64,')) {
        validViewPdf = `data:application/pdf;base64,${validViewPdf}`; // Add the base64 prefix if it's missing
    }
    return (
        <Box sx={{ padding: 4, backgroundColor: '#f7f7f71b', borderRadius: 2, marginTop: 2, marginLeft: 2, marginRight: 2 }}>
            <Typography variant="h4" gutterBottom>Edit Trainer Information</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Profile Picture Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <img
                            src={previewImage}
                            alt="Trainer Profile"
                            style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }}
                        />
                        <Button variant="contained" component="label">
                            Upload Profile Picture
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                    </Box>

                    {/* Form Fields */}
                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Mobile Number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={2}
                    />
                    <TextField
                        label="Qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Experince"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        type='number'
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Working Status"
                        name="workingStatus"
                        value={formData.workingStatus}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        <MenuItem value="full-time">Full-Time</MenuItem>
                        <MenuItem value="part-time">Part-Time</MenuItem>
                        <MenuItem value="unemployed">Unemployed</MenuItem>
                    </TextField>

                    {/* Technologies Section */}
                    <div className="selected-technologies">
                        <h5>Selected Technologies:</h5>
                        <div className="technologies-display">
                            {formData.technologies.map((tech, index) => (
                                <span key={index} className="technology-tag">
                                    <Button
                                        variant="outlined"
                                        color="info"
                                        sx={{ padding: '4px 25px' }}
                                        onClick={() => setShowResume(!showResume)}>
                                        {tech}
                                    </Button>,
                                </span>
                            ))}
                        </div>
                    </div>
                    <div >
                        {['Java', 'Spring Boot', 'JavaScript', 'React', 'Angular', 'React Native'].map((tech) => (
                            <FormControlLabel
                                key={tech}
                                control={
                                    <Checkbox
                                        value={tech}
                                        checked={formData.technologies.includes(tech)}
                                        onChange={handleTechnologiesChange}
                                    />
                                }
                                label={tech}
                            />
                        ))}
                    </div>

                    {/* Resume Section */}
                    <div>
                        {pdfFile ? (
                            <div className='mb-2'>
                                <Typography variant="h6">Existing Resume:</Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ padding: '4px 25px' }}
                                    onClick={() => setShowResume(!showResume)}>
                                    {showResume ? 'Hide Resume' : 'View Resume'}
                                </Button>

                                {showResume && (
                                    <iframe
                                        src={validViewPdf}
                                        width="100%"
                                        height="600px"
                                        title="Resume Preview"
                                    />
                                )}
                            </div>
                        ) : (
                            <Typography variant="h6">No resume uploaded</Typography>
                        )}
                        <Button variant="contained" component="label">
                            Upload Resume
                            <input type="file" hidden accept="application/pdf" onChange={handleResumeChange} />
                        </Button>
                    </div>


                    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ padding: '12px 30px' }}
                            disabled={loading} // Disable when loading
                        >
                            {loading ? 'Updating...' : 'Update Trainer'}
                        </Button>

                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default TrainerProfileUpdate;
