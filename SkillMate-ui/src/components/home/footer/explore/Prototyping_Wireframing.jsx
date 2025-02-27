import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import techImage from '../../../../assets/footer/techImage.png'; // Replace with an image related to prototyping
import wireframingImage from '../../../../assets/footer/wireframingImage.png'; // Replace with an image related to wireframing
import backGroundImage from '../../../../assets/Designer.jpeg'; // Background image

function Prototyping_Wireframing() {
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
                    Prototyping & Wireframing
                </Typography>
                <Typography variant="h6" paragraph>
                    Prototyping and wireframing are crucial steps in the design process. These techniques help designers and developers visualize the layout, functionality, and interaction of a digital product before building it. Explore the best tools and practices to create effective wireframes and prototypes.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Start Prototyping & Wireframing
                </Button>
            </Box>

            {/* Prototyping Tools */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Prototyping Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    Prototyping is an essential step in product design. It allows you to simulate user interaction and visualize the final product. Here are some popular prototyping tools:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Figma
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Figma is a popular cloud-based tool for designing and prototyping. It allows collaborative design and is widely used for both wireframing and prototyping.
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
                                    Adobe XD is a powerful tool for designing user interfaces and creating interactive prototypes. It supports vector-based designs and integrates seamlessly with other Adobe tools.
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
                                    InVision provides a platform for prototyping, collaboration, and workflow management. It enables designers to create interactive prototypes with a simple and intuitive interface.
                                    <br />
                                    <a href="https://www.invisionapp.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Wireframing Tools */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Wireframing Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    Wireframing helps you visualize the layout and structure of a website or app. It focuses on functionality and interaction design, allowing you to plan without getting caught up in aesthetics. Here are some top wireframing tools:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Balsamiq
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Balsamiq is a user-friendly wireframing tool that emphasizes quick sketching of ideas. It’s ideal for low-fidelity wireframes and is often used for brainstorming.
                                    <br />
                                    <a href="https://balsamiq.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Sketch
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Sketch is a vector-based design tool widely used for creating high-fidelity wireframes and user interfaces. It is particularly popular in the macOS ecosystem.
                                    <br />
                                    <a href="https://www.sketch.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Wireframe.cc
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Wireframe.cc is an online wireframing tool that helps designers create simple wireframes quickly and easily. It’s great for rapid prototyping and iteration.
                                    <br />
                                    <a href="https://wireframe.cc/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Prototyping & Wireframing Best Practices */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Prototyping & Wireframing Best Practices
                </Typography>
                <Typography variant="body1" paragraph>
                    When working on wireframes and prototypes, it's important to follow certain best practices to ensure the effectiveness and usability of your designs:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Focus on user flows: Ensure your wireframes and prototypes reflect the actual paths users will take through your app or website.</Typography></li>
                    <li><Typography variant="body1">Keep it simple: Early-stage wireframes and prototypes should be minimalistic and focus on functionality rather than design details.</Typography></li>
                    <li><Typography variant="body1">Iterate quickly: Use tools that allow for rapid iteration and real-time feedback from stakeholders or team members.</Typography></li>
                    <li><Typography variant="body1">Test with users: Even low-fidelity prototypes can be valuable for testing basic concepts and getting feedback from real users.</Typography></li>
                </ul>
            </Box>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <Button variant="contained" color="primary" size="large">
                    Start Prototyping & Wireframing
                </Button>
            </Box>
        </Box>
    );
}

export default Prototyping_Wireframing;
