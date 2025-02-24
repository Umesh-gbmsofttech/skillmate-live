import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, CircularProgress, Grid, Container, Paper } from '@mui/material';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import { CloudUpload } from '@mui/icons-material';
import { addCourse } from '../redux/coursesSlice'; // Import Redux action

function AddCourseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.courses); // Select Redux state

  const [title, setTitle] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showErrorToast('Please upload a valid image file.');
        setImage(null);
        setPreviewImage(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showErrorToast('File size must be less than 2MB.');
        setImage(null);
        setPreviewImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !days || !price || !description || !image || !startDate || !endDate) {
      showWarningToast('Please fill in all fields and upload an image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      const newCourse = {
        title,
        days,
        price,
        description,
        startDate,
        endDate,
        image: base64Image,
      };

      dispatch(addCourse(newCourse))
        .unwrap()
        .then(() => {
          showSuccessToast('Course added successfully!');
          navigate('/courses'); // Redirect after success
        })
        .catch((err) => {
          showErrorToast(err || 'Failed to add course.');
        });
    };

    reader.readAsDataURL(image);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3 }}>
          Add New Course
        </Typography>
        {error && <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>{error}</Typography>}
        {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {previewImage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                  <img src={previewImage} alt="Preview" style={{ width: 350, borderRadius: 10 }} />
                </Box>
              )}
              <Button variant="outlined" component="label" fullWidth>
                <CloudUpload sx={{ marginRight: 1 }} />
                Choose Cover Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
            </Grid>

            <Grid item xs={12}><TextField label="Course Name" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required /></Grid>
            <Grid item xs={12}><TextField label="Duration (in days)" type="number" fullWidth value={days} onChange={(e) => setDays(e.target.value)} required /></Grid>
            <Grid item xs={12}><TextField label="Price" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} required /></Grid>
            <Grid item xs={12}><TextField type="date" fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)} required /></Grid>
            <Grid item xs={12}><TextField type="date" fullWidth value={endDate} onChange={(e) => setEndDate(e.target.value)} required /></Grid>
            <Grid item xs={12}><TextField label="Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required /></Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Add Course'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddCourseForm;
