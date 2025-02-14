import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCourse } from '../redux/courseActions';
import axios from 'axios';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import { CloudUpload } from '@mui/icons-material';

function AdEditCourse() {
    const [title, setTitle] = useState('');
    const [days, setDays] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [courseCoverImage, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);  // New state for image preview
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const courseData = location.state?.course;

    useEffect(() => {
        if (courseData) {
            setTitle(courseData.title);
            setDays(courseData.days);
            setTime(courseData.time);
            setPrice(courseData.price);
            setDescription(courseData.description);
            setProfilePic(courseData.image || courseCoverImage);
            // Set preview image from existing course data
            setPreviewImage(courseData.image ? `data:image/jpeg;base64,${courseData.image}` : courseCoverImage);
        }
    }, [courseData]);

    const handleSubmitClick = async () => {
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        let coverImageBase64 = previewImage; // Use the preview image (either existing or newly selected)
        if (courseCoverImage && typeof courseCoverImage !== 'string') {
            coverImageBase64 = await convertToBase64(courseCoverImage); // Convert to base64 if it's a new file
        }

        // Remove the prefix if it exists (e.g., "data:image/jpeg;base64,") when data is submitting
        if (coverImageBase64 && coverImageBase64.startsWith('data:image')) {
            coverImageBase64 = coverImageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
        }

        const updatedCourse = {
            ...courseData,
            title,
            days,
            time,
            price,
            description,
            image: coverImageBase64, // Send only the base64 string without prefix
        };

        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:8080/courses/update/${courseData.id}`,
                updatedCourse
            );

            if (response.status === 200) {
                showSuccessToast('Course updated successfully'); // Debugging log
                dispatch(updateCourse(updatedCourse));
                navigate('/admin-profile/manage-courses');
            }
        } catch (e) {
            // console.error('Error updating course:', error.message);
            showErrorToast('Error updating course!', e);
        } finally {
            setLoading(false);
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);  // Store the selected file for conversion later
        setPreviewImage(URL.createObjectURL(file));  // Set preview image directly from the file
    };

    if (!courseData) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h4" gutterBottom>Edit Course</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src={previewImage}  // Use preview image state for displaying the image
                        alt="Course Cover"
                        style={{
                            width: 300,
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: '#e5e5e7',
                            color: '#000',
                            '&:hover': { backgroundColor: '#0056b3' },
                            borderRadius: '5px',
                            padding: '10px 20px',
                        }}
                    >
                        <CloudUpload sx={{ marginRight: 1 }} />
                        Choose Cover Image
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>
            </Box>

            <Box sx={{ backgroundColor: '#fff', padding: 4, borderRadius: 2, boxShadow: 3 }}>
                <TextField
                    label="Course Name"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type='number'
                    label="Duration"
                    fullWidth
                    variant="outlined"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type='number'
                    label="Price"
                    fullWidth
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Description"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
            </Box>

            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitClick}
                    disabled={loading}
                    sx={{
                        padding: '12px 30px',
                        fontSize: '16px',
                        '&:hover': { backgroundColor: '#0056b3' },
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Course'}
                </Button>
            </Box>
        </Box>
    );
}

export default AdEditCourse;
