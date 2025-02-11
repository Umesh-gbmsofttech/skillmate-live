import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardMedia, CardContent } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import ReviewsSection from '../rating-review/ReviewsSection';
import EnquiryForm from './EnquiryForm';
import logo from '../../assets/skillmate.jpg';
import whatsapp from '../../assets/whatsapp.png';
import writeIcon from '../../assets/writeIcon.png';

function Contact() {
    const navigate = useNavigate();
    const location = useLocation();
    const course = location.state?.course;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [formData, setFormData] = useState({ query: '', selectedOption: '' });

    const handleWhatsAppClick = () => {
        showSuccessToast('Opening WhatsApp');
        window.open(`https://api.whatsapp.com/send?phone=+919226224019&text=Hi, I'm interested in enrolling in your React.js course. Please let me know your availability.`);
    };

    const handleRateUsClick = () => {
        navigate('/rating-reviews/page/card', { state: { course } });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/sendEmail', formData)
            .then(() => showSuccessToast('Query submitted successfully!'))
            .catch(() => showErrorToast('Error submitting query!'));
    };

    return (
        <Box sx={{ maxWidth: '100%', fontFamily: 'Arial, sans-serif', p: 2 }}>
            {course && (
                <>
                    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 1200, m: '40px auto', p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f7f7f71b' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: { xs: '100%', md: '50%' }, borderRadius: 2 }}
                            image={course?.coverImage ? `data:image/jpeg;base64,${course.coverImage}` : logo}
                            alt="Course Image"
                        />
                        <CardContent sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography variant="h4" fontWeight="bold" mb={2}>Course: {course?.courseName}</Typography>
                            <Typography variant="h5" color="primary" mb={2}>Price: {course?.price}</Typography>
                            <Typography variant="body1" color="text.secondary" mb={2}>Duration: {course?.days} days</Typography>

                            <FormControl fullWidth>
                                <InputLabel>Select Query</InputLabel>
                                <Select name="selectedOption" value={formData.selectedOption} onChange={handleInputChange}>
                                    <MenuItem value="">Select an option</MenuItem>
                                    <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                                    <MenuItem value="Course Details">Course Details</MenuItem>
                                    <MenuItem value="Enrollment Process">Enrollment Process</MenuItem>
                                    <MenuItem value="Payment Issues">Payment Issues</MenuItem>
                                </Select>
                            </FormControl>

                            <details>
                                <summary>See full details of this course...</summary>
                                <Typography variant="body2" sx={{ bgcolor: '#f7f7f71b', p: 1, borderRadius: 1 }}>{course?.description}</Typography>
                            </details>

                            <Box mt={2}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    name="query"
                                    label="Enter your detailed query here..."
                                    value={formData.query}
                                    onChange={handleInputChange}
                                />
                                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
                            </Box>
                        </CardContent>
                    </Card>
                    <Button
                        sx={{ display: 'flex', alignItems: 'center', justifySelf: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'primary.main', mt: 2, textTransform: 'none', '&:hover': { textShadow: '0 0 5px rgb(7, 212, 244)', bgcolor: 'rgb(214, 214, 214)' } }}
                        onClick={handleRateUsClick}
                    >
                        Leave a Rating and Review <img src={writeIcon} alt="Rate Us" style={{ marginLeft: 8, width: 24 }} />
                    </Button>
                    <Typography variant="h4" align="center" fontWeight="bold" mt={4} color='#3caacb'>Latest Reviews</Typography>
                    <ReviewsSection course={course} />
                </>
            )}


            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 2, bgcolor: '#f9f9f9', mt: 4, borderRadius: 2, backgroundColor: '#1A2130' }}>
                <Button onClick={handleWhatsAppClick} startIcon={<img src={whatsapp} alt="WhatsApp" style={{ width: 40, height: 40 }} />}>
                    <Typography variant="h6">09226224019</Typography>
                </Button>
            </Box>

            {/* {!isAuthenticated && <EnquiryForm />}
            <EnquiryForm contact /> */}
            <EnquiryForm contact={true} />
        </Box>
    );
}

export default Contact;
