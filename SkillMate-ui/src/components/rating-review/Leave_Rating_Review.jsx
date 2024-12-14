import React, { useState } from 'react'
import './Leave_Rating_Review.css'
import profilePic from '../../assets/profilePic.jpg'
import writeIcon from '../../assets/writeIcon.png'
import { useNavigate } from 'react-router-dom';
import ReviewsSection from './ReviewsSection'
function LeaveRatingReview() {

    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    const user =
    {
        profilePic,
        name: 'John Doe',
        experience: 10 + + ' of years',
        rating: 4.5 + ' ⭐️⭐️⭐️⭐️⭐️',
    }

    const handleRatingChange = (event) => {
        setUserRole(event.target.value);
    }
    const handleRateUsClick = () => {
        navigate('/rating-reviews/page/card')
    }


    return (
        <div className='rating__reviews_-container'>
            <div className='rating__reviews_-container-card'>
                <img className='rating__reviews_-container-card-image' src={user.profilePic} alt={user.name} />
                <div className="rating__reviews_-container-card-data">
                    <h1>{user.name}</h1>
                    <p>{user.experience}</p>
                    <p>{user.rating}</p>
                </div>
            </div>
            <div className="leave__a-rating-review" onClick={handleRateUsClick} >
                <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
            </div>

            <ReviewsSection />
        </div>
    )
}

export default LeaveRatingReview