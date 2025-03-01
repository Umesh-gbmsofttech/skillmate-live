import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReviewsSection from '../rating-review/ReviewsSection';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import writeIcon from '../../assets/writeIcon.png';
import baseUrl from '../urls/baseUrl'
import { addToMyCourses } from '../redux/coursesSlice';
import CustomButton from '../utility/CustomButton';


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
      const response = await axios.post(`${baseUrl}payment/create`, {
        amount: course.price,
        currency: 'INR',
      });

      const { orderId } = response.data;

      if (orderId) {
        const options = {
          key: 'rzp_test_kkfcoqYStM8mEe',
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
            name: userData.name,
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
      const response = await axios.post(`${baseUrl}payment/verify`, {
        paymentId,
      });
      if (response.data === 'Payment verified and captured successfully.') {
        await handleUpdateCourse();
        navigate('/my-courses');
        showSuccessToast(`Course purchased successfully!`);
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
      const response = await axios.post(
        `${baseUrl}enrollments/enroll`,
        {
          studentId: { id: studentId },
          course: { id: courseId },
          status: "Active",
        },
        {
          params: { studentId: studentId, courseId: courseId },  // Query params
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        dispatch(addToMyCourses(course));
      }
    } catch (error) {
      console.error('Error updating course:', error);
      showErrorToast('Failed to enroll in the course. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 1 }}>
      {course && (
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 1200, m: '40px auto', p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f7f7f71b' }}>
          <CardMedia
            component="img"
            sx={{ objectPosition: "top", objectFit: "cover", position: "relative", minHeight: 400, maxHeight: 500, width: { xs: '100%', md: '50%' }, borderRadius: 2 }}
            image={`data:image/jpeg;base64,${course.image}`}
            alt={course?.title}
          />
          <CardContent sx={{ flex: '1', paddingLeft: 4 }}>
            <Typography sx={{ color: 'var(--color-p2)', fontWeight: 'bolder', fontFamily: 'var(--font-p1)', fontSize: 'var(--font-size-p1)' }} gutterBottom>
              {course?.title}
            </Typography>
            <Typography sx={{ color: 'var(--color-p3)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p2)' }} gutterBottom>
              Price: ₹ {course?.price}/-
            </Typography>
            <Typography sx={{ color: 'var(--color-p3)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p2)' }} gutterBottom>
              Duration: {course?.days} days
            </Typography>
            <CustomButton text={' Buy Now'} width={'100%'} onClick={handleBuyCourse} />
            <Button
              onClick={handleExpandClick}
              sx={{ marginTop: 2, textTransform: 'none', ":focus": { outline: "none", border: "none" }, fontFamily: 'var(--font-p1)', fontSize: 'var(--font-size-p2)' }}
              endIcon={<ExpandMore />}
            >
              See the full details of this course...
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography sx={{ color: 'var(--color-p2)', fontFamily: 'var(--font-p1)', fontSize: 'var(--font-size-p2)' }} gutterBottom>
                {course.description}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      )}
      <ReviewsSection course={course} />
    </Box>
  );
}

export default BuyCourse;
