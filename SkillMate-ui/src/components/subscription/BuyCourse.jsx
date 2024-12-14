import React from 'react';
import './BuyCourse.css';
import logo from '../../assets/skillmate.jpg'
import writeIcon from '../../assets/writeIcon.png';
import { useNavigate } from 'react-router-dom';

function BuyCourse() {
    const navigate = useNavigate();

    const courseData = {
        name: "React for Beginners",
        price: "$99",
        duration: "180 days",
        alt: "https://via.placeholder.com/300",
        imageUrl: logo// Image URL
    };

    const handleRateUsClick = () => {
        navigate('/rating-reviews/page/card')
    }

    return (
        <div className='buy-course-container'>
            <div className='course-section'>
                <div className='course-image'>
                    <img src={courseData.imageUrl} alt={courseData.alt} />
                </div>
                <div className='course-details'>
                    <h1 className='course-title'>{courseData.name}</h1>
                    <p className='course-price'>{courseData.price}</p>
                    <p className='course-duration'>Duration: {courseData.duration}</p>
                    <details>
                        <summary>See the full details of this course ...</summary>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ad placeat at exercitationem molestias odio tempore sapiente modi distinctio, ut nostrum ullam, laboriosam dolore vitae temporibus voluptates similique quas corrupti.
                        </p>
                    </details>
                    <button className='buy-button'>Buy Now</button>
                </div>
            </div>
            <div className="leave__a-rating-review" onClick={handleRateUsClick} >
                <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
            </div>
        </div>
    );
}

export default BuyCourse;
