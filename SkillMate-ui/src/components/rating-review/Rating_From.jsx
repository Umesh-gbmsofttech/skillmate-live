// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserData } from '../redux/authSlice';

// function RatingForm() {
//     const token = useSelector((state) => state.auth.token); // Accessing token from Redux
//     const [ratingReviewData, setRatingReviewData] = useState({
//         rating: 4.6,
//         review: "The platform Skillmate is good and user-friendly for all users",
//         reviewDate: new Date().toISOString().split('T')[0], // Current date (ISO format)
//     });
//     const [reviews, setReviews] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [studentId, setStudentId] = useState('');
//     const [trainerId, setTrainerId] = useState('');
//     const [courseId, setCourseId] = useState('');

//     // Fetch all reviews on component mount
//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/rating-reviews/fetch', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setReviews(data); // Assuming the API returns an array of reviews
//                 } else {
//                     console.error('Failed to fetch reviews');
//                 }
//             } catch (error) {
//                 console.error('Error fetching reviews:', error);
//             }
//         };

//         fetchReviews();
//     }, [token]); // Rerun when the token changes

//     // Submit a new rating and review
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await fetch('http://localhost:8080/rating-reviews/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(ratingReviewData),
//             });

//             if (response.ok) {
//                 // After submission, fetch the updated list of reviews
//                 const newReview = await response.json();
//                 setReviews((prevReviews) => [...prevReviews, newReview]);
//                 setRatingReviewData({
//                     rating: 4.6,
//                     review: '',
//                     reviewDate: new Date().toISOString().split('T')[0],
//                 });
//             } else {
//                 console.error('Failed to submit review');
//             }
//         } catch (error) {
//             console.error('Error submitting review:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Fetch reviews based on student ID
//     const fetchReviewsByStudentId = async () => {
//         if (!studentId) {
//             alert('Please provide a Student ID');
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:8080/rating-reviews/student/${studentId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setReviews(data);
//             } else {
//                 console.error('Failed to fetch reviews by student');
//             }
//         } catch (error) {
//             console.error('Error fetching reviews by student:', error);
//         }
//     };

//     // Fetch reviews based on trainer ID
//     const fetchReviewsByTrainerId = async () => {
//         if (!trainerId) {
//             alert('Please provide a Trainer ID');
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:8080/rating-reviews/trainer/${trainerId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setReviews(data);
//             } else {
//                 console.error('Failed to fetch reviews by trainer');
//             }
//         } catch (error) {
//             console.error('Error fetching reviews by trainer:', error);
//         }
//     };

//     // Fetch reviews based on course ID
//     const fetchReviewsByCourseId = async () => {
//         if (!courseId) {
//             alert('Please provide a Course ID');
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:8080/rating-reviews/course/${courseId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setReviews(data);
//             } else {
//                 console.error('Failed to fetch reviews by course');
//             }
//         } catch (error) {
//             console.error('Error fetching reviews by course:', error);
//         }
//     };

//     // Admin endpoint to create rating-review
//     const handleAdminCreateReview = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/rating-reviews/admin/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(ratingReviewData),
//             });

//             if (response.ok) {
//                 const newReview = await response.json();
//                 setReviews((prevReviews) => [...prevReviews, newReview]);
//             } else {
//                 console.error('Failed to create review as admin');
//             }
//         } catch (error) {
//             console.error('Error creating review as admin:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Submit Rating and Review</h1>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>
//                         Rating:
//                         <input
//                             type="number"
//                             value={ratingReviewData.rating}
//                             onChange={(e) =>
//                                 setRatingReviewData({
//                                     ...ratingReviewData,
//                                     rating: parseFloat(e.target.value),
//                                 })
//                             }
//                             min="1"
//                             max="5"
//                             step="0.1"
//                         />
//                     </label>
//                 </div>

//                 <div>
//                     <label>
//                         Review:
//                         <textarea
//                             value={ratingReviewData.review}
//                             onChange={(e) =>
//                                 setRatingReviewData({
//                                     ...ratingReviewData,
//                                     review: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                 </div>

//                 <div>
//                     <button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? 'Submitting...' : 'Submit Review'}
//                     </button>
//                 </div>
//             </form>

//             <h2>Filter Reviews</h2>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Enter Student ID"
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                 />
//                 <button onClick={fetchReviewsByStudentId}>Fetch Reviews by Student ID</button>
//             </div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Enter Trainer ID"
//                     value={trainerId}
//                     onChange={(e) => setTrainerId(e.target.value)}
//                 />
//                 <button onClick={fetchReviewsByTrainerId}>Fetch Reviews by Trainer ID</button>
//             </div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Enter Course ID"
//                     value={courseId}
//                     onChange={(e) => setCourseId(e.target.value)}
//                 />
//                 <button onClick={fetchReviewsByCourseId}>Fetch Reviews by Course ID</button>
//             </div>
//             <div>
//                 <button onClick={handleAdminCreateReview}>Admin Create Review</button>
//             </div>

//             <h2>All Reviews</h2>
//             <div>
//                 {reviews.length > 0 ? (
//                     reviews.map((review, index) => (
//                         <div key={index}>
//                             <p><strong>Rating:</strong> {review.rating}</p>
//                             <p><strong>Review:</strong> {review.review}</p>
//                             <p><strong>Submitted on:</strong> {review.reviewDate}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No reviews available.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RatingForm;
