import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Button, Typography, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import defaultProfileImage from '../../assets/profilePic.jpg';
import baseUrl from '../urls/baseUrl';

function UpdateBatch() {
  const { batchId } = useParams(); // Get the batchId from the route params
  const [batch, setBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newBatch, setNewBatch] = useState({
    trainerIds: [],
    courseIds: [],
    studentIds: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBatchUrl = `${baseUrl}batches/${batchId}`;
  const getTrainersUrl = `${baseUrl}trainers`;
  const getCoursesUrl = `${baseUrl}courses`;
  const getStudentsUrl = `${baseUrl}students`;
  const updateBatchUrl = `${baseUrl}batches/${batchId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [batchResponse, studentResponse, trainerResponse, courseResponse] = await Promise.all([
          axios.get(fetchBatchUrl),
          axios.get(getStudentsUrl),
          axios.get(getTrainersUrl),
          axios.get(getCoursesUrl),
        ]);

        console.log(batchResponse.data);
        setBatch(batchResponse.data);
        setStudents(studentResponse.data);
        setTrainers(trainerResponse.data);
        setCourses(courseResponse.data);

        // Set the current batch details into the form
        const currentBatch = batchResponse.data;

        // Setting the current selections in the newBatch state
        setNewBatch({
          trainerIds: currentBatch.trainer ? [currentBatch.trainer.id] : [],
          courseIds: currentBatch.course ? [currentBatch.course.id] : [],
          studentIds: currentBatch.students.map((student) => student.id),
        });

        setLoading(false);
      } catch (error) {
        showErrorToast(`Failed to fetch data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [batchId]);

  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setNewBatch((prevData) => ({
      ...prevData,
      [name]: Array.isArray(value) ? value : [value], // Ensure the value is an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update batch data structure to match backend requirements
    const updatedBatchData = {
      trainer: newBatch.trainerIds.map(id => ({ id })),
      students: newBatch.studentIds.map(id => ({ id })),
      course: newBatch.courseIds.map(id => ({ id })),
    };

    try {
      const response = await axios.put(updateBatchUrl, updatedBatchData);
      console.log('Batch updated successfully!', response);
      showSuccessToast('Batch updated successfully!');
      navigate('/admin-profile');
    } catch (error) {
      showErrorToast('Failed to update the batch. Please try again.');
      console.error(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      ) : (
        <>
          {batch && (
            <Grid container spacing={2}>
              {/* Display The Current Batch Information */}
              <Grid
                item
                spacing={2}
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }} // Ensures that the grid takes the full height of the viewport
              >
                {/* The Grid for the Card (Batch Info) */}
                <Grid
                  item
                  xs={12}  // Full width on mobile
                  sm={5}   // 5/12 on small screens
                  md={4}   // 4/12 on medium screens and up
                  lg={5}   // 3/12 on large screens and up
                  alignItems="center"
                  justifyContent="center"
                  style={{ marginBottom: '20px' }}  // Space between card and form
                >
                  <Card sx={{ bgcolor: '#f7f7f71b' }}>
                    <CardMedia
                      component="img"
                      alt="Course Image"
                      height="260"
                      image={`data:image/jpeg;base64,${batch.course?.image || ''}` || defaultProfileImage}
                    />
                    <CardContent>
                      <Typography variant="h6">Batch Id: {batch.id}</Typography>
                      <Typography variant="h5" color="textPrimary">
                        Name of Course: {batch.course?.title || ''}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Trainer: {batch.trainer?.trainer?.name || 'N/A'}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Number of Trainers: {batch.trainer ? 1 : '0'}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Number of Students: {batch.students?.length || '0'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Select Update Form */}
                <Grid
                  margin={2}
                  paddingBlock={15}
                  paddingInlineEnd={2}
                  borderRadius={2}
                  boxShadow={2}
                  item
                  xs={12}  // Full width on mobile
                  sm={7}   // 7/12 on small screens
                  md={8}   // 8/12 on medium screens and up
                  lg={6}
                  bgcolor={'#f7f7f71b'}  // 9/12 on large screens and up
                >
                  <Typography variant="body1" color="textPrimary" align="center">
                    Select Course, Trainer, and Students to update the batch
                  </Typography>
                  <form onSubmit={handleSubmit}>

                    {/* Select Course */}
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select Course</InputLabel>
                      <Select
                        name="courseIds"
                        value={newBatch.courseIds}
                        onChange={handleMultiSelectChange}
                        renderValue={(selected) => courses.find((course) => course.id === selected[0])?.title || 'Select Course'}
                      >
                        {courses?.map((course) => (
                          <MenuItem key={course.id} value={course.id}>
                            <ListItemText primary={course.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Select Trainer */}
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select Trainer</InputLabel>
                      <Select
                        name="trainerIds"
                        value={newBatch.trainerIds}
                        onChange={handleMultiSelectChange}
                        renderValue={(selected) => {
                          return selected
                            .map((id) => trainers.find((trainer) => trainer.id === id)?.fullName)
                            .join(', ') || 'Select Trainer';
                        }}
                      >
                        {trainers?.map((trainer) => (
                          <MenuItem key={trainer.id} value={trainer.id}>
                            <ListItemText primary={trainer.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Select Students */}
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Assign Students</InputLabel>
                      <Select
                        multiple
                        name="studentIds"
                        value={newBatch.studentIds}
                        onChange={handleMultiSelectChange}
                        renderValue={(selected) => selected.map((id) => students.find((student) => student.id === id)?.name).join(', ')}
                      >
                        {students?.map((student) => (
                          <MenuItem key={student.id} value={student.id}>
                            <Checkbox checked={newBatch.studentIds.indexOf(student.id) > -1} />
                            <ListItemText primary={student.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Update Batch
                    </Button>
                  </form>
                </Grid>
              </Grid>

              {/* Display Trainer and Course Cards */}
              <Grid item xs={12} margin={2}>
                <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                  {batch.trainer && (
                    <Grid item xs={12} sm={2} key={batch.trainer.id}>
                      <Typography variant="h6" gutterBottom>Trainer</Typography>
                      <Card>
                        <CardMedia
                          component="img"
                          alt="Trainer Image"
                          height="140"
                          image={`data:image/jpeg;base64,${batch.trainer.trainer?.image}` || defaultProfileImage}
                        />
                        <CardContent>
                          <Typography variant="h5">{batch.trainer.trainer?.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Experience: {batch.trainer.trainer?.experience || 'No experience'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Technologies: {batch.trainer.trainer?.technologies.join(', ') || 'No Technologies available'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}

                  {batch.course && (
                    <Grid item xs={12} sm={2} key={batch.course.id}>
                      <Typography variant="h6" gutterBottom>Course</Typography>
                      <Card>
                        <CardMedia
                          component="img"
                          alt="Course Image"
                          height="140"
                          image={`data:image/jpeg;base64,${batch.course?.image}` || defaultProfileImage}
                        />
                        <CardContent>
                          <Typography variant="h5">{batch.course.title}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {batch.course.description || 'No description available'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              {/* Display Student Cards */}
              <Grid item xs={12} margin={2}>
                <Typography variant="h6" gutterBottom>Students</Typography>
                <Grid container spacing={2}>
                  {batch.students.map((student) => (
                    <Grid item xs={12} sm={2} key={student.id}>
                      <Card>
                        <CardMedia
                          component="img"
                          alt="Student Image"
                          height="140"
                          image={`data:image/jpeg;base64,${student.image}` || defaultProfileImage}
                        />
                        <CardContent>
                          <Typography variant="h5">{student.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {student.email || 'No email available'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </div>
  );
}

export default UpdateBatch;
