import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';
import workspaceImage from '../../../../assets/profilePic.jpg';
import techImage from '../../../../assets/footer/techImage.png';
import developmentImage from '../../../../assets/footer/developmentImage.png';

function FullstackDeveloper() {
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
                    zIndex: -1,
                }}
            />

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p1)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Full Stack Developer
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    As a Full Stack Developer, you will work with both frontend and backend technologies, developing robust, scalable applications. You will play a key role in designing and deploying end-to-end solutions, ensuring the seamless integration of the front and back ends.
                </Typography>
                <CustomButton text={'Apply Now'} marginTop={'1%'} />
            </Box>

            {/* Technical Skills Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Key Skills and Technologies
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Front-End Technologies
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - React.js, Angular, Vue.js
                                    <br />
                                    - HTML5, CSS3, SASS
                                    <br />
                                    - JavaScript, TypeScript
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Back-End Technologies
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - Node.js, Express.js
                                    <br />
                                    - Python, Django, Flask
                                    <br />
                                    - Java, Spring Boot
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Database & Cloud Technologies
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - MySQL, PostgreSQL, MongoDB
                                    <br />
                                    - AWS, Google Cloud, Azure
                                    <br />
                                    - Docker, Kubernetes
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Development & Infrastructure Section */}
            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                            component="img"
                            height="350"
                            image={developmentImage}
                            alt="Development Process"
                        />
                        <CardContent>
                            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Development Best Practices
                            </Typography>
                            <Typography fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Learn industry best practices including agile methodologies, CI/CD pipelines, and automated testing for building scalable applications.
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
                            image={techImage}
                            alt="Technology Stack"
                        />
                        <CardContent>
                            <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Technology & Tools
                            </Typography>
                            <Typography fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Work with modern technologies including Git, Docker, Kubernetes, cloud platforms, and more to enhance software development workflows.
                            </Typography>
                            <CustomButton text={'Learn More'} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <CustomButton text={'Explore Full Stack Developer Opportunities'} />
            </Box>
        </Box>
    );
}

export default FullstackDeveloper;
