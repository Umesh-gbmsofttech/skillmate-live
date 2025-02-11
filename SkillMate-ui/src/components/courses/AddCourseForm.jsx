import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions'; // Import the action
import { Box, Typography, TextField, Button, CircularProgress, Input, Grid, Container, Paper, IconButton } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import { CloudUpload } from '@mui/icons-material';

function AddCourseForm() {
  const [courseName, setCourseName] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);  // State for image preview
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare course data
    const courseData = new FormData();
    courseData.append('courseName', courseName);
    courseData.append('days', days);
    courseData.append('price', price);
    courseData.append('description', description);
    if (coverImage) {
      courseData.append('coverImage', coverImage);
    }

    try {
      const response = await axios.post('http://localhost:8080/courses/create', courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setCourses(response.data)); // Update Redux store
      navigate('/admin-profile/manage-courses'); // Redirect to courses page
      showSuccessToast('Course added successfully!');
    } catch (error) {
      showErrorToast('Error uploading the course!');
      setError('Failed to add the course. Please try again.');
    }
  };

  // Handle image preview on file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3 }}>
          Add New Course
        </Typography>
        {error && (
          <Typography color="error" variant="body2" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Image Preview */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
              {previewImage ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={previewImage}
                    alt="Course Cover"
                    style={{
                      width: '100%',
                      maxWidth: 350,
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: 10,
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                    No image selected
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Cover Image Input */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderColor: '#3f51b5',
                  color: '#3f51b5',
                  '&:hover': { borderColor: '#303f9f', color: '#303f9f' },
                  padding: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CloudUpload sx={{ marginRight: 1 }} />
                Choose Cover Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>

            {/* Course Name Input */}
            <Grid item xs={12}>
              <TextField
                label="Course Name"
                variant="outlined"
                fullWidth
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderColor: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    borderColor: '#3f51b5',
                  },
                }}
              />
            </Grid>

            {/* Duration Input */}
            <Grid item xs={12}>
              <TextField
                label="Duration (in days)"
                type="number"
                variant="outlined"
                fullWidth
                value={days}
                onChange={(e) => setDays(e.target.value)}
                required
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderColor: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    borderColor: '#3f51b5',
                  },
                }}
              />
            </Grid>

            {/* Price Input */}
            <Grid item xs={12}>
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderColor: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    borderColor: '#3f51b5',
                  },
                }}
              />
            </Grid>

            {/* Description Input */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderColor: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    borderColor: '#3f51b5',
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{
                  padding: '12px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  backgroundColor: '#3f51b5',
                  '&:hover': { backgroundColor: '#303f9f' },
                }}
              >
                Add Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddCourseForm;
