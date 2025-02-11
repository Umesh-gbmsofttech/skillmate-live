import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import ApiIcon from '@mui/icons-material/Api';
import databaseImage from '../../../../assets/profilePic.jpg';
import cloudImage from '../../../../assets/profilePic.jpg';
// import cloudImage from '../../../../assets/cloudImage.jpg';  

function BackendDeveloper() {
    return (
        <Box sx={{ padding: 4, color: 'white', backgroundColor: '#1a1a1a' }}>

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h3" fontWeight={'bold'} gutterBottom>
                    Backend Developer
                </Typography>
                <Typography variant="h6" paragraph>
                    As a Backend Developer, you’ll design and build scalable server-side applications, work with databases, and integrate cloud services. Your main responsibility will be to create powerful APIs and backend systems that power dynamic web applications.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Apply Now
                </Button>
            </Box>

            {/* Backend Technologies Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Key Backend Technologies
                </Typography>
                <Typography variant="body1" paragraph>
                    As a Backend Developer, you’ll work with various technologies to build robust and scalable backend services. Here are the main tools and frameworks you’ll be using:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Back-End Frameworks
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Node.js</a> with <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Express.js</a>
                                    <br />
                                    - <a href="https://www.djangoproject.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Django</a> (Python)
                                    <br />
                                    - <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Flask</a> (Python)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Databases
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MongoDB</a> (NoSQL)
                                    <br />
                                    - <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>PostgreSQL</a> (SQL)
                                    <br />
                                    - <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MySQL</a> (SQL)
                                    <br />
                                    - <a href="https://redis.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Redis</a> (In-memory data store)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Cloud & Deployment
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>AWS</a> (Amazon Web Services)
                                    <br />
                                    - <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Google Cloud</a>
                                    <br />
                                    - <a href="https://www.heroku.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Heroku</a>
                                    <br />
                                    - <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Docker</a> for containerization
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Real Projects Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Real Projects You Will Work On
                </Typography>
                <Typography variant="body1" paragraph>
                    As a Backend Developer, you’ll have the opportunity to work on the following types of projects:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Designing and building RESTful APIs for web and mobile applications.</Typography></li>
                    <li><Typography variant="body1">Integrating databases and ensuring efficient data retrieval and storage.</Typography></li>
                    <li><Typography variant="body1">Creating microservices to break down large monolithic applications.</Typography></li>
                    <li><Typography variant="body1">Ensuring security through authentication, authorization, and encryption.</Typography></li>
                    <li><Typography variant="body1">Automating the deployment pipeline using CI/CD practices with Jenkins, GitLab, or similar tools.</Typography></li>
                </ul>
            </Box>

            {/* Cloud Services & Deployment Section */}
            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={cloudImage}
                            alt="Cloud Deployment"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Cloud Services & Deployment
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Backend developers often work with cloud services for hosting, storage, and other backend operations. You will be responsible for deploying services and applications on platforms like AWS, Google Cloud, and Azure.
                            </Typography>
                            <Button variant="outlined" color="primary">
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={databaseImage}
                            alt="Database Management"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Database Management
                            </Typography>
                            <Typography variant="body2" paragraph>
                                You'll be responsible for designing and managing both SQL and NoSQL databases, optimizing queries, and ensuring the integrity and scalability of the data layer.
                            </Typography>
                            <Button variant="outlined" color="primary">
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <Button variant="contained" color="primary" size="large">
                    Explore Backend Developer Opportunities
                </Button>
            </Box>
        </Box>
    );
}

export default BackendDeveloper;
