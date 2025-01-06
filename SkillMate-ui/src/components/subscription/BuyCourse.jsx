import React, { useState } from 'react';
import './BuyCourse.css';
import writeIcon from '../../assets/writeIcon.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyCourses } from '../redux/courseActions';
import axios from 'axios';

function BuyCourse({ course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [paymentId, setPaymentId] = useState(null);

  // Handle the purchase process
  const handleBuyCourse = async () => {
    if (!token || !isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      // Step 1: Request to backend to create Razorpay order
      const response = await axios.post('http://localhost:8080/payment/create', {
        amount: course.price,
        currency: 'INR',
      });

      const { orderId } = response.data;

      if (orderId) {
        // Step 2: Initiate Razorpay Payment
        const options = {
          key: 'rzp_test_rAFpbDqro1nE6t', // Replace with your Razorpay key
          amount: course.price * 100, // Convert price to paise
          currency: 'INR',
          name: course.courseName,
          description: course.description,
          order_id: orderId,
          handler: async function (response) {
            console.log('Razorpay response:', response);  // Log the full response

            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            // Ensure that the necessary values are available
            if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
              console.error('Missing required values from Razorpay response:', response);
              return;
            }

            // Step 3: Send only the paymentId to the backend for verification
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
      } else {
        throw new Error('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  // Handle payment verification with the backend using paymentId
  const handlePaymentVerification = async (paymentId) => {
    try {
      // Send only the paymentId to the backend for verification
      const response = await axios.post('http://localhost:8080/payment/verify', {
        paymentId: paymentId,  // Only paymentId is required for verification
      });

      // Backend will return success/failure based on the payment verification
      if (response.data === 'Payment verified and captured successfully.') {
        // Step 6: After successful payment, update the course
        await handleUpdateCourse();

        // Step 7: Navigate to the 'My Courses' page
        navigate('/my-courses');
      } else {
        alert('Payment verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Payment verification failed. Please try again.');
    }
  };

  // Handle course update after successful payment
  const handleUpdateCourse = async () => {
    const studentId = userData.id;
    const courseId = course.id;

    try {
      const response = await fetch(`http://localhost:8080/courses/update/${courseId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...course, // Spread the existing course data
          students: [{
            id: studentId,
          }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the course for the student');
      }

      // Dispatch to update Redux store with the course
      dispatch(addToMyCourses(course));
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to buy the course. Please try again.');
    }
  };


  // Handle redirect to rating/review page
  const handleRateUsClick = (course) => {
    navigate('/rating-reviews/page/card', { state: { course } });
  };

  return (
    <div className="buy-course-container">
      {course ? (
        <>
          <div className="course-section">
            <div className="course-image">
              <img
                src={`data:image/jpeg;base64,${course.coverImage}`}
                alt={course.courseName}
              />
            </div>
            <div className="course-details">
              <h1 className="course-title">{course.courseName}</h1>
              <p className="course-price">Price: ₹{course.price}</p>
              <p className="course-duration">Duration: {course.duration} days</p>
              <details>
                <summary>See the full details of this course ...</summary>
                <p>{course.description}</p>
              </details>
              <button className="buy-button" onClick={handleBuyCourse}>
                Buy Now
              </button>
            </div>
          </div>

          {/* Display rate and review option */}
          <div className="leave__a-rating-review" onClick={() => handleRateUsClick(course)}>
            <h2>
              Leave a Rating and Review <img src={writeIcon} alt="Rate Us" />
            </h2>
          </div>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
}

export default BuyCourse;
