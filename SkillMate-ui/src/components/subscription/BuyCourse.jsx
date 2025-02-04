import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyCourses } from '../redux/courseActions';
import axios from 'axios';
import ReviewsSection from '../rating-review/ReviewsSection';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import writeIcon from '../../assets/writeIcon.png';

function BuyCourse({ course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBuyCourse = async () => {
    if (!token || !isAuthenticated) {
      showErrorToast('Please login to purchase the course.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/payment/create', {
        amount: course.price,
        currency: 'INR',
      });

      const { orderId } = response.data;

      if (orderId) {
        const options = {
          key: 'rzp_test_rAFpbDqro1nE6t',
          amount: course.price * 100,
          currency: 'INR',
          name: course.courseName,
          description: course.description,
          order_id: orderId,
          handler: async (response) => {
            const { razorpay_payment_id } = response;
            await handlePaymentVerification(razorpay_payment_id);
          },
          prefill: {
            name: userData.fullName,
            email: userData.email,
            contact: userData.mobileNumber,
          },
          theme: {
            color: '#F37254',
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      showErrorToast('Failed to initiate payment. Please try again.');
    }
  };

  const handlePaymentVerification = async (paymentId) => {
    try {
      const response = await axios.post('http://localhost:8080/payment/verify', {
        paymentId,
      });
      if (response.data === 'Payment verified and captured successfully.') {
        await handleUpdateCourse();
        navigate('/my-courses');
        showSuccessToast('Course purchased successfully!');
      } else {
        showErrorToast('Payment verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      showErrorToast('Payment verification failed. Please try again.');
    }
  };

  const handleUpdateCourse = async () => {
    const studentId = userData.id;
    const courseId = course.id;
    try {
      const response = await axios.put(`http://localhost:8080/courses/update/${courseId}`, {
        ...course,
        students: [{ id: studentId }],
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        dispatch(addToMyCourses(course));
      }
    } catch (error) {
      console.error('Error updating course:', error);
      showErrorToast('Failed to buy the course. Please try again.');
    }
  };

  const handleRateUsClick = () => {
    navigate('/rating-reviews/page/card', { state: { course } });
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
      {course && (
        <Card sx={{ display: 'flex', marginBottom: 4 }}>
          <CardMedia
            component="img"
            sx={{ width: '50%', borderRadius: 2 }}
            image={`data:image/jpeg;base64,${course.coverImage}`}
            alt={course.courseName}
          />
          <CardContent sx={{ flex: '1', paddingLeft: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {course.courseName}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Price: ₹{course.price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Duration: {course.duration} days
            </Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={handleBuyCourse}>
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<img src={writeIcon} alt="Rate Us" style={{ width: 20 }} />}
              onClick={handleRateUsClick}
            >
              Leave a Rating and Review
            </Button>
            <Button
              onClick={handleExpandClick}
              sx={{ marginTop: 2, textTransform: 'none' }}
              endIcon={<ExpandMore />}
            >
              See the full details of this course...
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography sx={{ marginTop: 2 }}>{course.description}</Typography>
            </Collapse>
          </CardContent>
        </Card>
      )}
      <ReviewsSection course={course} />
    </Box>
  );
}

export default BuyCourse;
