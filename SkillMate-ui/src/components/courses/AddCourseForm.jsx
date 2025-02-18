import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Grid, Container, Paper } from '@mui/material';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import { CloudUpload } from '@mui/icons-material';
import baseUrl from '../urls/baseUrl'


function AddCourseForm() {
  const [title, setTitle] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setImage(null);
        setPreviewImage(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('File size must be less than 2MB.');
        setImage(null);
        setPreviewImage(null);
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // To show the preview of the image
      };
      reader.readAsDataURL(file);
      setImage(file); // Store the file itself for the form submission
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all fields are filled
    if (!title || !days || !price || !description || !image) {
      setError('Please fill in all fields and upload an image.');
      showWarningToast('Please fill in all fields and upload an image.');
      setLoading(false);
      return;
    }

    // Convert the image to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; // Extract base64 string from the URL format

      const courseData = {
        title,
        days,
        price,
        description,
        image: base64Image, // Store base64 string of the image
      };

      try {
        const response = await fetch(`${baseUrl}courses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData), // Send JSON data including base64 image
        });

        if (!response.ok) {
          const text = await response.text();
          showErrorToast(text || 'An error occurred on the server.');
          throw new Error(text || 'An error occurred on the server.');
        }

        const data = await response.json();
        if (data) {
          showSuccessToast('Course data submitted successfully!');
          navigate('/login/mobile'); // Corrected navigation path
        }
      } catch (error) {
        setError(error.message || 'An error occurred while submitting the form.');
        showErrorToast(`${error.message}` || 'An error occurred while submitting the form.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image); // Start reading the image as base64
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{
                  '& .MuiInputLabel-root': { color: '#3f51b5' },
                  '& .MuiOutlinedInput-root': { borderColor: '#3f51b5' },
                  '& .MuiOutlinedInput-root.Mui-focused': { borderColor: '#3f51b5' },
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
                  '& .MuiInputLabel-root': { color: '#3f51b5' },
                  '& .MuiOutlinedInput-root': { borderColor: '#3f51b5' },
                  '& .MuiOutlinedInput-root.Mui-focused': { borderColor: '#3f51b5' },
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
                  '& .MuiInputLabel-root': { color: '#3f51b5' },
                  '& .MuiOutlinedInput-root': { borderColor: '#3f51b5' },
                  '& .MuiOutlinedInput-root.Mui-focused': { borderColor: '#3f51b5' },
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
                  '& .MuiInputLabel-root': { color: '#3f51b5' },
                  '& .MuiOutlinedInput-root': { borderColor: '#3f51b5' },
                  '& .MuiOutlinedInput-root.Mui-focused': { borderColor: '#3f51b5' },
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
