import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

function WhatWeOffer() {
    return (
        <Box sx={{ padding: 4, backgroundColor: 'var(--color-p4)', color: 'var(--color-p2)' }}>
            <Typography fontSize={'var(--font-size-p1)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} textAlign={'center'} gutterBottom>
                What We Offer
            </Typography>
            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} textAlign={'center'} paragraph>
                At Skillmate, we provide comprehensive training programs designed to bridge the gap between learning and real-world application. Our courses are tailored for students, professionals, and career switchers who want to excel in the tech industry.
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                        <CardContent>
                            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Hands-On Training
                            </Typography>
                            <Typography fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Work on live projects using Java, Spring Boot, React, Angular, and Microservices to gain practical experience.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                        <CardContent>
                            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Career Support
                            </Typography>
                            <Typography fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Get access to job opportunities, resume building, and interview preparation to land your dream job.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                        <CardContent>
                            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Expert Mentorship
                            </Typography>
                            <Typography fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Learn from experienced industry professionals who guide you through each step of your learning journey.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                        <CardContent>
                            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Recognized Certifications
                            </Typography>
                            <Typography fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Earn certifications that are trusted by top companies, boosting your resume and job prospects.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default WhatWeOffer;
