import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import designImage from '../../../../assets/profilePic.jpg';  // Replace with a relevant image for UI/UX Design
import prototypingImage from '../../../../assets/profilePic.jpg';  // Replace with an image related to prototyping or design tools
import backGroundImage from '../../../../assets/Designer.jpeg'; // Background image

function UiUxDesign() {
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
                    UI/UX Designer
                </Typography>
                <Typography variant="h6" paragraph>
                    As a UI/UX Designer, you will be at the forefront of designing user-centered, visually stunning, and intuitive interfaces. Your role will be crucial in crafting seamless user experiences from wireframes to high-fidelity designs, ensuring that every product is both functional and aesthetically pleasing.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Apply Now
                </Button>
            </Box>

            {/* Design Tools and Skills Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Key Skills and Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    As a UI/UX Designer, you’ll need proficiency in design tools and methodologies. Here are some of the core tools and skills:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    UI/UX Design Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Figma</a>
                                    <br />
                                    - <a href="https://www.sketch.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Sketch</a>
                                    <br />
                                    - <a href="https://www.adobe.com/products/xd.html" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Adobe XD</a>
                                    <br />
                                    - <a href="https://www.invisionapp.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>InVision</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Design Systems & Prototyping
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://material.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Material Design</a>
                                    <br />
                                    - <a href="https://www.apple.com/design/human-interface-guidelines/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Apple Human Interface Guidelines</a>
                                    <br />
                                    - <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Prototyping with Behance</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    User Research & Testing
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.userzoom.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>UserZoom</a>
                                    <br />
                                    - <a href="https://lookback.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Lookback.io</a>
                                    <br />
                                    - <a href="https://www.optimizely.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Optimizely</a>
                                    <br />
                                    - <a href="https://www.hotjar.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Hotjar</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Design Projects Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Projects You Will Work On
                </Typography>
                <Typography variant="body1" paragraph>
                    As a UI/UX Designer at our company, you'll have the opportunity to work on:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Designing user interfaces and experiences for web and mobile applications.</Typography></li>
                    <li><Typography variant="body1">Creating wireframes, mockups, and prototypes for testing and user feedback.</Typography></li>
                    <li><Typography variant="body1">Collaborating with product managers and developers to ensure seamless design implementation.</Typography></li>
                    <li><Typography variant="body1">Conducting user research and usability testing to enhance user experience.</Typography></li>
                    <li><Typography variant="body1">Building and maintaining design systems and style guides for consistent design patterns.</Typography></li>
                </ul>
            </Box>

            {/* Work Environment Section */}
            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={designImage}
                            alt="Workspace Flexibility"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Flexible Workspace
                            </Typography>
                            <Typography variant="body2" paragraph>
                                As a UI/UX designer, you’ll enjoy flexibility in your work environment, with the ability to work remotely, from co-working spaces, or our various office locations. Creativity thrives in the right environment, and we encourage flexibility.
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
                            image={prototypingImage}
                            alt="Design Tools"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Cutting-Edge Design Tools
                            </Typography>
                            <Typography variant="body2" paragraph>
                                We provide our designers with the latest tools for UI/UX design and prototyping, including Figma, Sketch, Adobe XD, and InVision, ensuring that you have everything needed for efficient and collaborative design processes.
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
                    Explore UI/UX Design Opportunities
                </Button>
            </Box>
        </Box>
    );
}

export default UiUxDesign;
