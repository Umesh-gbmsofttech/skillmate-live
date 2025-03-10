import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import cloudImage from '../../../../assets/footer/cloudImage.png';
import testingImage from '../../../../assets/footer/testingImage.png';
// import testingImage from '../../../../assets/testingImage.jpg';  // Replace with relevant image
import CustomButton from '../../../utility/CustomButton';
import { showSuccessToast } from '../../../utility/ToastService';

function SoftwareEngineer() {

  const handleApplyNowClick = () => {
    showSuccessToast('Applying for Software Engineer position');
  };
  const handleCloudLearnMore = () => {
    showSuccessToast('Learn more about cloud infrastructure');
  };
  const handleSoftwareTestinLearnMoreClick = () => {
    showSuccessToast('Learn more about software testing and quality');
  };
  const handleExploreSoftwareEngineerOpportunitiesClick = () => {
    showSuccessToast('Explore Software Engineer Opportunities');
  };
  return (
    <Box
      sx={ {
        padding: 2,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position: 'relative',  // To position the overlay
        zIndex: 1,
      } }
    >
      {/* Overlay */ }
      <Box
        sx={ {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,  // Ensures overlay is behind the content
        } }
      />

      {/* Hero Section */ }
      <Box sx={ { textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 2 } }>
        <Typography fontSize={ 'var(--font-size-p1)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
          Software Engineer
        </Typography>
        <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
          As a Software Engineer, you will be responsible for designing, developing, and maintaining scalable and efficient software applications. You’ll collaborate with cross-functional teams to build systems that meet business needs and user requirements.
        </Typography>
        <CustomButton onClick={ handleApplyNowClick } text={ 'Apply Now' } marginTop={ '1%' } />
      </Box>

      {/* Software Development Practices Section */ }
      <Box sx={ { marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 } }>
        <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
          Key Software Development Practices
        </Typography>
        <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } paragraph>
          As a Software Engineer, you’ll be involved in the following essential development practices:
        </Typography>
        <Grid container spacing={ 4 }>
          <Grid item xs={ 12 } sm={ 4 }>
            <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
              <CardContent>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                  Software Development Methodologies
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                  - Agile (Scrum, Kanban) for iterative and incremental development.
                  <br />
                  - Continuous Integration and Continuous Deployment (CI/CD) for automated testing and deployment.
                  <br />
                  - Test-Driven Development (TDD) to ensure code quality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
              <CardContent>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                  Version Control & Collaboration
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                  - <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Git</a> for version control.
                  <br />
                  - GitHub, GitLab, or Bitbucket for collaboration and code review.
                  <br />
                  - Branching strategies (e.g., GitFlow) to manage features, fixes, and releases.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
              <CardContent>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                  Development Tools & Environments
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                  - <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Docker</a> for containerization.
                  <br />
                  - <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Kubernetes</a> for orchestration.
                  <br />
                  - <a href="https://www.jetbrains.com/idea/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>IntelliJ IDEA</a>, <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>VS Code</a> for IDEs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Software Engineering Skills Section */ }
      <Box sx={ { marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 } }>
        <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
          Key Skills You’ll Apply
        </Typography>
        <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } paragraph>
          As a Software Engineer, you will utilize a variety of programming languages, tools, and frameworks, including:
        </Typography>
        <ul>
          <li><Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' }>Proficiency in programming languages such as Java, Python, C++, JavaScript, or Go.</Typography></li>
          <li><Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' }>Experience working with web frameworks like <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Express.js</a> (Node.js), <a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Spring Boot</a> (Java), or <a href="https://www.djangoproject.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Django</a> (Python).</Typography></li>
          <li><Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' }>Experience in building scalable APIs, working with RESTful services, and microservices architectures.</Typography></li>
          <li><Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' }>Knowledge of cloud platforms such as <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>AWS</a>, <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Google Cloud</a>, or <a href="https://azure.microsoft.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Azure</a>.</Typography></li>
          <li><Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' }>Understanding of databases like <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>MySQL</a>, <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>PostgreSQL</a>, or NoSQL databases like <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>MongoDB</a>.</Typography></li>
        </ul>
      </Box>

      {/* Cloud & Deployment Section */ }
      <Grid container spacing={ 4 } sx={ { marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' } }>
        <Grid item xs={ 12 } md={ 6 }>
          <Card sx={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
            <CardMedia
              sx={ { objectFit: 'cover', objectPosition: 'top' } }
              component="img"
              height="350"
              image={ cloudImage }
              alt="Cloud Infrastructure"
            />
            <CardContent>
              <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                Cloud Infrastructure
              </Typography>
              <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                Modern software engineering relies heavily on cloud infrastructure. As a Software Engineer, you will work with cloud services for deploying applications, handling scalability, and managing data storage.
              </Typography>
              <CustomButton onClick={ handleCloudLearnMore } text={ 'Learn More' } />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 12 } md={ 6 }>
          <Card sx={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
            <CardMedia
              sx={ { objectFit: 'cover', objectPosition: 'top' } }
              component="img"
              height="350"
              image={ testingImage }
              alt="Software Testing"
            />
            <CardContent>
              <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                Software Testing & Quality
              </Typography>
              <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                Ensuring the quality of the code is essential. As a Software Engineer, you’ll be using tools like <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Jest</a>, <a href="https://www.selenium.dev/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Selenium</a>, and <a href="https://www.junit.org/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>JUnit</a> for unit testing, integration testing, and continuous testing practices.
              </Typography>
              <CustomButton onClick={ handleSoftwareTestinLearnMoreClick } text={ 'Learn More' } />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Final Call to Action */ }
      <Box sx={ { textAlign: 'center', marginTop: 6 } }>
        <CustomButton onClick={ handleExploreSoftwareEngineerOpportunitiesClick } text={ 'Explore Software Engineer Opportunities' } />
      </Box>
    </Box>
  );
}

export default SoftwareEngineer;
