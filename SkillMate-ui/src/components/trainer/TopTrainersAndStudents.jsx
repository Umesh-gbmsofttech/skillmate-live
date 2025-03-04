import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, Avatar, Typography, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { fetchReviews } from '../redux/ratingReviewSlice';
import baseUrl from '../urls/baseUrl';
import { useNavigate } from 'react-router-dom';
import { clearCourses } from '../redux/trainerCoursesSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function TopTrainersAndStudents({ sectionHeading, student, trainer, community = false }) {
        const dispatch = useDispatch();
        const token = useSelector((state) => state.auth.token);
        const { reviews, loading } = useSelector((state) => state.reviews);
        const [ data, setData ] = useState([]);
        const isMobileOrTablet = useMediaQuery('(max-width: 900px)');
        const navigate = useNavigate();

        useEffect(() => {
                const fetchData = async () => {
                        let url = trainer ? `${baseUrl}trainers` : student ? `${baseUrl}students` : null;
                        if (!url) return;

                        try {
                                const response = await fetch(url, {
                                        method: 'GET',
                                        headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`,
                                        },
                                });
                                const result = await response.json();
                                setData(result);

                                result.forEach((person) => {
                                        const hasReviews = reviews.some((review) => review.trainer?.id === person.id);
                                        if (!hasReviews) {
                                                dispatch(fetchReviews({ trainerId: person.id, token }));
                                        }
                                });
                        } catch (error) {
                                console.error('Error fetching data:', error);
                        }
                };

                fetchData();
        }, [ dispatch, token, trainer, student ]);

        const calculateAverageRating = useMemo(() => {
                const ratingMap = new Map();

                reviews.forEach((review) => {
                        const trainerId = review.trainer?.id;
                        if (!trainerId) return;

                        if (!ratingMap.has(trainerId)) {
                                ratingMap.set(trainerId, { sum: 0, count: 0 });
                        }
                        ratingMap.get(trainerId).sum += review.rating;
                        ratingMap.get(trainerId).count += 1;
                });

                return (trainerId) => {
                        const data = ratingMap.get(trainerId);
                        return data ? { avg: data.sum / data.count, count: data.count } : { avg: 0, count: 0 };
                };
        }, [ reviews ]);

        return (
                <Box sx={ { padding: 1 } }>
                        { data.length > 0 && (
                                <Box sx={ { padding: 2, textAlign: 'center' } }>
                                        <Typography sx={ { textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: { xs: 'var(--font-size-p2)', md: 'var(--font-size-p1)' }, fontFamily: 'var(--font-p1)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: { xs: 'block', md: 'inline-block' }, border: "none", padding: { xs: '0 20px', md: '0px' } } }>
                                                { sectionHeading }
                                        </Typography>
                                        { trainer && !community && <Typography sx={ { textAlign: 'center', fontSize: { xs: 'var(--font-size-p3)', md: 'var(--font-size-p2)' } } }>

                                                Our Top Trainers
                                                At Skillmate, we take pride in offering expert-led training to help you excel in Java Full-Stack
                                                Development. Our top trainer is a highly experienced IT professional with years of industry
                                                expertise, ensuring you receive the best guidance throughout your learning journey.
                                        </Typography> }
                                        { student && !community && <Typography sx={ { textAlign: 'center', fontSize: { xs: 'var(--font-size-p3)', md: 'var(--font-size-p2)' } } }>

                                                At Skillmate, we are committed to not just training but also helping our students secure rewarding
                                                jobs in the IT industry. Our Java Full-Stack Development program has successfully placed
                                                numerous students in top tech companies, proving the effectiveness of our training and placement
                                                support
                                        </Typography> }

                                </Box>
                        ) }
                        { loading ? (
                                <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' } }>
                                        <CircularProgress />
                                </Box>
                        ) : (
                                <Box
                                        sx={ {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                gap: 2,
                                                flexDirection: isMobileOrTablet ? 'column' : 'row',
                                                paddingBottom: 2,
                                                ...(student && {
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                                        gap: 2,
                                                }),
                                        } }
                                >
                                        { data.map((person, index) => {
                                                const { avg, count } = calculateAverageRating(person.id);
                                                const isLastOddTrainerCard = trainer && (index === data.length - 1) && (data.length % 2 !== 0);
                                                return (
                                                        <Box
                                                                key={ person.id }
                                                                sx={ {
                                                                        width: isLastOddTrainerCard ? '98%' : (trainer ? (isMobileOrTablet ? '100%' : 600) : '100%'),
                                                                        flexGrow: student ? 1 : 0,
                                                                        display: 'flex',
                                                                        alignItems: 'end',
                                                                        padding: 1,
                                                                        transition: 'box-shadow 0.3s ease',
                                                                        borderRadius: 1,
                                                                        ":hover": {
                                                                                boxShadow: 3, ...(trainer && { cursor: 'pointer' })
                                                                        },
                                                                }
                                                                }
                                                                onClick={ () => {
                                                                        if (trainer) {
                                                                                dispatch(clearCourses());
                                                                                navigate('/reviews-section/write', {
                                                                                        state: {
                                                                                                trainer: person,
                                                                                                rating: { avg, count },
                                                                                        },
                                                                                });
                                                                        }
                                                                } }
                                                        >
                                                                <Avatar
                                                                        src={ person.image ? `data:image/jpeg;base64,${person.image}` : '/default-avatar.jpg' }
                                                                        alt={ person.name }
                                                                        sx={ { width: 100, height: '100%', borderRadius: 0, objectFit: 'contain' } }
                                                                />
                                                                <CardContent sx={ { p: '0 0 0 10px' } }>
                                                                        <Typography fontSize={ 'var(--font-size-p2)' } fontWeight="500" color="var(--color-p2)" fontFamily={ 'var(--font-p2)' } lineHeight={ 1 } mb={ 1 }>
                                                                                { person.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }
                                                                        </Typography>
                                                                        <Typography fontSize={ 'var(--font-size-p3)' } fontWeight="400" color="var(--color-p2)" fontFamily={ 'var(--font-p1)' }>
                                                                                -{ person.qualification?.charAt(0).toUpperCase() + person.qualification?.slice(1) }
                                                                        </Typography>
                                                                        { trainer && (
                                                                                <>
                                                                                        <Typography fontSize={ 'var(--font-size-p3)' } color="var(--color-p2)" fontFamily={ 'var(--font-p2)' }>
                                                                                                { person.technologies?.join(', ') || '' }
                                                                                        </Typography>
                                                                                        <Box sx={ { display: 'flex', alignItems: 'center', marginTop: 1 } }>
                                                                                                <Rating value={ avg } readOnly precision={ 0.5 } />
                                                                                                <Typography variant="body2" sx={ { marginLeft: 1 } }>
                                                                                                        ({ count })
                                                                                                </Typography>
                                                                                        </Box>
                                                                                </>
                                                                        ) }
                                                                </CardContent>
                                                        </Box>
                                                );
                                        }) }
                                </Box>
                        ) }
                </Box>
        );
}

export default TopTrainersAndStudents;
