import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../redux/ratingReviewSlice';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Avatar, CircularProgress } from '@mui/material';
import trainerImage from '../../assets/skillmate.jpg';

function ReviewsSection({ course, trainer }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  console.log('raing-reviews-section: ', reviews)

  useEffect(() => {
    dispatch(fetchReviews({ courseId: course?.id, trainerId: trainer?.id, token }));
  }, [dispatch, course, trainer, token]);

  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#1A2130', color: 'white' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', color: '#A6CDC6' }}>
        {course ? 'Course Reviews' : trainer ? 'Trainer Reviews' : 'Reviews'}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Typography sx={{ color: 'red', textAlign: 'center' }}>Error: {error}</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            paddingBottom: 2,
            paddingTop: 2,
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'thin',
          }}
        >
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 280,
                  backgroundColor: '#FBF5DD',
                  padding: 1,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  scrollSnapAlign: 'start',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      marginRight: 2,
                    }}
                  >
                    <Avatar src={`data:image/jpeg;base64,${review.student?.image}` || trainerImage} alt="student" sx={{ width: 60, height: 60 }} />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                      {review.student?.name || 'Anonymous Student'}
                    </Typography>
                  </CardContent>
                </Box>

                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, padding: 0 }}>
                    <Rating value={review.rating || 0} readOnly precision={0.5} sx={{ marginRight: 1 }} />
                    <Typography variant="body2">{`${review.rating || 0} / 5`}</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {review.feedback || 'No feedback provided'}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
              No reviews available
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ReviewsSection;
