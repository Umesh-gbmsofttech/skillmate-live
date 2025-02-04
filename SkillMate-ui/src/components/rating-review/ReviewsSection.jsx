import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Avatar } from '@mui/material';
import userImage from '../../assets/skillmate.jpg'; // Default image for fallback

function ReviewsSection({ course, user }) {
  const token = useSelector((state) => state.auth.token); // Get token from Redux state

  // Access trainer and student from Redux
  const trainer = useSelector((state) => state.communityData.trainer);
  const student = useSelector((state) => state.communityData.student);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      let url = '';

      // Set URL based on whether it's a trainer, student, or course
      if (user?.roles == 'TRAINER') {
        url = `http://localhost:8080/rating-reviews/trainer/${trainer?.id}`;
      } else if (user?.roles == 'STUDENT') {
        url = `http://localhost:8080/rating-reviews/student/${student?.id}`;
      } else if (course) {
        url = `http://localhost:8080/rating-reviews/course/${course.id}`;
      } else {
        url = `http://localhost:8080/rating-reviews/fetch`; // Default URL for fetching reviews if no specific entity
      }

      if (url) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    };

    // Call the fetchReviews whenever the relevant dependencies change
    fetchReviews();
  }, [token, trainer, student, course, user]);

  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#f9f9f9' }}>
      {/* Title Section */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
        Reviews
      </Typography>

      {/* Reviews list container with horizontal scroll */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          paddingBottom: 2,
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'thin',
        }}
      >
        {reviews?.length > 0
          ? reviews.map((review, index) => (
            <Card
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                minWidth: 280,
                backgroundColor: '#fff',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                scrollSnapAlign: 'start',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  marginBottom: 2,
                }}
              >
                <Avatar
                  src={
                    review.ratingGiverTrainer?.profilePic
                      ? `data:image/jpeg;base64,${review.ratingGiverTrainer.profilePic}`
                      : review.ratingGiverStudent?.profilePic
                        ? `data:image/jpeg;base64,${review.ratingGiverStudent.profilePic}`
                        : userImage
                  }
                  alt="User"
                  sx={{ width: 60, height: 60 }}
                />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {review.ratingGiverTrainer?.fullName || review.ratingGiverStudent?.fullName || 'User'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                  {review.reviewDate || 'No Date Provided'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                  <Rating value={review.rating || 0} readOnly precision={0.5} sx={{ marginRight: 1 }} />
                  <Typography variant="body2">{`${review.rating || 0} / 5`}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {review.review || 'No review provided'}
                </Typography>
              </CardContent>
            </Card>
          ))
          : 'No reviews available'}
      </Box>
    </Box>
  );
}

export default ReviewsSection;
