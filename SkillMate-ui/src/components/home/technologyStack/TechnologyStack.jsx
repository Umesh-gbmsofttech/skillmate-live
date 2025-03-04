import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import backendImg from '../../../assets/technology_stack/backend.png';
import databaseImg from '../../../assets/technology_stack/database.png';
import frontendImg from '../../../assets/technology_stack/frontend.png';
import osImg from '../../../assets/technology_stack/os.png';
import serverImg from '../../../assets/technology_stack/server.png';
import { showSuccessToast } from '../../utility/ToastService';

const technologies = [
    { technologyName: "OS", imageUrl: osImg, description: "Operating system used for server deployment." },
    { technologyName: "SERVER", imageUrl: serverImg, description: "Manages client requests and backend logic." },
    { technologyName: "DATABASE", imageUrl: databaseImg, description: "Stores and retrieves application data efficiently." },
    { technologyName: "BACKEND", imageUrl: backendImg, description: "Languages used to build business logic and APIs." },
    { technologyName: "FRONTEND", imageUrl: frontendImg, description: "Tools for creating interactive user interfaces." },
];

const TechnologyStack = () => {
    const [ hoveredIndex, setHoveredIndex ] = useState(null);

    return (
        <Box sx={ { padding: 2 } }>
            <Box sx={ { padding: 2, textAlign: 'center' } }>
                <Typography sx={ {
                    textAlign: 'center',
                    marginTop: 3,
                    fontWeight: 'bold',
                    fontSize: { xs: 'var(--font-size-p2)', md: 'var(--font-size-p1)' },
                    fontFamily: 'var(--font-p1)',
                    backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))',
                    display: { xs: 'block', md: 'inline-block' },
                    border: "none",
                    padding: { xs: '0 20px', md: '0px' }
                } }>
                    Common Technology Stack Layers Used In Development
                </Typography>
                <Typography sx={ {
                    textAlign: 'center',
                    fontSize: { xs: 'var(--font-size-p3)', md: 'var(--font-size-p2)' },
                } }>
                    At Skillmate, our Java Full-Stack Development program is designed to equip you with a
                    comprehensive technology stack used by top IT companies. By mastering these
                    technologies, you’ll be prepared to build scalable, high-performance web applications
                    and advance your career as a full-stack developer.
                </Typography>
            </Box>

            <Box sx={ {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                overflow: 'hidden',
                width: '100%',
            } }>
                { technologies.map((technology, index) => (
                    <Card
                        key={ index }
                        sx={ {
                            borderRadius: '4px',
                            height: '250px',
                            flex: hoveredIndex === index ? '3' : '1',
                            transition: 'flex 0.5s ease',
                            position: 'relative',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        } }
                        onMouseEnter={ () => setHoveredIndex(index) }
                        onMouseLeave={ () => setHoveredIndex(null) }
                    >
                        <CardMedia
                            component="img"
                            src={ technology.imageUrl }
                            alt={ technology.technologyName }
                            sx={ {
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            } }
                        />
                        <Box sx={ {
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
                            color: 'var(--color-p1)',
                            opacity: hoveredIndex === index ? 1 : 0,
                            transition: 'opacity 0.5s ease',
                        } }>
                            <Typography sx={ {
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                            } }>
                                { technology.technologyName }
                            </Typography>
                            <Typography sx={ {
                                fontSize: '0.9em',
                                textAlign: 'center',
                                marginBottom: '8px',
                                fontFamily: 'var(--font-p2)',
                            } }>
                                { technology.description }
                            </Typography>
                            <Typography
                                sx={ {
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontWeight: 'bold',
                                } }
                                onClick={ () => showSuccessToast(`Read more about ${technology.technologyName}`) }
                            >
                                Learn More
                            </Typography>
                        </Box>
                    </Card>
                )) }
            </Box>
        </Box>
    );
};

export default TechnologyStack;
