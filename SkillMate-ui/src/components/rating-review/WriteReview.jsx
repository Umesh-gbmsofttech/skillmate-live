import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoursesAndBatches } from '../redux/myCoursesSlice';
import { fetchTrainerCourses } from '../redux/trainerCoursesSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactRating from 'react-rating';
import { Box, Card, CardContent, Avatar, Typography, TextField, CardMedia, Rating } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CustomButton from '../utility/CustomButton';
import ReviewsSection from './ReviewsSection';
import altImage from '../../assets/skillmate.jpg';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl';

function WriteReview() {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const token = useSelector((state) => state.auth.token);
    const trainer = location.state?.trainer;
    const initialRating = location.state?.rating || 0;

    const myCourses = useSelector((state) => state.myCourses.courses);
    const trainerCourses = useSelector((state) => state.trainerCourses.courses);

    useEffect(() => {
        setRating(initialRating); // Set the initial rating if available
    }, [initialRating]);

    useEffect(() => {
        if (userData?.id) {
            dispatch(fetchCoursesAndBatches(userData.id));
        }
    }, [dispatch, userData]);

    useEffect(() => {
        if (trainer?.id) {
            dispatch(fetchTrainerCourses(trainer.id));
        }
    }, [dispatch, trainer]);

    const myCourseIds = myCourses.map(course => course.id);
    const trainerCourseIds = trainerCourses.map(tc => tc.course?.id);
    console.log(trainerCourseIds, 'trainerCourseIds');
    const hasMatchingCourse = trainer && myCourseIds.some(courseId => trainerCourseIds.includes(courseId));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            showWarningToast('Please write a review before submitting.');
            return;
        }
        setIsSubmitting(true);

        const payload = {
            rating,
            feedback,
            student: { id: userData.id },
            trainer: { id: trainer.id }
        };

        try {
            const response = await fetch(`${baseUrl}ratings-reviews/trainer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showSuccessToast('Thanks for your feedback!');
                navigate('/rating-reviews/page');
            } else {
                showErrorToast('Failed to submit review.');
            }
        } catch (error) {
            showErrorToast('Error submitting review.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            {!showReviewForm ? (
                <>
                    <Card sx={{ width: 440, p: 1, borderRadius: 2, backgroundColor: 'var(--color-p1)', boxShadow: 3, mb: 2 }}>
                        <Avatar
                            sx={{ width: '100%', height: 250, borderRadius: 2, objectFit: 'contain', objectPosition: 'top' }}
                            src={trainer?.image ? `data:image/png;base64,${trainer.image}` : altImage}
                            alt="Trainer Image"
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>{trainer?.name}</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Experience: {trainer?.experience}</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Expertise: {trainer?.technologies}</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                <Rating value={initialRating.avg} readOnly precision={0.5} />                                                                                                                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    ({initialRating.count})
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    {hasMatchingCourse && (
                        <CustomButton text="Write a Review" onClick={() => setShowReviewForm(true)} />
                    )}
                    <ReviewsSection trainer={trainer} />
                </>
            ) : (
                <Card sx={{ width: 440, p: 2, borderRadius: 2, backgroundColor: 'var(--color-p1)', boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        image={trainer?.image ? `data:image/png;base64,${trainer.image}` : altImage}
                        alt="Profile"
                        sx={{ height: 400, borderRadius: 2, objectFit: 'cover', objectPosition: "top" }}
                    />
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold">{trainer.name}</Typography>
                        <Box mt={2}>
                            <ReactRating
                                initialRating={rating}
                                onChange={setRating}
                                emptySymbol={<StarBorderIcon fontSize="large" sx={{ color: 'grey' }} />}
                                fullSymbol={<StarIcon fontSize="large" sx={{ color: 'gold' }} />}
                                fractions={2}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your review..."
                            variant="outlined"
                            sx={{ mt: 2, backgroundColor: 'white' }}
                        />
                        <CustomButton text={isSubmitting ? 'Submitting...' : 'Submit'} onClick={handleSubmit} disabled={isSubmitting} width={'100%'} marginTop={2} />
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default WriteReview;