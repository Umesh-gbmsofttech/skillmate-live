import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from '../../../utility/CustomButton';

function About() {
    return (
        <Box
            sx={{
                padding: 4,
                color: 'white',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: 'var(--color-p4)', padding: 4 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p1)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Unlock Your Path to IT Success with Skillmate!
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} paragraph>
                    Skillmate provides expert IT training with hands-on projects guided by seasoned industry professionals. Our curriculum is designed to empower you with the skills that matter most in today's tech-driven world.
                </Typography>
                <CustomButton text={'Explore Our Courses'} marginTop={'1%'} />
            </Box>

            {/* About Our Mission */}
            <Box sx={{ marginBottom: 6, backgroundColor: 'var(--color-p4)', padding: 4 }}>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p1)'} fontWeight={'bold'} gutterBottom>
                    Our Mission
                </Typography>
                <Typography color='var(--color-p2)' fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p1)'} paragraph>
                    At Skillmate, we strive to bridge the gap between education and employment. Our programs are tailored to equip learners with industry-ready skills, hands-on experience, and professional mentorship to help them secure high-paying jobs in tech.
                </Typography>
            </Box>
        </Box>
    );
}

export default About;
