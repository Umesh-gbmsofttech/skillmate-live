import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import backendImg from '../../../assets/technology_stack/backend.png';
import databaseImg from '../../../assets/technology_stack/database.png';
import frontendImg from '../../../assets/technology_stack/frontend.png';
import osImg from '../../../assets/technology_stack/os.png';
import serverImg from '../../../assets/technology_stack/server.png';
import { showSuccessToast } from '../../utility/ToastService';
import { Margin } from '@mui/icons-material';

const technologies = [
    { technologyName: "OS", imageUrl: osImg, description: "Operating system used for server deployment." },
    { technologyName: "SERVER", imageUrl: serverImg, description: "Manages client requests and backend logic." },
    { technologyName: "DATABASE", imageUrl: databaseImg, description: "Stores and retrieves application data efficiently." },
    { technologyName: "BACKEND", imageUrl: backendImg, description: "Languages used to build business logic and APIs." },
    { technologyName: "FRONTEND", imageUrl: frontendImg, description: "Tools for creating interactive user interfaces." },
];

const TechContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    overflow: 'hidden',
    width: '100%',
});

const TechCard = styled(Card)(({ isHovered }) => ({
    borderRadius: '4px',
    height: '250px',
    flex: isHovered ? '3' : '1',
    transition: 'flex 0.5s ease',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
}));

const TechImage = styled(CardMedia)({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
});

const Overlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    opacity: 0,
    transition: 'opacity 0.5s ease',
});

const TechText = styled(Typography)({
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '8px',
});

const TechDescription = styled(Typography)({
    fontSize: '0.9em',
    textAlign: 'center',
    marginBottom: '8px',
    fontFamily: 'var(--font-p2)',
});

const LearnMore = styled(Typography)({
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 'bold',
});

const TechnologyStack = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <Box sx={{
            padding: '50px 20px',
            background: 'linear-gradient(140deg,var(--color-p1), var(--color-p3), var(--color-p4))',
            // minHeight: '100vh',
        }}>
            {/* <Typography variant="h3" sx={{ textAlign: 'center', color: '#FDFFE2', textShadow: '0 0 5px rgba(0, 0, 0, 0.2)', marginBottom: 10, fontFamily: 'var(--font-p2)' }}>
                Common Technology Stack Layers used in Development
            </Typography> */}
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundColor: 'var(--color-p4)', display: 'inline-block', padding: '0 8px', borderRadius: '5px' }}>Common	Technology	Stack	Layer</Typography>
                <Typography sx={{ marginBottom: 10, textAlign: 'center', fontSize: 'var(--font-size-p2)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', padding: '10px 68px 0 68px' }}>
                    At Skillmate, our Java Full-Stack Development program is designed to equip you with a
                    comprehensive technology stack used by top IT companies. By mastering these
                    technologies, you’ll be prepared to build scalable, high-performance web applications
                    and advance your career as a full-stack developer.
                </Typography>
            </Box>

            <TechContainer>
                {technologies.map((technology, index) => (
                    <TechCard
                        key={index}
                        isHovered={hoveredIndex === index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <TechImage component="img" src={technology.imageUrl} alt={technology.technologyName} />
                        <Overlay style={{ opacity: hoveredIndex === index ? 1 : 0 }}>
                            <TechText>{technology.technologyName}</TechText>
                            <TechDescription>{technology.description}</TechDescription>
                            <LearnMore onClick={() => showSuccessToast(`Read more about ${technology.technologyName}`)}>
                                Learn More
                            </LearnMore>
                        </Overlay>
                    </TechCard>
                ))}
            </TechContainer>
        </Box>
    );
};

export default TechnologyStack;
