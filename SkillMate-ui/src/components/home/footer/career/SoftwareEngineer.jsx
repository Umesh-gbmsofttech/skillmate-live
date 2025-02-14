import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import cloudImage from '../../../../assets/profilePic.jpg';
import testingImage from '../../../../assets/profilePic.jpg';
// import testingImage from '../../../../assets/testingImage.jpg';  // Replace with relevant image
import backGroundImage from '../../../../assets/Designer.jpeg';

function SoftwareEngineer() {
  return (
    <Box
      sx={{
        padding: 2,
        color: 'white',
        backgroundImage: `url(${backGroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position: 'relative',  // To position the overlay
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Adjust opacity (0.5 is the opacity value)
          zIndex: -1,  // Ensures overlay is behind the content
        }}
      />

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2, color: '#A6CDC6' }}>
        <Typography variant="h3" fontWeight={'bold'} gutterBottom>
          Software Engineer
        </Typography>
        <Typography variant="h6" paragraph>
          As a Software Engineer, you will be responsible for designing, developing, and maintaining scalable and efficient software applications. You’ll collaborate with cross-functional teams to build systems that meet business needs and user requirements.
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Apply Now
        </Button>
      </Box>

      {/* Software Development Practices Section */}
      <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Key Software Development Practices
        </Typography>
        <Typography variant="body1" paragraph>
          As a Software Engineer, you’ll be involved in the following essential development practices:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Software Development Methodologies
                </Typography>
                <Typography variant="body2" paragraph>
                  - Agile (Scrum, Kanban) for iterative and incremental development.
                  <br />
                  - Continuous Integration and Continuous Deployment (CI/CD) for automated testing and deployment.
                  <br />
                  - Test-Driven Development (TDD) to ensure code quality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Version Control & Collaboration
                </Typography>
                <Typography variant="body2" paragraph>
                  - <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Git</a> for version control.
                  <br />
                  - GitHub, GitLab, or Bitbucket for collaboration and code review.
                  <br />
                  - Branching strategies (e.g., GitFlow) to manage features, fixes, and releases.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#2a2a2a', color: '#A6CDC6' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Development Tools & Environments
                </Typography>
                <Typography variant="body2" paragraph>
                  - <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Docker</a> for containerization.
                  <br />
                  - <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Kubernetes</a> for orchestration.
                  <br />
                  - <a href="https://www.jetbrains.com/idea/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>IntelliJ IDEA</a>, <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>VS Code</a> for IDEs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Software Engineering Skills Section */}
      <Box sx={{ marginBottom: 6, backgroundColor: 'rgba(76, 118, 255, 0.13)', padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Key Skills You’ll Apply
        </Typography>
        <Typography variant="body1" paragraph>
          As a Software Engineer, you will utilize a variety of programming languages, tools, and frameworks, including:
        </Typography>
        <ul>
          <li><Typography variant="body1">Proficiency in programming languages such as Java, Python, C++, JavaScript, or Go.</Typography></li>
          <li><Typography variant="body1">Experience working with web frameworks like <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Express.js</a> (Node.js), <a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Spring Boot</a> (Java), or <a href="https://www.djangoproject.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Django</a> (Python).</Typography></li>
          <li><Typography variant="body1">Experience in building scalable APIs, working with RESTful services, and microservices architectures.</Typography></li>
          <li><Typography variant="body1">Knowledge of cloud platforms such as <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>AWS</a>, <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Google Cloud</a>, or <a href="https://azure.microsoft.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Azure</a>.</Typography></li>
          <li><Typography variant="body1">Understanding of databases like <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MySQL</a>, <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>PostgreSQL</a>, or NoSQL databases like <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>MongoDB</a>.</Typography></li>
        </ul>
      </Box>

      {/* Cloud & Deployment Section */}
      <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
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
              <Typography variant="h6" gutterBottom>
                Cloud Infrastructure
              </Typography>
              <Typography variant="body2" paragraph>
                Modern software engineering relies heavily on cloud infrastructure. As a Software Engineer, you will work with cloud services for deploying applications, handling scalability, and managing data storage.
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
              sx={{ objectFit: 'cover', objectPosition: 'top' }}
              component="img"
              height="350"
              image={testingImage}
              alt="Software Testing"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Software Testing & Quality
              </Typography>
              <Typography variant="body2" paragraph>
                Ensuring the quality of the code is essential. As a Software Engineer, you’ll be using tools like <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Jest</a>, <a href="https://www.selenium.dev/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>Selenium</a>, and <a href="https://www.junit.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623' }}>JUnit</a> for unit testing, integration testing, and continuous testing practices.
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
          Explore Software Engineer Opportunities
        </Button>
      </Box>
    </Box>
  );
}

export default SoftwareEngineer;
