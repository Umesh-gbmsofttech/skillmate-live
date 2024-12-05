import React from 'react';
import './BuyCourse.css';

function BuyCourse() {
    const courseData = {
        name: "React for Beginners",
        price: "$99",
        duration: "3 hours",
        imageUrl: "https://via.placeholder.com/300",
    };

    return (
        <div className='buy-course-container'>
            <div className='course-section'>
                <div className='course-image'>
                    <img src={courseData.imageUrl} alt={courseData.name} />
                </div>
                <div className='course-details'>
                    <h1 className='course-title'>{courseData.name}</h1>
                    <p className='course-price'>{courseData.price}</p>
                    <p className='course-duration'>Duration: {courseData.duration}</p>
                    <button className='buy-button'>Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default BuyCourse;
