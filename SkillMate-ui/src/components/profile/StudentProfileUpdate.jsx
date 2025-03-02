import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import baseUrl from '../urls/baseUrl';
import { handleProfilePicChange, handleResumeChange } from '../utility/FileUploadHelper';

function StudentProfileUpdate() {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        address: '',
        qualification: '',
        workingStatus: '',
        image: '',
        resume: '',
    });
    const [loading, setLoading] = useState(true);
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [showResume, setShowResume] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`${baseUrl}students/${studentId}`);
                const student = response.data;
                setFormData({
                    name: student.name || '',
                    mobileNumber: student.mobileNumber || '',
                    email: student.email || '',
                    address: student.address || '',
                    qualification: student.qualification || '',
                    workingStatus: student.workingStatus || '',
                    resume: student.resume || '',
                    image: student.image || '',
                });
                setPreviewImage(student.image ? `data:image/png;base64,${student.image}` : 'default-avatar.png');
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
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.mobileNumber || !formData.email) {
            alert('Please fill in all required fields!');
            return;
        }
        try {
            await axios.put(`${baseUrl}students/${studentId}`, formData);
            alert('Student updated successfully!');
            navigate('/admin-profile/manage-students');
        } catch (error) {
            console.error('Error updating student data:', error.response || error.message);
            alert('An error occurred while updating the student.');
        }
    };

    if (loading) return <CircularProgress />;

    let validViewPdf = pdfFile || formData.resume;
    if (validViewPdf && !validViewPdf.startsWith('data:application/pdf;base64,')) {
        validViewPdf = `data:application/pdf;base64,${validViewPdf}`;
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f7f7f71b', borderRadius: 2, marginTop: 2, marginLeft: 2, marginRight: 2 }}>
            <Typography variant="h4" gutterBottom>Edit Student Information</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <img
                            src={previewImage}
                            alt="Student Profile"
                            style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }}
                        />
                        <Button variant="contained" component="label">
                            Upload Profile Picture
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => handleProfilePicChange(
                                    e,
                                    (img) => {
                                        setFormData((prev) => ({ ...prev, image: img }));
                                        setPreviewImage(`data:image/png;base64,${img}`);
                                    },
                                    setError
                                )}
                            />
                        </Button>
                    </Box>
                    <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth variant="outlined" margin="normal" />
                    <TextField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} fullWidth variant="outlined" margin="normal" />
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth variant="outlined" margin="normal" />
                    <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth variant="outlined" margin="normal" multiline rows={2} />
                    <TextField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} fullWidth variant="outlined" margin="normal" />
                    <TextField select label="Working Status" name="workingStatus" value={formData.workingStatus} onChange={handleChange} fullWidth variant="outlined" margin="normal">
                        <MenuItem value="full-time">Full-Time</MenuItem>
                        <MenuItem value="part-time">Part-Time</MenuItem>
                        <MenuItem value="unemployed">Unemployed</MenuItem>
                    </TextField>
                    <div>
                        {formData.resume || pdfFile ? (
                            <div className='mb-2'>
                                <Typography variant="h6">Existing Resume:</Typography>
                                <Button variant="outlined" color="secondary" onClick={() => setShowResume(!showResume)}>
                                    {showResume ? 'Hide Resume' : 'View Resume'}
                                </Button>
                                {showResume && <iframe src={validViewPdf} width="100%" height="600px" title="Resume Preview" />}
                            </div>
                        ) : <Typography variant="h6">No resume uploaded</Typography>}
                        <Button variant="contained" component="label">
                            Upload Resume
                            <input type="file" hidden accept="application/pdf" onChange={(e) => handleResumeChange(e, (resume) => setFormData(prev => ({ ...prev, resume })), setError)} />
                        </Button>
                    </div>
                    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                        <Button variant="contained" color="primary" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Student'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}
export default StudentProfileUpdate;
