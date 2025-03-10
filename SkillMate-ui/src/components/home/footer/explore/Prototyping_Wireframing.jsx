import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';
import techImage from '../../../../assets/footer/techImage.png';
import wireframingImage from '../../../../assets/footer/wireframingImage.png';
import backGroundImage from '../../../../assets/Designer.jpeg';
import { showSuccessToast } from '../../../utility/ToastService';

function Prototyping_Wireframing() {

    const handleStartPrototypingClick = () => {
        showSuccessToast('Opening Prototyping & Wireframing resources...');
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

            <Box sx={ { textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 2 } }>
                <Typography fontSize={ 'var(--font-size-p1)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
                    Prototyping & Wireframing
                </Typography>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } paragraph>
                    Prototyping and wireframing help designers and developers visualize a digital product before building it.
                    Explore the best tools and practices to create effective wireframes and prototypes.
                </Typography>
                {/* <CustomButton text={'Start Prototyping & Wireframing'} marginTop={'1%'} /> */ }
            </Box>

            <Box sx={ { marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 } }>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
                    Prototyping Tools
                </Typography>
                <Grid container spacing={ 4 }>
                    { [ 'Figma', 'Adobe XD', 'InVision' ].map((tool, index) => (
                        <Grid item xs={ 12 } sm={ 4 } key={ index }>
                            <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                                <CardContent>
                                    <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                        { tool }
                                    </Typography>
                                    <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                        { tool } is a widely used prototyping tool for designing interactive user interfaces.
                                        <br />
                                        <a href="#" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Learn More</a>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
            </Box>

            <Box sx={ { marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 } }>
                <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } fontWeight={ 'bold' } gutterBottom>
                    Wireframing Tools
                </Typography>
                <Grid container spacing={ 4 }>
                    { [ 'Balsamiq', 'Sketch', 'Wireframe.cc' ].map((tool, index) => (
                        <Grid item xs={ 12 } sm={ 4 } key={ index }>
                            <Card sx={ { backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' } }>
                                <CardContent>
                                    <Typography fontSize={ 'var(--font-size-p2)' } fontFamily={ 'var(--font-p1)' } gutterBottom>
                                        { tool }
                                    </Typography>
                                    <Typography fontSize={ 'var(--font-size-p3)' } fontFamily={ 'var(--font-p1)' } paragraph>
                                        { tool } is commonly used for designing low-fidelity wireframes.
                                        <br />
                                        <a href="#" target="_blank" rel="noopener noreferrer" style={ { color: '#f5a623' } }>Learn More</a>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
            </Box>

            <Box sx={ { textAlign: 'center', marginTop: 6 } }>
                <CustomButton onClick={ handleStartPrototypingClick } text={ 'Start Prototyping & Wireframing' } size={ 'large' } />
            </Box>
        </Box>
    );
}

export default Prototyping_Wireframing;
