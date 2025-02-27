import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import systemDesignImage from '../../../../assets/footer/designImage.png';
import architectureImage from '../../../../assets/footer/architectureImage.png';
import CustomButton from '../../../utility/CustomButton';

function DesignSystems() {
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
                    Design Systems
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    A design system provides a unified set of design standards, patterns, and principles that help teams build consistent and cohesive digital products. Whether for large-scale web applications or mobile platforms, system design encompasses both front-end and back-end components.
                </Typography>
                <CustomButton text={'Apply Now'} marginTop={'1%'} />
            </Box>

            {/* Key Skills & Tools for System Design Section */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Key Skills and Tools
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Architecture Design
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - Scalable architecture principles and patterns.
                                    <br />- Microservices and monolithic design approaches.
                                    <br />- API-driven and event-driven architectures.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    Design Principles & Patterns
                                </Typography>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                                    - Best practices in UI/UX and system scalability.
                                    <br />- Data modeling and database structuring.
                                    <br />- Performance optimization and fault tolerance.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <CustomButton text={'Explore Design Systems Opportunities'} />
            </Box>
        </Box>
    );
}

export default DesignSystems;