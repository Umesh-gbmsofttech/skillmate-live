import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactRating from 'react-rating';
import { useSelector } from 'react-redux';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import altImage from '../../assets/skillmate.jpg';
import 'font-awesome/css/font-awesome.min.css';
import './RatingCard.css';
import baseUrl from '../urls/baseUrl';

function RatingCard() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((state) => state.auth.userData);
    const token = useSelector((state) => state.auth.token);

    const trainer = location.state?.trainer;
    const course = location.state?.course;

    const handleFeedbackChange = (event) => setFeedback(event.target.value);

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
            ...(course ? { course: { id: course.id } } : { trainer: { id: trainer.id } })
        };

        const url = course ? `${baseUrl}ratings-reviews/course` : `${baseUrl}ratings-reviews/trainer`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showSuccessToast('Thanks for your feedback!');
                navigate('/rating-reviews/page'); // Adjust as necessary
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
        <div className="rating__card-container">
            {(trainer || course) && (
                <div className="rating___-container-card">
                    <img className="rating___-container-card-image"
                        src={(course?.coverImage || trainer?.profilePic) ? `data:image/png;base64,${course?.coverImage || trainer?.profilePic}` : altImage}
                        alt="Profile" />
                    <div className="rating___-container-card-data">
                        <h1>{course ? course.Title : trainer.name}</h1>
                        <p>{course ? course.description : `Experience: ${trainer.experience}`}</p>

                        <div className="rating-stars">
                            <ReactRating
                                initialRating={rating}
                                onChange={setRating}
                                emptySymbol="fa fa-star-o fa-2x grey"
                                fullSymbol="fa fa-star fa-2x gold"
                                fractions={2}
                            />
                        </div>

                        <p>
                            Feedback:
                            <textarea
                                value={feedback}
                                onChange={handleFeedbackChange}
                                placeholder="Write your review..."
                                rows="4"
                                style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent' }}
                            />
                        </p>
                    </div>
                    <button onClick={handleSubmit} className="rating__submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default RatingCard;
