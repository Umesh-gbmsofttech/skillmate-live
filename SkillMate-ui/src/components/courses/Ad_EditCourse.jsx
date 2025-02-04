import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCourse } from '../redux/courseActions';
import axios from 'axios';
import { Box, Typography, TextField, Button, Select, MenuItem, CircularProgress, Checkbox, ListItemText } from '@mui/material';
import courseCoverImage from '../../assets/profilePic.jpg';

function AdEditCourse() {
    const [courseName, setCourseName] = useState('');
    const [days, setDays] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [courseCoverImage, setProfilePic] = useState(null);
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainerIds, setSelectedTrainerIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);  // New state for image preview
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const courseData = location.state?.course;

    useEffect(() => {
        if (courseData) {
            setCourseName(courseData.courseName);
            setDays(courseData.days);
            setTime(courseData.time);
            setPrice(courseData.price);
            setDescription(courseData.description);
            setProfilePic(courseData.coverImage || courseCoverImage);

            // Preselect trainers based on the course's current trainers
            const initialTrainerIds = courseData.trainer?.map(trainer => trainer.id) || [];
            setSelectedTrainerIds(initialTrainerIds);

            // Set preview image from existing course data
            setPreviewImage(courseData.coverImage ? `data:image/jpeg;base64,${courseData.coverImage}` : courseCoverImage);
        }
    }, [courseData]);

    useEffect(() => {
        if (!trainers || trainers.length === 0) {
            axios.get('http://localhost:8080/trainers/fetch')
                .then((response) => {
                    setTrainers(response.data);
                })
                .catch((err) => console.error('Error fetching trainers:', err));
        }
    }, [trainers]);

    const handleSubmitClick = async () => {
        // Convert the image to a Base64 string
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

        const updatedCourse = {
            ...courseData,
            courseName,
            days,
            time,
            price,
            description,
            coverImage: coverImageBase64,
            trainer: selectedTrainerIds.map(id => ({ id })),
        };

        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:8080/courses/update/${courseData.id}`,
                updatedCourse
            );

            if (response.status === 200) {
                dispatch(updateCourse(updatedCourse));
                navigate('/admin-profile/manage-courses');
            }
        } catch (error) {
            console.error('Error updating course:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);  // Store the selected file for conversion later
        setPreviewImage(URL.createObjectURL(file));  // Set preview image directly from the file
    };

    const handleTrainerChange = (event) => {
        setSelectedTrainerIds(event.target.value);
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
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Duration"
                    fullWidth
                    variant="outlined"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
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
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">Trainers:</Typography>
                    <Select
                        fullWidth
                        multiple
                        value={selectedTrainerIds}
                        onChange={handleTrainerChange}
                        renderValue={(selected) => {
                            const selectedTrainers = trainers.filter(trainer => selected.includes(trainer.id));
                            return selectedTrainers.map(trainer => trainer.fullName).join(', ');
                        }}
                        sx={{ padding: '10px', borderRadius: '5px', backgroundColor: '#f1f0f0' }}
                    >
                        {trainers.map((trainer) => (
                            <MenuItem key={trainer.id} value={trainer.id}>
                                <Checkbox checked={selectedTrainerIds.indexOf(trainer.id) > -1} />
                                <ListItemText primary={`${trainer.fullName} (id: ${trainer.id})`} />
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
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
