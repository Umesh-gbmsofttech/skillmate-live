import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';
import designImage from '../../../../assets/footer/designImage.png';
import testingImage from '../../../../assets/footer/testingImage.png';
import { showSuccessToast } from '../../../utility/ToastService';

function FrontendDeveloper() {

    const handleApplyNowClick = () => {
        showSuccessToast('Applying for Frontend Developer position');
    };
    const handleLearnMoreUi_UxClick = () => {
        showSuccessToast('Learn more about ui-ux design principles');
    };
    const handleLearnMoreFrontendTestingClick = () => {
        showSuccessToast('Learn more about testing and performance in frontend development');
    };
    const handleExploreFrontendDeveloperOpportunitiesClick = () => {
        showSuccessToast('Exploring Frontend Developer opportunities');
    };

    return (
        <Box
            sx={ {
                padding: 2,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                position: 'relative',
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
                    zIndex: -1,
                } }
            />

            {/* Hero Section */ }
            <Box sx={ { textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 2 } }>
                <Typography fontSize={ 'var(--font-size-p1)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
                    Frontend Developer
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                    As a Frontend Developer, you will be responsible for designing and implementing engaging user interfaces. You will work with modern frameworks to build responsive and accessible web applications.
                </Typography>
                <CustomButton onClick={ handleApplyNowClick } text={ 'Apply Now' } marginTop={ '1%' } />
            </Box>

            {/* Key Technologies Section */ }
            <Box sx={ { marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 } }>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
                    Key Frontend Technologies
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } paragraph>
                    As a Frontend Developer, you’ll utilize the following essential technologies:
                </Typography>
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                            <CardContent>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                    UI Frameworks & Libraries
                                </Typography>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                    - React.js, Angular, Vue.js for frontend development.
                                    <br />
                                    - Tailwind CSS, Bootstrap, and Material-UI for styling.
                                    <br />
                                    - Next.js for server-side rendering and SEO optimization.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                            <CardContent>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                    Development Tools
                                </Typography>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                    - VS Code, WebStorm, and Chrome DevTools for development.
                                    <br />
                                    - Git, GitHub, and Bitbucket for version control.
                                    <br />
                                    - Figma and Adobe XD for UI/UX design collaboration.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* UX & Testing Section */ }
            <Grid container spacing={ 4 } sx={ { marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' } }>
                <Grid item xs={ 12 } md={ 6 }>
                    <Card sx={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
                        <CardMedia
                            sx={ { objectFit: 'cover', objectPosition: 'top' } }
                            component='img'
                            height='350'
                            image={ designImage }
                            alt='UI/UX Design'
                        />
                        <CardContent>
                            <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                UI/UX Design Principles
                            </Typography>
                            <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                Understanding user needs and design principles is crucial for crafting engaging experiences. You will work closely with designers to bring creative visions to life.
                            </Typography>
                            <CustomButton onClick={ handleLearnMoreUi_UxClick } text={ 'Learn More' } />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <Card sx={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
                        <CardMedia
                            sx={ { objectFit: 'cover', objectPosition: 'top' } }
                            component='img'
                            height='350'
                            image={ testingImage }
                            alt='Frontend Testing'
                        />
                        <CardContent>
                            <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                Frontend Testing & Performance
                            </Typography>
                            <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                Ensure code quality with Jest, Cypress, and Lighthouse audits to optimize performance, accessibility, and responsiveness.
                            </Typography>
                            <CustomButton onClick={ handleLearnMoreFrontendTestingClick } text={ 'Learn More' } />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Final Call to Action */ }
            <Box sx={ { textAlign: 'center', marginTop: 6 } }>
                <CustomButton onClick={ handleExploreFrontendDeveloperOpportunitiesClick } text={ 'Explore Frontend Developer Opportunities' } />
            </Box>
        </Box>
    );
}

export default FrontendDeveloper;