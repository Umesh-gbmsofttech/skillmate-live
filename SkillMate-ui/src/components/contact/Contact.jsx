import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardMedia, CardContent, Collapse } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import ReviewsSection from '../rating-review/ReviewsSection';
import EnquiryForm from './EnquiryForm';
import logo from '../../assets/skillmate.jpg';
import whatsapp from '../../assets/whatsapp.png';
import writeIcon from '../../assets/writeIcon.png';
import baseUrl from '../urls/baseUrl'
import { ExpandMore } from '@mui/icons-material';
import CustomButton from '../utility/CustomButton';

function Contact() {
    const navigate = useNavigate();
    const location = useLocation();
    const course = location.state?.course;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [formData, setFormData] = useState({ query: '', selectedOption: '' });

    const handleWhatsAppClick = () => {
        showSuccessToast('Opening WhatsApp');
        window.open(`https://api.whatsapp.com/send?phone=+919226224019&text=Hi, I'm interested in enrolling in your React.js course. Please let me know your availability.`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}sendEmail`, formData)
            .then(() => showSuccessToast('Query submitted successfully!'))
            .catch(() => showErrorToast('Error submitting query!'));
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 1 }}>            {course && (
            <>
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 1200, m: '40px auto', p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f7f7f71b' }}>
                    <CardMedia
                        component="img"
                        sx={{ objectPosition: "top", objectFit: "cover", position: "relative", minHeight: 400, maxHeight: 500, width: { xs: '100%', md: '50%' }, borderRadius: 2 }}
                        image={course?.image ? `data:image/jpeg;base64,${course.image}` : logo}
                        alt="Course Image"
                    />
                    <CardContent sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Typography sx={{ color: 'var(--color-p2)', fontWeight: 'bolder', fontFamily: 'var(--font-p1)', fontSize: 'var(--font-size-p1)' }} gutterBottom>
                            Price: ₹ {course.price}/-
                        </Typography>
                        <Typography sx={{ color: 'var(--color-p3)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p2)' }} gutterBottom>
                            Price: {course?.price}
                        </Typography>
                        <Typography sx={{ color: 'var(--color-p3)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p2)' }} gutterBottom>
                            Duration: {course?.days} days
                        </Typography>

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

                        <Button
                            onClick={handleExpandClick}
                            sx={{ marginTop: 2, textTransform: 'none', ":focus": { outline: "none", border: "none" }, fontFamily: 'var(--font-p1)', fontSize: 'var(--font-size-p2)' }}
                            endIcon={<ExpandMore />}
                        >
                            See the full details of this course...
                        </Button>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography sx={{ color: 'var(--color-p2)', fontFamily: 'var(--font-p1)', fontSize: 'var(--font-size-p2)' }} gutterBottom>
                                {course.description}
                            </Typography>
                        </Collapse>

                        <Box mt={2}>
                            <TextField
                                f
                                fullWidth
                                multiline
                                minRows={4}
                                name="query"
                                label="Enter your detailed query here..."
                                value={formData.query}
                                onChange={handleInputChange}
                            />
                            <CustomButton text={'Submit'} width={'100%'} marginTop={2} onClick={handleSubmit} />
                        </Box>
                    </CardContent>
                </Card>
                <ReviewsSection course={course} />
            </>
        )}


            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 2, mt: 4, borderRadius: 2, fontFamily: 'var(--font-p2)' }}>
                <Button onClick={handleWhatsAppClick} startIcon={<img src={whatsapp} alt="WhatsApp" style={{ width: 40, height: 40 }} />}>
                    <Typography variant="h5">09226224019</Typography>
                </Button>
            </Box>

            {/* {!isAuthenticated && <EnquiryForm />}
            <EnquiryForm contact /> */}
            <EnquiryForm contact={true} />
        </Box>
    );
}

export default Contact;
