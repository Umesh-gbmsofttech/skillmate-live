import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStudent } from '../../redux/communityDataSlice';
import Loading from '../../../Loading';
import { showSuccessToast, showErrorToast } from '../../utility/ToastService';
import { Card, CardContent, Typography, Grid, Avatar, Box, Container, Paper } from '@mui/material';
import altImage from '../../../assets/skillmate.jpg';

const StudentSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/students', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudents(data); // Assuming the API returns an array of students
                    setLoading(false);
                    showSuccessToast('Data fetched successfully');
                }
            } catch (error) {
                setError('Error fetching data:', error);
                showErrorToast(`Error fetching data:${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [dispatch, token]);

    const handleCardClick = (student) => {
        dispatch(setStudent(student));  // Store selected student
        navigate('/rating-reviews/page', { state: { student } });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, backgroundColor: 'linearGradient((green),(red))' }}>
            {loading ? (
                <Loading />
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <>
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color='#3caacb'>
                        Meet Our Placed Students
                    </Typography>
                    <Box
                        sx={{
                            mt: 5,
                            p: 3,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            textAlign: 'center',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                            Our Students
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Our students are passionate learners who have honed their skills through hands-on experience and expert guidance. They are ready to make a mark in the IT industry with their growing expertise.
                        </Typography>
                    </Box>
                    <Grid container spacing={4} justifyContent="center" marginTop={3}>
                        {students.map((student, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        cursor: 'pointer',
                                        p: 2,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        transition: '0.3s',
                                        backgroundColor: '#FBF5DD',
                                        "&:hover": {
                                            boxShadow: "0px 8px 16px rgba(254, 254, 254, 0.6)",
                                        },
                                        position: 'relative',
                                    }}
                                    onClick={() => handleCardClick(student)}
                                >
                                    {/* Circular Avatar */}
                                    <Avatar
                                        src={student.image ? `data:image/png;base64,${student.image}` : altImage}
                                        alt={student.fullName || 'Student'}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mx: 'auto',
                                            mt: -7,
                                            border: "4px solid #16404D",
                                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
                                        }}
                                    />

                                    <CardContent sx={{ mt: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {student.fullName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {student.position}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {student.experience}
                                        </Typography>
                                        <Typography variant="body2" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>
                                            Expertise:
                                            {student?.courses?.length > 0 ? (
                                                student.courses.map((course, idx) => (
                                                    <li key={idx}>{course.courseName}</li>
                                                ))
                                            ) : (
                                                <li>No expertise listed</li>
                                            )}
                                        </Typography>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default StudentSection;
