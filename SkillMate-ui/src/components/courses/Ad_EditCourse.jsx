import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import { CloudUpload } from '@mui/icons-material';
import baseUrl from '../urls/baseUrl';
import { updateCourse } from '../redux/coursesSlice';

function AdEditCourse() {
    const [title, setTitle] = useState('');
    const [days, setDays] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [courseCoverImage, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const courseData = location.state?.course;

    console.log(courseData)

    useEffect(() => {
        if (courseData) {
            setTitle(courseData.title || '');
            setDays(courseData.days || '');
            setPrice(courseData.price || '');
            setDescription(courseData.description || '');
            setStartDate(courseData.startDate || '');
            setEndDate(courseData.endDate || '');
            if (courseData.image) {
                setProfilePic(courseData.image);
                setPreviewImage(`data:image/jpeg;base64,${courseData.image}`);
            }
        }
    }, [courseData]);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Remove the "data:image/*;base64," prefix
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };



    const handleSubmitClick = async () => {
        if (!courseData?.id) {
            showErrorToast("Invalid course data. Please try again.");
            return;
        }

        const courseId = Number(courseData.id); // Ensure ID is a number
        if (isNaN(courseId)) {
            showErrorToast("Invalid course ID. Please try again.");
            return;
        }

        let coverImageBase64 = null; // Only send new image if changed

        if (courseCoverImage && courseCoverImage instanceof File) {
            coverImageBase64 = await convertToBase64(courseCoverImage);
            console.log("Converted Image:", coverImageBase64);
        }
        console.log(courseData.id)
        const updatedCourse = {
            ...courseData,
            id: courseId,
            title,
            days,
            price,
            description,
            startDate,
            endDate,
            ...(coverImageBase64 ? { image: coverImageBase64 } : {}), // Only include if changed
        };

        try {
            const response = await axios.put(
                `${baseUrl}courses/${courseId}`,
                updatedCourse
            );
            console.log(response)
            if (response.status === 200) {
                showSuccessToast('Course updated successfully');
                dispatch(updateCourse(updatedCourse));
                navigate('/admin-profile/manage-courses');
            }
        } catch (e) {
            showErrorToast(`Error updating course! ${e.response?.data?.message || e.message}`);
        } finally {
            setLoading(false);
        }
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    if (!courseData) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
    }

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', padding: 2 }}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h4" gutterBottom>Edit Course</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <img
                        src={previewImage}
                        alt="Course Cover"
                        style={{ width: '100%', maxWidth: 400, height: 'auto', borderRadius: 10, marginBottom: 20 }}
                    />
                    <Button variant="contained" component="label">
                        <CloudUpload sx={{ marginRight: 1 }} />
                        Choose Cover Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                </Box>

                <Box sx={{ p: 3, bgcolor: '#f5f5f5', boxShadow: 3, borderRadius: 2 }}>
                    <TextField label="Course Name" fullWidth variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
                    <TextField type='number' label="Duration" fullWidth variant="outlined" value={days} onChange={(e) => setDays(e.target.value)} sx={{ mb: 2 }} />
                    <TextField type='number' label="Price" fullWidth variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Description" fullWidth variant="outlined" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />
                    <TextField type="date" label="Start Date" fullWidth variant="outlined" value={startDate} onChange={(e) => setStartDate(e.target.value)} sx={{ mb: 2 }} />
                    <TextField type="date" label="End Date" fullWidth variant="outlined" value={endDate} onChange={(e) => setEndDate(e.target.value)} sx={{ mb: 2 }} />
                </Box>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmitClick} disabled={loading} sx={{ padding: '12px 30px', fontSize: '16px' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Course'}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default AdEditCourse;
