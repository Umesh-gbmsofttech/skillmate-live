import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import workspaceImage from '../../../../assets/profilePic.jpg';
import techImage from '../../../../assets/profilePic.jpg';
import developmentImage from '../../../../assets/profilePic.jpg';
// import techImage from '../../../../assets/techImage.jpg';  // You can replace this with a relevant tech stack image
// import developmentImage from '../../../../assets/profilePic.jpg';  // Replace with an image that relates to development work

function FullstackDeveloper() {
    return (
        <Box sx={{ padding: 4, color: 'white', backgroundColor: '#1a1a1a' }}>

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h3" fontWeight={'bold'} gutterBottom>
                    Full Stack Developer
                </Typography>
                <Typography variant="h6" paragraph>
                    As a Full Stack Developer, you will work with both frontend and backend technologies, developing robust, scalable applications. You will play a key role in designing and deploying end-to-end solutions, ensuring the seamless integration of the front and back ends.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Apply Now
                </Button>
            </Box>

            {/* Technical Skills Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Key Skills and Technologies
                </Typography>
                <Typography variant="body1" paragraph>
                    As a Full Stack Developer, you’ll be proficient in various technologies across the software stack. Here are some of the essential tools and frameworks:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Front-End Technologies
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>React.js</a>
                                    <br />
                                    - <a href="https://angular.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Angular</a>
                                    <br />
                                    - <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>HTML5</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>CSS3</a>, <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>SASS</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Back-End Technologies
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Node.js</a>
                                    <br />
                                    - <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Express.js</a>
                                    <br />
                                    - <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MongoDB</a>, <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>PostgreSQL</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Deployment and Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Docker</a>
                                    <br />
                                    - <a href="https://www.heroku.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Heroku</a>
                                    <br />
                                    - <a href="https://www.aws.amazon.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>AWS</a>
                                    <br />
                                    - <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Cypress</a> for testing
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
                    As a Full Stack Developer at our company, you’ll work on a variety of projects that include:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Building dynamic web applications with React/Angular and Node.js.</Typography></li>
                    <li><Typography variant="body1">Integrating third-party APIs and services into our applications.</Typography></li>
                    <li><Typography variant="body1">Building RESTful APIs and GraphQL endpoints.</Typography></li>
                    <li><Typography variant="body1">Managing databases, including designing schemas and optimizing queries.</Typography></li>
                    <li><Typography variant="body1">Deploying applications using Docker, AWS, or Heroku for scalability and performance.</Typography></li>
                </ul>
            </Box>

            {/* Workspace Flexibility Section */}
            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={workspaceImage}
                            alt="Workspace Flexibility"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Flexible Workspace
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Our developers enjoy the flexibility to work from home, co-working spaces, or our various office locations. We believe in work-life balance and providing the best environment to foster creativity and productivity.
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
                            image={developmentImage}
                            alt="Development Tools"
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Development Tools & Environment
                            </Typography>
                            <Typography variant="body2" paragraph>
                                We provide our developers with cutting-edge tools to ensure seamless development. From modern IDEs to version control with Git and GitHub, we ensure you have everything needed to code effectively.
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
                    Explore Full Stack Developer Opportunities
                </Button>
            </Box>
        </Box>
    );
}

export default FullstackDeveloper;
