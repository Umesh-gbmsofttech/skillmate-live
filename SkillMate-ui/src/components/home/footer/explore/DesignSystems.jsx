import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import systemDesignImage from '../../../../assets/profilePic.jpg';  // Replace with an image related to system design
import architectureImage from '../../../../assets/profilePic.jpg';  // Replace with an image related to system architecture or design
import backGroundImage from '../../../../assets/Designer.jpeg'; // Background image

function DesignSystems() {
    return (
        <Box
            sx={{
                padding: 2,
                color: 'white',
                backgroundImage: `url(${backGroundImage})`, // Applying background image
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay with opacity
                    zIndex: -1, // Ensures overlay is behind the content
                }}
            />

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2, color: '#A6CDC6' }}>
                <Typography variant="h3" fontWeight={'bold'} gutterBottom>
                    Design Systems
                </Typography>
                <Typography variant="h6" paragraph>
                    A design system provides a unified set of design standards, patterns, and principles that help teams build consistent and cohesive digital products. Whether for large-scale web applications or mobile platforms, system design encompasses both front-end and back-end components.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Apply Now
                </Button>
            </Box>

            {/* Key Skills & Tools for System Design Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Key Skills and Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    As a System Designer or Engineer, you'll be proficient in various tools and methodologies to design scalable and maintainable systems. Here are some of the core skills and tools used in system design:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Architecture Design
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://martinfowler.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Martin Fowler's Patterns</a>
                                    <br />
                                    - <a href="https://en.wikipedia.org/wiki/Microservices" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Microservices</a>
                                    <br />
                                    - <a href="https://aws.amazon.com/architecture/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>AWS Architecture</a>
                                    <br />
                                    - <a href="https://www.12factor.net/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>12-Factor App Principles</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Design Principles & Patterns
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://refactoring.guru/design-patterns" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Design Patterns</a>
                                    <br />
                                    - <a href="https://en.wikipedia.org/wiki/Scalability" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Scalability Principles</a>
                                    <br />
                                    - <a href="https://www.cio.com/article/287347/it-architecture-the-top-5-it-architecture-models-to-know.html" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>IT Architecture Models</a>
                                    <br />
                                    - <a href="https://www.patterns.dev/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Patterns.dev</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    System Design Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.lucidchart.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Lucidchart</a>
                                    <br />
                                    - <a href="https://draw.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Draw.io</a>
                                    <br />
                                    - <a href="https://www.cacoo.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Cacoo</a>
                                    <br />
                                    - <a href="https://www.dbdiagram.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>DBDiagram.io</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* System Design Projects Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    System Design Projects
                </Typography>
                <Typography variant="body1" paragraph>
                    As a system designer or engineer, you will be responsible for designing systems that are efficient, scalable, and maintainable. Some of the typical projects you'll work on include:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Designing microservices architectures for large-scale applications.</Typography></li>
                    <li><Typography variant="body1">Building robust databases and optimizing query performance for high-volume systems.</Typography></li>
                    <li><Typography variant="body1">Designing scalable cloud architectures using platforms like AWS, GCP, or Azure.</Typography></li>
                    <li><Typography variant="body1">Optimizing system performance and ensuring fault tolerance and disaster recovery capabilities.</Typography></li>
                    <li><Typography variant="body1">Creating service-oriented architectures (SOA) and APIs for efficient data exchange.</Typography></li>
                </ul>
            </Box>

            {/* System Design in Action Section */}
            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={systemDesignImage}
                            alt="System Design"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Design and Architecture Process
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Our system designers follow a rigorous process to ensure that every solution is optimal. From understanding the requirements to implementing scalable and reliable systems, we use a combination of design principles, tools, and testing methods to deliver high-performance systems.
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
                            image={architectureImage}
                            alt="System Architecture"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Scalable Architecture
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Building a scalable architecture is critical for growth. Our designers focus on ensuring that systems can scale easily while maintaining reliability and speed. We leverage tools like cloud-native architectures, containers, and service orchestration to ensure our systems perform at scale.
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
                    Explore System Design Opportunities
                </Button>
            </Box>
        </Box>
    );
}

export default DesignSystems;
