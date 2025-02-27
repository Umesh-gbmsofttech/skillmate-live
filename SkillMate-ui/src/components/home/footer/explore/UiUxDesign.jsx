import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import designImage from '../../../../assets/footer/7.png';
import teckImage from '../../../../assets/footer/techImage.png';
import CustomButton from '../../../utility/CustomButton';

function UiUxDesign() {
    return (
        <Box
            sx={{
                padding: 2,
                color: 'white',
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
                    zIndex: -1,
                }}
            />

            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p1)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    UI/UX Designer
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    As a UI/UX Designer, you will craft intuitive, visually appealing user interfaces that enhance user experience and engagement.
                </Typography>
                <CustomButton text={'Apply Now'} marginTop={'1%'} />
            </Box>

            {/* UI/UX Design Tools Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Key Design Tools & Practices
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    UI/UX Design Software
                                </Typography>
                                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - Figma, Sketch, Adobe XD for wireframing and prototyping.
                                    <br />
                                    - InVision and Axure for user testing and interaction design.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Design Principles & Prototyping
                                </Typography>
                                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - Material Design, Apple HIG for consistent UI.
                                    <br />
                                    - Usability Testing and A/B Testing for enhancing user experience.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Visual & Interactive Design */}
            <Grid container spacing={4} sx={{ marginBottom: 6, height: '100%', display: 'flex', alignItems: 'stretch' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia component="img" height="350" image={designImage} alt="Visual Design" />
                        <CardContent>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Visual & Interactive Design
                            </Typography>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Creating pixel-perfect designs and animations for an engaging user experience.
                            </Typography>
                            <CustomButton text={'Learn More'} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia component="img" height="350" image={teckImage} alt="Prototyping" />
                        <CardContent>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                Prototyping & User Testing
                            </Typography>
                            <Typography color='var(--color-p2)' fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                                Designing prototypes, conducting usability tests, and refining UI for the best user experience.
                            </Typography>
                            <CustomButton text={'Learn More'} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <CustomButton text={'Explore UI/UX Design Opportunities'} />
            </Box>
        </Box>
    );
}

export default UiUxDesign;