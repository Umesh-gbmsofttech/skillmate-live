import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import backendImg from '../../../assets/technology_stack/backend.png';
import databaseImg from '../../../assets/technology_stack/database.png';
import frontendImg from '../../../assets/technology_stack/frontend.png';
import osImg from '../../../assets/technology_stack/os.jpeg';
import serverImg from '../../../assets/technology_stack/server.jpg';

const technologies = [
    {
        number: 1,
        technologyName: "OS",
        imageUrl: osImg,
        description: "Operating system used for server deployment.",
    },
    {
        number: 2,
        technologyName: "SERVER",
        imageUrl: serverImg,
        description: "Manages client requests and backend logic.",
    },
    {
        number: 3,
        technologyName: "DATABASE",
        imageUrl: databaseImg,
        description: "Stores and retrieves application data efficiently.",
    },
    {
        number: 4,
        technologyName: "BACKEND PROGRAMMING/ LANGUAGE",
        imageUrl: frontendImg,
        description: "Languages used to build business logic and APIs.",
    },
    {
        number: 5,
        technologyName: "FRONTEND FRAMEWORK/ LIBRARY",
        imageUrl: backendImg,
        description: "Tools for creating interactive user interfaces.",
    },
];

const TechCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#fbf5dd95',
    borderRadius: '10px',
    width: '180px',
    height: '250px',
    textAlign: 'center',
    padding: '10px',
    transition: 'box-shadow 0.3s ease',
    position: 'relative',
    marginTop: '20px',
    color: '#16404D',
    
    '&:hover': {
        boxShadow: '0 0 20px #676767',
    },
    [theme.breakpoints.down('sm')]: {
        width: '160px', // Adjust card width on small screens
    },
    [theme.breakpoints.down('xs')]: {
        width: '140px', // Further reduce card width on extra-small screens
    },
}));

const TechImage = styled(CardMedia)(({ theme }) => ({
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '30px',
    alignSelf: 'end',
    justifySelf: 'end',
}));

const TechDescription = styled(Box)(({ theme }) => ({
    display: 'none',
    backgroundColor: 'rgba(229, 229, 229, 0.8)',
    color: '#000',
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px',
    borderRadius: '10px',
    zIndex: 1000,
    fontSize: '1em',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    
}));



const TechnologyStack = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <Box
            sx={{
                padding: '50px 20px',
                background: 'linear-gradient(125deg, #16404D, #1A2130, #fbf5dd67, #1A2130)',
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#FDFFE2',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                }}
            >
                Common Technology Stack Layers
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '20vh',
                    position: 'relative',
                }}
            >
                {technologies.map((technology, index) => (
                    <Box key={technology.number} sx={{ position: 'relative' }}>
                        <TechCard
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' ,justifyContent:'space-between' }}
                        >
                        
                                <Typography
                                    variant="h6"
                                    sx={{
                                        overflow: 'hidden',
                                        fontSize: '1em',
                                        fontWeight: 'bold',
                                        padding: 0,
                                        margin: '0',
                                        color: '#16404D',
                                    }}
                                >
                                    {technology.technologyName}
                                </Typography>
                                <TechImage
                                    component="img"
                                    src={technology.imageUrl}
                                    alt={technology.technologyName}
                                />
                           
                        </TechCard>

                        {/* Hoverable description that appears outside of the card */}
                        <TechDescription
                            sx={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                display: hoveredIndex === index ? 'block' : 'none',
                            }}
                        >
                            <p>{technology.description}</p>
                        </TechDescription>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TechnologyStack;
