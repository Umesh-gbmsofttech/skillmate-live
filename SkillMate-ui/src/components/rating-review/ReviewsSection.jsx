import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../redux/ratingReviewSlice';
import { Card, Avatar, Typography, Rating, Box, CircularProgress } from '@mui/material';
import trainerImage from '../../assets/skillmate.jpg';

function ReviewsSection({ course, trainer }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews({ courseId: course?.id, trainerId: trainer?.id, token }));
  }, [dispatch, course, trainer, token]);

  // Filter reviews to show only the relevant ones
  const filteredReviews = useMemo(() => {
    if (course?.id) {
      return reviews.filter((review) => review.course?.id === course.id);
    }
    if (trainer?.id) {
      return reviews.filter((review) => review.trainer?.id === trainer.id);
    }
    return reviews;
  }, [reviews, course, trainer]);

  console.log(filteredReviews)
  return (
    <>
      {filteredReviews.length > 0 ? (
        <Box sx={{ padding: { xs: '20px 10px', md: '40px 20px' } }}>
          <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: { xs: 'var(--font-size-p2)', md: 'var(--font-size-p1)' }, fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: { xs: 'block', md: 'inline-block' }, border: "none", padding: { xs: '0 20px', md: '0px' } }}>
              {course ? 'Course Reviews' : trainer ? 'Trainer Reviews' : 'Student Reviews – Hear from Our Successful Learners'}
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: { xs: 'var(--font-size-p3)', md: 'var(--font-size-p2)' }, fontWeight: 'bold', fontFamily: 'var(--font-p2)' }}>
              At Skillmate, we take pride in delivering high-quality training that transforms careers.
              Here’s what our students have to say about their experience with our Java Full-Stack
              Development program:
            </Typography>
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                overflowX: { xs: 'visible', md: 'auto' },
                paddingBottom: 2,
                paddingTop: 2,
                scrollSnapType: { xs: 'none', md: 'x mandatory' },
                scrollbarWidth: 'thin',
              }}
            >
              {filteredReviews.map((review, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: { xs: '100%', md: 320 },
                    maxWidth: { xs: '100%', md: 320 },
                    backgroundColor: '#fff',
                    padding: 2,
                    borderRadius: 3,
                    boxShadow: 2,
                    border: '1px solid #ddd',
                    scrollSnapAlign: 'start',
                    transition: 'box-shadow 0.3s ease',
                    ":hover": { boxShadow: 5 },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: 1 }}>
                    <Rating value={review.rating || 0} readOnly precision={0.5} />
                  </Box>
                  <Typography fontSize={'var(--font-size-p3)'} mb={1} fontWeight="bold" color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
                    {review.course ? course.title : review.trainer?.name || 'Review title'}
                  </Typography>
                  <Typography fontSize={'var(--font-size-p3)'} color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
                    {review.feedback || 'Review body'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <Avatar
                      src={review.student?.image ? `data:image/jpeg;base64,${review.student.image}` : trainerImage}
                      alt="student"
                      sx={{ width: 40, height: 40, marginRight: 1 }}
                    />
                    <Box>
                      <Typography fontSize={'var(--font-size-p2)'} fontWeight="bold" color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
                        {review.student?.name || 'Reviewer name'}
                      </Typography>
                      <Typography fontSize={'var(--font-size-p3)'} color="var(--color-p4)" fontFamily={'var(--font-p2)'}>
                        {review.date || 'Date'}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      ) : ('')}
    </>
  );
}

export default ReviewsSection;
