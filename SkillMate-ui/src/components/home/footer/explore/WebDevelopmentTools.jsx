import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import webDevToolsImage from '../../../../assets/profilePic.jpg'; // Replace with an image related to web development tools
import frontendImage from '../../../../assets/profilePic.jpg'; // Replace with an image related to frontend development
import backendImage from '../../../../assets/profilePic.jpg'; // Replace with an image related to backend development
import backGroundImage from '../../../../assets/Designer.jpeg'; // Background image

function WebDevelopmentTools() {
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
                    Web Development Tools
                </Typography>
                <Typography variant="h6" paragraph>
                    Web development involves a variety of tools that help in creating scalable, responsive, and dynamic websites and web applications. These tools range from front-end technologies for user interfaces to back-end frameworks for server-side logic. Explore the key tools that are essential for modern web development.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Explore Tools
                </Button>
            </Box>

            {/* Frontend Development Tools */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Front-End Development Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    The front-end is the part of web development that interacts with users. Here are the most commonly used tools and libraries for creating responsive and dynamic user interfaces:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    UI Libraries & Frameworks
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>React.js</a>
                                    <br />
                                    - <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Vue.js</a>
                                    <br />
                                    - <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Bootstrap</a>
                                    <br />
                                    - <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Tailwind CSS</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    JavaScript & CSS Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Webpack</a> (Module bundler)
                                    <br />
                                    - <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>SASS/SCSS</a> (CSS preprocessor)
                                    <br />
                                    - <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>npm</a> (Package Manager)
                                    <br />
                                    - <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Babel</a> (JavaScript compiler)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Testing and Debugging Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Jest</a> (Testing framework)
                                    <br />
                                    - <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Cypress</a> (End-to-end testing)
                                    <br />
                                    - <a href="https://reactjs.org/docs/debugging.html" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>React Developer Tools</a>
                                    <br />
                                    - <a href="https://www.sentry.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Sentry</a> (Error tracking)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Backend Development Tools */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Back-End Development Tools
                </Typography>
                <Typography variant="body1" paragraph>
                    Back-end tools help in creating the logic and database interaction behind web applications. The following tools are essential for building scalable and secure server-side applications:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Back-End Frameworks & Platforms
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Node.js</a>
                                    <br />
                                    - <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Express.js</a>
                                    <br />
                                    - <a href="https://www.djangoproject.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Django</a>
                                    <br />
                                    - <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Flask</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Databases & Caching
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MongoDB</a> (NoSQL Database)
                                    <br />
                                    - <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MySQL</a> (Relational Database)
                                    <br />
                                    - <a href="https://redis.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Redis</a> (In-memory caching)
                                    <br />
                                    - <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>PostgreSQL</a> (SQL Database)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Deployment & DevOps Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Docker</a> (Containerization)
                                    <br />
                                    - <a href="https://www.heroku.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Heroku</a> (Platform as a Service)
                                    <br />
                                    - <a href="https://www.jenkins.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Jenkins</a> (CI/CD Automation)
                                    <br />
                                    - <a href="https://www.nginx.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Nginx</a> (Web server)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <Button variant="contained" color="primary" size="large">
                    Explore Web Development Tools
                </Button>
            </Box>
        </Box>
    );
}

export default WebDevelopmentTools;
