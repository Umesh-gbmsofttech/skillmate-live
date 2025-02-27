import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, Avatar, Typography, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { fetchReviews } from '../redux/ratingReviewSlice';
import baseUrl from '../urls/baseUrl';

function TopTrainersAndStudents({ sectionHeading, student, trainer, community = false }) {
        const dispatch = useDispatch();
        const token = useSelector((state) => state.auth.token);
        const { reviews, loading } = useSelector((state) => state.reviews);
        const [data, setData] = useState([]);
        const isMobileOrTablet = useMediaQuery('(max-width: 900px)');

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
        }, [dispatch, token, trainer, student]);

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
        }, [reviews]);

        return (
                <Box sx={{ padding: 1 }}>
                        {data.length > 0 && (
                                <Box Box sx={{ padding: 2, textAlign: 'center' }}>
                                        <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundColor: 'var(--color-p4)', display: 'inline-block', padding: '0 8px', borderRadius: '5px' }}>
                                                {sectionHeading}
                                        </Typography>
                                        {trainer && !community && <Typography sx={{ textAlign: 'center', fontSize: 'var(--font-size-p2)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', padding: '10px 68px 0 68px' }}>
                                                Our Top Trainers
                                                At Skillmate, we take pride in offering expert-led training to help you excel in Java Full-Stack
                                                Development. Our top trainer is a highly experienced IT professional with years of industry
                                                expertise, ensuring you receive the best guidance throughout your learning journey.
                                        </Typography>}
                                        {student && !community && <Typography sx={{ textAlign: 'center', fontSize: 'var(--font-size-p2)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', padding: '10px 68px 0 68px' }}>
                                                At Skillmate, we are committed to not just training but also helping our students secure rewarding
                                                jobs in the IT industry. Our Java Full-Stack Development program has successfully placed
                                                numerous students in top tech companies, proving the effectiveness of our training and placement
                                                support
                                        </Typography>}

                                </Box>
                        )}
                        {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                        <CircularProgress />
                                </Box>
                        ) : (
                                <Box
                                        sx={{
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
                                        }}
                                >
                                        {data.map((person) => {
                                                const { avg, count } = calculateAverageRating(person.id);
                                                return (
                                                        <Card
                                                                key={person.id}
                                                                sx={{
                                                                        width: trainer ? (isMobileOrTablet ? '100%' : 600) : '100%',
                                                                        flexGrow: student ? 1 : 0,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        padding: 2,
                                                                        boxShadow: 2,
                                                                        transition: 'box-shadow 0.3s ease',
                                                                        borderRadius: 3,
                                                                        ":hover": { boxShadow: 5 },
                                                                }}
                                                        >
                                                                <Avatar
                                                                        src={person.image ? `data:image/jpeg;base64,${person.image}` : '/default-avatar.jpg'}
                                                                        alt={person.name}
                                                                        sx={{ width: 100, height: '100%', borderRadius: 2, objectFit: 'contain' }}
                                                                />
                                                                <CardContent>
                                                                        <Typography fontSize={'var(--font-size-p1)'} fontWeight="bold" color="var(--color-p2)" fontFamily={'var(--font-p2)'}>{person.name}</Typography>
                                                                        <Typography fontSize={'var(--font-size-p2)'} fontWeight="bold" color="var(--color-p2)" fontFamily={'var(--font-p2)'}>{person.qualification}</Typography>
                                                                        <Typography fontSize={'var(--font-size-p3)'} color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
                                                                                {person.technologies?.join(', ') || ''}
                                                                        </Typography>
                                                                        {trainer && (
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                                                                        <Rating value={avg} readOnly precision={0.5} />
                                                                                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                                                                                ({count})
                                                                                        </Typography>
                                                                                </Box>
                                                                        )}
                                                                </CardContent>
                                                        </Card>
                                                );
                                        })}
                                </Box>
                        )}
                </Box>
        );
}

export default TopTrainersAndStudents;
