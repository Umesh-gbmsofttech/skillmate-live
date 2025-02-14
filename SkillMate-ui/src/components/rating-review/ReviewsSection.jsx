import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Avatar } from '@mui/material';
import userImage from '../../assets/skillmate.jpg'; // Default image for fallback
import baseUrl from '../urls/baseUrl'


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
        url = `${baseUrl}rating-reviews/trainer/${trainer?.id}`;
      } else if (user?.roles == 'STUDENT') {
        url = `${baseUrl}rating-reviews/student/${student?.id}`;
      } else if (course) {
        url = `${baseUrl}rating-reviews/course/${course.id}`;
      } else {
        url = `${baseUrl}rating-reviews/fetch`; // Default URL for fetching reviews if no specific entity
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
    <Box sx={{ padding: '40px 20px', backgroundColor: '#1A2130', color: 'white' }}>
      {/* Title Section */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', color: '#A6CDC6' }}>
        {!course ? 'Reviews' : ''}
      </Typography>

      {/* Reviews list container with horizontal scroll */}
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
        {reviews?.length > 0
          ? reviews.map((review, index) => (
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
                '&:hover': {
                  transform: 'scale(1.03)',
                },
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
                <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    {review.ratingGiverTrainer?.name || review.ratingGiverStudent?.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {review.reviewDate || 'No Date Provided'}
                  </Typography>
                </CardContent>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, padding: 0 }}>
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
    </Box >
  );
}

export default ReviewsSection;
