import React, { useState } from 'react';
import './RatingCard.css';
import { useNavigate } from 'react-router-dom';
import ReactRating from 'react-rating';  // Import ReactRating
import profilePic from '../../assets/profilePic.jpg';  // Your image path
import 'font-awesome/css/font-awesome.min.css';  // Import FontAwesome for star icons

function RatingCard() {
    const [rating, setRating] = useState(0);  // Track the rating
    const [review, setReview] = useState('');  // Track the review text
    const navigate = useNavigate();

    const user = {
        profilePic,
        name: 'John Doe',
        experience: '10 years',
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleRatingSubmitClick = () => {
        // You can add logic to save the rating and review here
        console.log('Rating:', rating);
        console.log('Review:', review);
        alert('Thanks for your feedback')
        navigate('/rating-reviews/page');
    };

    return (
        <div className="rating__card-container">
            <div className="rating___-container-card">
                <img className="rating___-container-card-image" src={user.profilePic} alt={user.name} />
                <div className="rating___-container-card-data">
                    <h1>{user.name}</h1>
                    <p>{user.experience}</p>

                    {/* ReactRating component for displaying the stars */}
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
                <button onClick={handleRatingSubmitClick} className="rating__submit-btn">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default RatingCard;
