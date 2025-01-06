import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ReviewsSection.css';
import userImage from '../../assets/skillmate.jpg'; // Default image for fallback

function ReviewsSection() {
  const token = useSelector((state) => state.auth.token); // Get token from Redux state
  const [reviews, setReviews] = useState([]);

  // Placeholder reviews when no reviews are fetched
  const review = Array(5).fill({
    userImage,
    name: 'Review given by user',
    date: 'Date',
    rating: '*****',
    review: 'The platform Skillmate is good and user-friendly for all users.',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:8080/rating-reviews/fetch', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data); // Assuming the API returns an array of reviews
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [token]);

  return (
    <div className="reviews-section">
      <div className="reviews-list">
        {reviews?.length > 0
          ? reviews.map((review, index) => (
              <div key={index} className="review-card">
                {/* User Image */}
                <img 
                  src={`data:image/jpeg;base64,${review.student?.profilePic}` || userImage} 
                  alt="User" 
                  className="user-image" 
                />
                <div className="content">
                  {/* User Name */}
                  <h4>{review.student?.fullName || 'User'}</h4>
                  {/* Review Date */}
                  <span>{review.date}</span>
                  {/* Rating Stars */}
                  <div className="stars">
                    <span>{'⭐'.repeat(Math.round(review.rating))}</span>
                  </div>
                  {/* Review Text */}
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          : review.map((placeholderReview, index) => (
              <div key={index} className="review-card">
                {/* User Image */}
                <img 
                  src={placeholderReview.userImage || userImage} 
                  alt="User" 
                  className="user-image" 
                />
                <div className="content">
                  {/* User Name */}
                  <h4>{placeholderReview.name}</h4>
                  {/* Review Date */}
                  <span>{placeholderReview.date}</span>
                  {/* Rating Stars */}
                  <div className="stars">
                    <span>{'⭐'.repeat(placeholderReview.rating)}</span>
                  </div>
                  {/* Review Text */}
                  <p>{placeholderReview.review}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ReviewsSection;


// import React from 'react';
// import './ReviewsSection.css';
// import userImage from '../../assets/skillmate.jpg'

// function ReviewsSection() {
//   const reviews = Array(5).fill({
//     userImage,
//     name: 'Review given by user',
//     date: 'Date',
//     rating: '*****',
//     review: 'The platform skillmate is good and usefriendly for all users',
//   });

  
//   return (
//     <div className="reviews-section">
//       <div className="reviews-list">
//         {reviews.map((review, index) => (
//           <div key={index} className="review-card">
//             <h4>{review.name}</h4>
//             <p>{review.body}</p>
//             <span>{review.review} - {review.date}</span>
//             <div className="stars">
//               <span style={{ color: 'gold' }}>⭐️⭐️⭐️⭐️⭐️</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ReviewsSection;
