import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';
import designImage from '../../../../assets/footer/designImage.png';
import invisionImage from '../../../../assets/footer/designImage.png';
import { showSuccessToast } from '../../../utility/ToastService';

function CollaborativeDesignTools() {

    const learnMoreCollaborativeWorkflowsClick = () => {
        showSuccessToast('Learn more about Collaborative Workflows');
    };

    const learnMorePrototypingToolsClick = () => {
        showSuccessToast('Learn more about Prototyping Tools');
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
                    Collaborative Design Tools
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                    Collaborative design tools allow teams to work together seamlessly, share ideas, and create user-focused designs. These tools enable real-time feedback, brainstorming, and co-design.
                </Typography>
                {/* <CustomButton text={'Explore Collaborative Tools'} marginTop={'1%'} /> */ }
            </Box>

            {/* Top Collaborative Design Tools Section */ }
            <Box sx={ { marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 } }>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
                    Top Collaborative Design Tools
                </Typography>
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 4 }>
                        <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                            <CardContent>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                    Figma
                                </Typography>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                    A cloud-based tool allowing multiple designers to collaborate in real-time. Great for prototyping and UI design.
                                    <br />
                                    <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 }>
                        <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                            <CardContent>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                    Adobe XD
                                </Typography>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                    A powerful tool for wireframing, prototyping, and UI design with seamless Adobe ecosystem integration.
                                    <br />
                                    <a href="https://www.adobe.com/products/xd.html" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 }>
                        <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                            <CardContent>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                    InVision
                                </Typography>
                                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                    A design collaboration platform for creating interactive prototypes and gathering feedback.
                                    <br />
                                    <a href="https://www.invisionapp.com/" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Learn More</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Cloud & Deployment Section */ }
            <Grid container spacing={ 4 } sx={ { marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' } }>
                <Grid item xs={ 12 } md={ 6 }>
                    <Card sx={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
                        <CardMedia
                            sx={ { objectFit: 'cover', objectPosition: 'top' } }
                            component="img"
                            height="350"
                            image={ designImage }
                            alt="Collaborative Design"
                        />
                        <CardContent>
                            <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                Collaborative Workflows
                            </Typography>
                            <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                Enhance collaboration with cloud-based tools that enable real-time feedback, design versioning, and seamless teamwork.
                            </Typography>
                            <CustomButton onClick={ learnMoreCollaborativeWorkflowsClick } text={ 'Learn More' } />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <Card sx={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
                        <CardMedia
                            sx={ { objectFit: 'cover', objectPosition: 'top' } }
                            component="img"
                            height="350"
                            image={ invisionImage }
                            alt="Prototyping Tools"
                        />
                        <CardContent>
                            <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                Prototyping & Testing
                            </Typography>
                            <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                Streamline your design process with interactive prototyping tools that help you iterate quickly and test designs efficiently.
                            </Typography>
                            <CustomButton onClick={ learnMorePrototypingToolsClick } text={ 'Learn More' } />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CollaborativeDesignTools;
