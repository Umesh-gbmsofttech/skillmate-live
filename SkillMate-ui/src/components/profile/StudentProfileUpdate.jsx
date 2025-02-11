import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';

function StudentProfileUpdate() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        address: '',
        qualification: '',
        workingStatus: '',
        attendanceByDays: '',
        attendanceAverage: '',
        remarkByTrainer: '',
        profilePic: '', // To store base64 image data
        resume: '', // To store base64 PDF data or URL
    });
    const [loading, setLoading] = useState(true);
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(''); // To show the selected image preview
    const [pdfFile, setPdfFile] = useState(null);
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/students/fetch/${studentId}`);
                const student = response.data;
                console.log(pdfFile);
                setFormData({
                    fullName: student.fullName || '',
                    mobileNumber: student.mobileNumber || '',
                    email: student.email || '',
                    address: student.address || '',
                    qualification: student.qualification || '',
                    workingStatus: student.workingStatus || '',
                    resume: student.resume || '',
                    profilePic: student.profilePic || '',
                });

                // Show profile picture preview (existing one)
                setPreviewImage(student.profilePic ? `data:image/png;base64,${student.profilePic}` : 'default-avatar.png');

                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setLoading(false);
            }
        };

        if (studentId) {
            fetchStudentData();
        } else {
            navigate('/admin-dashboard');
        }
    }, [studentId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
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
            convertToBase64(file).then((base64File) => {
                setPdfFile(base64File); // Update the state with the base64 resume
            });
        }
    };
    // const handleResumeChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 resume: reader.result // Store base64 encoded resume
    //             }));
    //             setPdfFile(reader.result); // Preview the resume as base64
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation checks
        if (!formData.fullName || !formData.mobileNumber || !formData.email) {
            alert('Please fill in all required fields!');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/students/update/${studentId}`, formData);
            alert('Student updated successfully!');
            navigate('/admin-profile/manage-students');
        } catch (error) {
            console.error('Error updating student data:', error.response || error.message);
            alert('An error occurred while updating the student.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    let validViewPdf = pdfFile || formData.resume;
    if (validViewPdf && !validViewPdf.startsWith('data:application/pdf;base64,')) {
        validViewPdf = `data:application/pdf;base64,${validViewPdf}`; // Add the base64 prefix if it's missing
    }


    return (
        <Box sx={{ padding: 4, backgroundColor: '#f7f7f71b', borderRadius: 2, marginTop: 2, marginLeft: 2, marginRight: 2 }}>
            <Typography variant="h4" gutterBottom>Edit Student Information</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Profile Picture Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <img
                            src={previewImage}
                            alt="Student Profile"
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

                    {/* Resume Section */}
                    <div>
                        {formData.resume || pdfFile ? (
                            <div className='mb-2'>
                                <Typography variant="h6">Existing Resume:</Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ padding: '4px 25px' }}
                                    onClick={() => setShowResume(!showResume)}
                                >
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
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Student'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default StudentProfileUpdate;
