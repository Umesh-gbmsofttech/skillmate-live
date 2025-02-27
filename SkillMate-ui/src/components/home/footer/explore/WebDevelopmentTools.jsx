import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';

function WebDevelopmentTools() {
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
                    Web Development Tools
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    Web development involves a variety of tools that help in creating scalable, responsive, and dynamic websites. These tools range from front-end technologies for UI to back-end frameworks for server logic.
                </Typography>
                <CustomButton text={'Explore Tools'} marginTop={'1%'} />
            </Box>

            {/* Frontend Development Tools */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 2 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Front-End Development Tools
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    These tools help create dynamic user interfaces:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    UI Libraries & Frameworks
                                </Typography>
                                <Typography paragraph>
                                    - React.js, Vue.js, Angular, Bootstrap, Tailwind CSS
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: 'var(--color-p1)', color: 'var(--color-p2)' }}>
                            <CardContent>
                                <Typography fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} gutterBottom>
                                    JavaScript & CSS Tools
                                </Typography>
                                <Typography paragraph>
                                    - Webpack, Babel, SASS, PostCSS, npm, Yarn
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Final Call to Action */}
            <Box sx={{ textAlign: 'center', marginTop: 6 }}>
                <CustomButton text={'Discover More Web Tools'} />
            </Box>
        </Box>
    );
}

export default WebDevelopmentTools;