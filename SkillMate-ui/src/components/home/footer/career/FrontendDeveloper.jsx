import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ResponsiveIcon from '@mui/icons-material/Devices';
import designImage from '../../../../assets/profilePic.jpg';
import testingImage from '../../../../assets/profilePic.jpg';
// import testingImage from '../../../../assets/testingImage.jpg';  // Replace with relevant image

function FrontendDeveloper() {
    return (
        <Box sx={{ padding: 4, color: 'white', backgroundColor: '#1a1a1a' }}>

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h3" fontWeight={'bold'} gutterBottom>
                    Frontend Developer
                </Typography>
                <Typography variant="h6" paragraph>
                    As a Frontend Developer, you'll be responsible for building the user interface (UI) and user experience (UX) of web applications. Using modern web technologies and frameworks, you'll create visually appealing, responsive, and intuitive applications that engage users.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Apply Now
                </Button>
            </Box>

            {/* Frontend Technologies Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Key Frontend Technologies
                </Typography>
                <Typography variant="body1" paragraph>
                    As a Frontend Developer, you’ll work with a variety of tools and technologies to create high-quality user interfaces. Here are the main frameworks and libraries you'll use:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Frontend Frameworks & Libraries
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>React.js</a>
                                    <br />
                                    - <a href="https://angular.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Angular</a>
                                    <br />
                                    - <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Vue.js</a>
                                    <br />
                                    - <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Next.js</a> (for server-side rendering with React)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Styling & Design
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>SASS</a> (CSS preprocessor)
                                    <br />
                                    - <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Bootstrap</a> (CSS framework)
                                    <br />
                                    - <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Tailwind CSS</a> (Utility-first CSS framework)
                                    <br />
                                    - <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Material-UI</a> (React component library)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#2a2a2a' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Build & Deployment Tools
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    - <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Webpack</a> (Module bundler)
                                    <br />
                                    - <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>npm</a> (Package manager)
                                    <br />
                                    - <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Gatsby</a> (Static site generator)
                                    <br />
                                    - <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Netlify</a> (Continuous deployment)
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
                    As a Frontend Developer, you will be involved in a variety of projects, including:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Building modern, responsive web applications using React, Angular, or Vue.js.</Typography></li>
                    <li><Typography variant="body1">Implementing UI/UX designs with frameworks like Material-UI, Tailwind CSS, or Bootstrap.</Typography></li>
                    <li><Typography variant="body1">Optimizing the user experience through performance improvements, responsiveness, and accessibility.</Typography></li>
                    <li><Typography variant="body1">Creating interactive UIs with state management tools such as Redux or Context API.</Typography></li>
                    <li><Typography variant="body1">Ensuring cross-browser compatibility and debugging frontend issues.</Typography></li>
                </ul>
            </Box>

            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={designImage}
                            alt="Responsive Design"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Responsive Web Design
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Frontend developers are responsible for building web pages that look great on any device, from desktops to smartphones. You’ll use tools like CSS Grid, Flexbox, and media queries to ensure that the layout adapts to all screen sizes.
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
                            image={testingImage}
                            alt="Frontend Testing"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Frontend Testing
                            </Typography>
                            <Typography variant="body2" paragraph>
                                As a Frontend Developer, testing is crucial. You’ll use tools like <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Jest</a>, <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Cypress</a>, and <a href="https://react-testing-library.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>React Testing Library</a> to ensure your code is bug-free.
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
                    Explore Frontend Developer Opportunities
                </Button>
            </Box>
        </Box>
    );
}

export default FrontendDeveloper;
