import React, { useState } from 'react';
import './RatingCard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactRating from 'react-rating'; // Import ReactRating
import profilePic from '../../assets/profilePic.jpg'; // Your image path
import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome for star icons
import altImage from '../../assets/skillmate.jpg';
import { useSelector } from 'react-redux';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function RatingCard() {
    const [rating, setRating] = useState(0); // Track the rating
    const [review, setReview] = useState(''); // Track the review text
    const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
    const navigate = useNavigate();
    const location = useLocation();
    const trainer = location.state?.trainer;  // Get the trainer from location state
    const student = location.state?.student;  // Get the student from location state
    const course = location.state?.course;  // Get the course from location state
    const userData = useSelector((state) => state.auth.userData);
    const token = useSelector((state) => state.auth.token);

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleRatingSubmitClick = async (e) => {
        e.preventDefault();

        // Frontend validation: Check if the review is empty
        if (!review.trim()) {
            showWarningToast('Please write a review before submitting.');
            return;
        }

        setIsSubmitting(true);

        // Initialize the rating review data
        const ratingReviewData = {
            review,
            rating,
            reviewDate: new Date().toISOString().split('T')[0], // Automatically set the current date
            isGivenByAdmin: false,
            isGivenToTrainer: false,
            isGivenToStudent: false,
            isGivenToCourse: false,
        };

        // Check if the current user is a trainer or student and update the relevant data
        if (userData?.roles?.includes('TRAINER')) {
            ratingReviewData.isGivenByAdmin = false;
            ratingReviewData.ratingGiverTrainer = { id: userData.id }; // Use ratingGiverTrainer
            if (trainer) {
                ratingReviewData.isGivenToTrainer = true;
                ratingReviewData.toTrainer = { id: trainer.id }; // Rating the trainer
            }

            if (student) {
                ratingReviewData.isGivenToStudent = true;
                ratingReviewData.toStudent = { id: student.id }; // Rating the student
            }
        } else if (userData?.roles?.includes('STUDENT')) {
            ratingReviewData.isGivenByAdmin = false;
            ratingReviewData.ratingGiverStudent = { id: userData.id }; // Use ratingGiverStudent
            if (trainer) {
                ratingReviewData.isGivenToTrainer = true;
                ratingReviewData.toTrainer = { id: trainer.id }; // Rating the trainer
            }

            if (student) {
                ratingReviewData.isGivenToStudent = true;
                ratingReviewData.toStudent = { id: student.id }; // Rating the student
            }
        } else {
            ratingReviewData.isGivenByAdmin = true; // If the user is an admin
            if (trainer) {
                ratingReviewData.toTrainer = { id: trainer.id }; // Rating the trainer
            }

            if (student) {
                ratingReviewData.toStudent = { id: student.id }; // Rating the student
            }
        }

        // Handle the course review
        if (course) {
            ratingReviewData.isGivenToCourse = true;
            ratingReviewData.toCourse = { id: course.id }; // Rating the course
        }

        try {
            const response = await fetch('http://localhost:8080/rating-reviews/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(ratingReviewData),
            });

            if (response.ok) {
                const newReview = await response.json();
                console.log('Review submitted successfully:', newReview);
                showSuccessToast('Thanks for your feedback');
                // navigate('/rating-reviews/page');
            } else {
                // console.error('Failed to submit review');
                showErrorToast('There was an error submitting your review');
            }
        } catch (error) {
            // console.error('Error submitting review:', error);
            showErrorToast('Error submitting review');
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="rating__card-container">
            {course ? (
                <div className="rating___-container-card">
                    <img className="rating___-container-card-image" src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : altImage} />
                    <div className="rating___-container-card-data">
                        <h1>{course?.courseName}</h1>
                        <p>{course?.description}</p>

                        <div className="rating-stars">
                            <ReactRating
                                initialRating={rating}  // Set the initial rating
                                onChange={(newRating) => setRating(newRating)}  // Update the rating on click
                                emptySymbol="fa fa-star-o fa-2x grey"  // Empty star (grey)
                                fullSymbol="fa fa-star fa-2x gold"  // Filled star (gold)
                                fractions={2}  // Allow half-star ratings
                            />
                        </div>

                        <p>
                            Review:
                            <textarea
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Write your review..."
                                rows="4"
                                style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
                            />
                        </p>
                    </div>
                    <button onClick={handleRatingSubmitClick} className="rating__submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            ) : null}

            {trainer ? (
                <div className="rating___-container-card">
                    <img className="rating___-container-card-image" src={trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : altImage} />
                    <div className="rating___-container-card-data">
                        <h1>{trainer?.fullName}</h1>
                        <p>{trainer?.experience}</p>

                        <div className="rating-stars">
                            <ReactRating
                                initialRating={rating}  // Set the initial rating
                                onChange={(newRating) => setRating(newRating)}  // Update the rating on click
                                emptySymbol="fa fa-star-o fa-2x grey"  // Empty star (grey)
                                fullSymbol="fa fa-star fa-2x gold"  // Filled star (gold)
                                fractions={2}  // Allow half-star ratings
                            />
                        </div>

                        <p>
                            Review:
                            <textarea
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Write your review..."
                                rows="4"
                                style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
                            />
                        </p>
                    </div>
                    <button onClick={handleRatingSubmitClick} className="rating__submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            ) : null}

            {student ? (
                <div className="rating___-container-card">
                    <img className="rating___-container-card-image" src={student.profilePic ? `data:image/png;base64,${student.profilePic}` : altImage} />
                    <div className="rating___-container-card-data">
                        <h1>{student?.fullName}</h1>
                        <p>{student?.experience}</p>

                        <div className="rating-stars">
                            <ReactRating
                                initialRating={rating}  // Set the initial rating
                                onChange={(newRating) => setRating(newRating)}  // Update the rating on click
                                emptySymbol="fa fa-star-o fa-2x grey"  // Empty star (grey)
                                fullSymbol="fa fa-star fa-2x gold"  // Filled star (gold)
                                fractions={2}  // Allow half-star ratings
                            />
                        </div>

                        <p>
                            Review:
                            <textarea
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Write your review..."
                                rows="4"
                                style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
                            />
                        </p>
                    </div>
                    <button onClick={handleRatingSubmitClick} className="rating__submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default RatingCard;
// import React, { useState } from 'react';
// import './RatingCard.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ReactRating from 'react-rating'; // Import ReactRating
// import profilePic from '../../assets/profilePic.jpg'; // Your image path
// import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome for star icons
// import altImage from '../../assets/skillmate.jpg';
// import { useSelector } from 'react-redux';

// function RatingCard() {
//     const [rating, setRating] = useState(0); // Track the rating
//     const [review, setReview] = useState(''); // Track the review text
//     const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
//     const navigate = useNavigate();
//     const location = useLocation();
//     const trainer = location.state?.trainer;  // Get the trainer from location state
//     const student = location.state?.student;  // Get the student from location state
//     const course = location.state?.course;  // Get the course from location state
//     const userData = useSelector((state) => state.auth.userData);
//     const token = useSelector((state) => state.auth.token);

//     // console.log(trainer.id)

//     const handleReviewChange = (event) => {
//         setReview(event.target.value);
//     };

//     const handleRatingSubmitClick = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         // Initialize the rating review data
//         const ratingReviewData = {
//             review,
//             rating,
//             reviewDate: new Date().toISOString().split('T')[0], // Automatically set the current date
//             isGivenToTrainer: false,
//             isGivenToStudent: false,
//             isGivenToCourse: false,
//             isGivenByAdmin: false,
//         };

//         // Check if the current user is a trainer or student and update the relevant data
//         if (userData?.roles?.includes('TRAINER')) {
//             ratingReviewData.isGivenByAdmin = false;
//             ratingReviewData.trainer = { id: userData.id };
//             if (trainer) {
//                 ratingReviewData.isGivenToTrainer = true;
//                 console.log("logged in trainer id", userData.id)
//                 ratingReviewData.trainer = { id: userData?.id };
//                 // ratingReviewData.student = { id: student?.id };
//             }

//             if (student) {
//                 ratingReviewData.isGivenToStudent = true;
//             }
//         } else if (userData?.roles?.includes('STUDENT')) {
//             ratingReviewData.isGivenByAdmin = false;
//             ratingReviewData.student = { id: userData.id };
//             if (trainer) {
//                 ratingReviewData.isGivenToTrainer = true;
//             }

//             if (student) {
//                 ratingReviewData.isGivenToStudent = true;
//                 ratingReviewData.student = { id: student.id };
//             }
//         } else {
//             ratingReviewData.isGivenByAdmin = true; // If the user is an admin
//         }

//         if (course) {
//             ratingReviewData.isGivenToCourse = true;
//             ratingReviewData.course = { id: course.id }; // Correctly assign the course's ID
//         }

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
//                 const newReview = await response.json();
//                 console.log('Review submitted successfully:', newReview);
//                 alert('Thanks for your feedback');
//                 navigate('/rating-reviews/page');
//             } else {
//                 console.error('Failed to submit review');
//                 alert('There was an error submitting your review');
//             }
//         } catch (error) {
//             console.error('Error submitting review:', error);
//             alert('Error submitting review');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <div className="rating__card-container">
//             {course ? (
//                 <div className="rating___-container-card">
//                     <img className="rating___-container-card-image" src={course.coverImage ? `data:image/png;base64,${course.coverImage}` : altImage} />
//                     <div className="rating___-container-card-data">
//                         <h1>{course?.courseName}</h1>
//                         <p>{course?.description}</p>

//                         <div className="rating-stars">
//                             <ReactRating
//                                 initialRating={rating}  // Set the initial rating
//                                 onChange={(newRating) => setRating(newRating)}  // Update the rating on click
//                                 emptySymbol="fa fa-star-o fa-2x grey"  // Empty star (grey)
//                                 fullSymbol="fa fa-star fa-2x gold"  // Filled star (gold)
//                                 fractions={2}  // Allow half-star ratings
//                             />
//                         </div>

//                         <p>
//                             Review:
//                             <textarea
//                                 value={review}
//                                 onChange={handleReviewChange}
//                                 placeholder="Write your review..."
//                                 rows="4"
//                                 style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
//                             />
//                         </p>
//                     </div>
//                     <button onClick={handleRatingSubmitClick} className="rating__submit-btn" disabled={isSubmitting}>
//                         {isSubmitting ? 'Submitting...' : 'Submit'}
//                     </button>
//                 </div>
//             ) : null}

//             {trainer ? (
//                 <div className="rating___-container-card">
//                     <img className="rating___-container-card-image" src={trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : altImage} />
//                     <div className="rating___-container-card-data">
//                         <h1>{trainer?.fullName}</h1>
//                         <p>{trainer?.experience}</p>

//                         <div className="rating-stars">
//                             <ReactRating
//                                 initialRating={rating}  // Set the initial rating
//                                 onChange={(newRating) => setRating(newRating)}  // Update the rating on click
//                                 emptySymbol="fa fa-star-o fa-2x grey"  // Empty star (grey)
//                                 fullSymbol="fa fa-star fa-2x gold"  // Filled star (gold)
//                                 fractions={2}  // Allow half-star ratings
//                             />
//                         </div>

//                         <p>
//                             Review:
//                             <textarea
//                                 value={review}
//                                 onChange={handleReviewChange}
//                                 placeholder="Write your review..."
//                                 rows="4"
//                                 style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
//                             />
//                         </p>
//                     </div>
//                     <button onClick={handleRatingSubmitClick} className="rating__submit-btn" disabled={isSubmitting}>
//                         {isSubmitting ? 'Submitting...' : 'Submit'}
//                     </button>
//                 </div>
//             ) : null}

//             {student ? (
//                 <div className="rating___-container-card">
//                     <img className="rating___-container-card-image" src={student.profilePic ? `data:image/png;base64,${student.profilePic}` : altImage} />
//                     <div className="rating___-container-card-data">
//                         <h1>{student?.fullName}</h1>
//                         <p>{student?.experience}</p>

//                         <div className="rating-stars">
//                             <ReactRating
//                                 initialRating={rating}  // Set the initial rating
//                                 onChange={(newRating) => setRating(newRating)}  // Update the rating on click
//                                 emptySymbol="fa fa-star-o fa-2x grey"  // Empty star (grey)
//                                 fullSymbol="fa fa-star fa-2x gold"  // Filled star (gold)
//                                 fractions={2}  // Allow half-star ratings
//                             />
//                         </div>

//                         <p>
//                             Review:
//                             <textarea
//                                 value={review}
//                                 onChange={handleReviewChange}
//                                 placeholder="Write your review..."
//                                 rows="4"
//                                 style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
//                             />
//                         </p>
//                     </div>
//                     <button onClick={handleRatingSubmitClick} className="rating__submit-btn" disabled={isSubmitting}>
//                         {isSubmitting ? 'Submitting...' : 'Submit'}
//                     </button>
//                 </div>
//             ) : null}
//         </div>
//     );
// }

// export default RatingCard;
