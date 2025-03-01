import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';
import databaseImage from '../../../../assets/footer/databaseImage.png';
import cloudImage from '../../../../assets/footer/cloudImage.png';

function BackendDeveloper() {
    return (
        <Box
            sx={{
                padding: 2,
                color: 'white',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // Ensure it's behind content
                }}
            />

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p1)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Backend Developer
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    As a Backend Developer, you’ll design and build scalable server-side applications, work with databases, and integrate cloud services.
                </Typography>
                <CustomButton text={'Apply Now'} marginTop={'1%'} />
            </Box>

            {/* Backend Technologies Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Key Backend Technologies
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    Here are the main tools and frameworks used in backend development:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Backend Frameworks
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - Express.js (Node.js), Django (Python), Flask (Python), Spring Boot (Java)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Databases
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - MongoDB, PostgreSQL, MySQL, Redis
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Cloud & Deployment Section */}
            <Grid container spacing={4} sx={{ marginBottom: 6 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                            component="img"
                            height="350"
                            image={cloudImage}
                            alt="Cloud Infrastructure"
                        />
                        <CardContent>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Cloud Infrastructure
                            </Typography>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Backend developers often work with cloud platforms like AWS, Google Cloud, and Azure.
                            </Typography>
                            <CustomButton text={'Learn More'} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                            component="img"
                            height="350"
                            image={databaseImage}
                            alt="Database Management"
                        />
                        <CardContent>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Database Management
                            </Typography>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Backend developers handle structured (SQL) and unstructured (NoSQL) databases for scalable applications.
                            </Typography>
                            <CustomButton text={'Learn More'} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <CustomButton text={'Explore Backend Developer Opportunities'} />
            </Box>
        </Box>
    );
}

export default BackendDeveloper;
