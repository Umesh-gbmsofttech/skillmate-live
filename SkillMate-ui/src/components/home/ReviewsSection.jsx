import React from 'react';
import './ReviewsSection.css';

function ReviewsSection() {
  const reviews = Array(5).fill({
    title: 'Review title',
    body: 'Review body',
    name: 'Reviewer name',
    date: 'Date',
  });

  return (
    <div className="reviews-section">
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <h4>{review.title}</h4>
            <p>{review.body}</p>
            <span>{review.name} - {review.date}</span>
            <div className="stars">
              <span style={{ color: 'gold' }}>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
