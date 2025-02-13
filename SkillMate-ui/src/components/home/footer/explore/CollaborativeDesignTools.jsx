import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import figmaImage from '../../../../assets/profilePic.jpg'; // Replace with an image related to collaborative design tools
import adobeXdImage from '../../../../assets/profilePic.jpg'; // Replace with an image related to Adobe XD
import invisionImage from '../../../../assets/profilePic.jpg'; // Replace with an image related to InVision
import backGroundImage from '../../../../assets/Designer.jpeg'; // Background image

function CollaborativeDesignTools() {
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
                    Collaborative Design Tools
                </Typography>
                <Typography variant="h6" paragraph>
                    Collaborative design tools allow teams to work together seamlessly, share ideas, and create designs that meet user needs. These tools enable real-time feedback, brainstorming, and co-design, making them essential for modern design workflows.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Explore Collaborative Tools
                </Button>
            </Box>

            {/* Collaborative Design Tools Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Top Collaborative Design Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    Here are some popular collaborative design tools that make it easy for design teams to communicate, collaborate, and build interactive designs together:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Figma
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Figma is a cloud-based design tool that allows multiple designers to work on the same project in real-time. It is ideal for collaborative design, prototyping, and user interface design.
                                    <br />
                                    <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Adobe XD
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Adobe XD allows design teams to create wireframes, prototypes, and user interfaces while collaborating in real time. It also integrates with other Adobe tools, making it great for workflow consistency.
                                    <br />
                                    <a href="https://www.adobe.com/products/xd.html" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    InVision
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    InVision is a digital product design platform that enables teams to collaborate on design projects, build interactive prototypes, and gather feedback all in one place.
                                    <br />
                                    <a href="https://www.invisionapp.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Best Practices for Collaborative Design */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Best Practices for Collaborative Design
                </Typography>
                <Typography variant="body1" paragraph>
                    Here are some best practices to follow when working in a collaborative design environment:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Use cloud-based tools: Cloud-based tools like Figma, Adobe XD, and InVision allow for real-time collaboration and version control.</Typography></li>
                    <li><Typography variant="body1">Maintain clear communication: Regular meetings, design critiques, and feedback loops help ensure everyone is aligned with the vision.</Typography></li>
                    <li><Typography variant="body1">Share assets and components: Create shared libraries or design systems to streamline the design process and maintain consistency.</Typography></li>
                    <li><Typography variant="body1">Ensure feedback is actionable: When sharing designs, make sure feedback is clear, actionable, and focused on improvements.</Typography></li>
                </ul>
            </Box>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <Button variant="contained" color="primary" size="large">
                    Start Collaborating on Designs Today
                </Button>
            </Box>
        </Box>
    );
}

export default CollaborativeDesignTools;
