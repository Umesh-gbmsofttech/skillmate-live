import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import logo from '../../assets/skillmate.jpg';
import { keyframes } from '@mui/system';
import baseUrl from '../urls/baseUrl';

const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

function TopTrainers({ sectionHeading, student, trainer }) {
        const [isVisible, setIsVisible] = useState(false);
        const [trainers, setTrainers] = useState([]);
        const [students, setStudents] = useState([]);
        const [loading, setLoading] = useState(false);
        const [scrollDirection, setScrollDirection] = useState('down');
        const navigate = useNavigate();
        const token = useSelector((state) => state.auth.token);
        const [error, setError] = useState('');

        // Use MediaQuery to detect screen size
        const isMobileOrTablet = useMediaQuery('(max-width: 900px)'); // 900px is a common threshold for tablets

        useEffect(() => {
                const fetchData = async () => {
                        setLoading(true);
                        try {
                                if (trainer === 'trainer') {
                                        const response = await fetch(`${baseUrl}trainers`, {
                                                method: 'GET',
                                                headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': `Bearer ${token}`,
                                                },
                                        });
                                        const data = await response.json();
                                        setTrainers(data);
                                }
                                if (student) {
                                        const response = await fetch(`${baseUrl}students`, {
                                                method: 'GET',
                                                headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': `Bearer ${token}`,
                                                },
                                        });
                                        const data = await response.json();
                                        setStudents(data);
                                }
                        } catch (error) {
                                setError(`Error fetching data: ${error.message}`);
                        } finally {
                                setLoading(false);
                        }
                };
                fetchData();
        }, [token, trainer, student]);
        // console.log('trainers: top: ', trainers)
        // console.log('students: top: ', students)

        let lastScrollY = window.scrollY;
        useEffect(() => {
                const handleScroll = () => {
                        const section = document.querySelector('.ourTopTrainersCardSection');
                        if (section) {
                                const rect = section.getBoundingClientRect();
                                setIsVisible(rect.top && rect.bottom >= 0);
                        }
                        setScrollDirection(window.scrollY > lastScrollY ? 'down' : 'up');
                        lastScrollY = window.scrollY;
                };

                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
        }, [lastScrollY]);

        const handleCardClick = (person) => {
                navigate('/rating-reviews/page', { state: { person } });
        };

        let content;
        if (loading) {
                content = (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <CircularProgress />
                        </Box>
                );
        } else if (error) {
                content = (
                        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                                {error}
                        </Typography>
                );
        } else {
                content = (
                        <Box sx={{ backgroundColor: '#1A2130', padding: 2 }}>
                                <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 'bold', color: '#A6CDC6', marginBottom: 3, textAlign: 'center' }}
                                >
                                        {sectionHeading}
                                </Typography>
                                <Box
                                        sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                gap: 2,
                                                // Conditionally apply styles based on screen size
                                                flexDirection: 'row',
                                                overflowX: isMobileOrTablet ? 'auto' : 'unset', // Add horizontal scroll for mobile/tablet
                                                paddingBottom: isMobileOrTablet ? 2 : 0, // Some padding to prevent cutting off content
                                                '&::-webkit-scrollbar': {
                                                        height: '8px',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                        background: '#888',
                                                        borderRadius: '10px',
                                                },
                                                '&::-webkit-scrollbar-thumb:hover': {
                                                        background: '#555',
                                                },
                                        }}
                                >
                                        {[...trainers, ...students].map((person, index) => (
                                                <Card
                                                        key={person.id || index}
                                                        sx={{
                                                                maxWidth: 160,
                                                                boxShadow: 3,
                                                                backgroundColor: '#FBF5DD',
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                textAlign: 'center',
                                                                opacity: 0,
                                                                animation: `${fadeInUp} 1s ease ${index * 0.1}s forwards`,
                                                                '&:hover': {
                                                                        transform: 'scale(1.05)',
                                                                        boxShadow: 6,
                                                                },
                                                        }}
                                                        onClick={() => handleCardClick(person)}
                                                >
                                                        <CardMedia
                                                                component="img"
                                                                image={person.image ? `data:image/jpeg;base64,${person.image}` : logo}
                                                                alt={person.name || 'Person'}
                                                                sx={{
                                                                        height: 210,

                                                                        objectFit: 'contain', // Changed from 'cover' to 'contain'
                                                                        borderRadius: 2,
                                                                }}
                                                        />
                                                        <CardContent>
                                                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                                                        {person.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                        {person.details || 'No details available'}
                                                                </Typography>
                                                        </CardContent>
                                                </Card>
                                        ))}
                                </Box>
                        </Box>
                );
        }

        return <>{content}</>;
}

export default TopTrainers;
