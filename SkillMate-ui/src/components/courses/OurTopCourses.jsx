import React, { useEffect, useState, useRef } from 'react';
import './OurTopCourses.css';
import logo from '../../assets/skillmate.jpg';
import { useNavigate } from 'react-router-dom';
import editIcon from '../../assets/editIcon.png';

function OurTopCourses() {

    const navigate = useNavigate();

    const handleBuyNowClick = () => {
        navigate('/subscriptions');
    }

    const handleCourseEditClick = () => {
        navigate('/admin-profile/edit-courses')
    }

    const cards = Array(6).fill({
        logo: logo,
        alt: 'SkillMate logo',
        courseName: 'SkillMate Title',
        trainerName: 'John Doe',
        rating: `4.5 ⭐⭐⭐⭐⭐ (1052)`,
    });

    const [visibleCards, setVisibleCards] = useState([]);

    // Ref to hold the course cards
    const cardRefs = useRef([]);

    useEffect(() => {
        // Ensure cardRefs is correctly initialized
        cardRefs.current = cardRefs.current.slice(0, cards.length);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% is visible
        );

        // Observe each card element
        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className='ourTopCoursesContainer'>
            <h3 className='ourTopCoursesHeading'>Our Top Courses</h3>
            <div className="ourTopCoursesCardSection">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="courseCard"
                    >
                        <img className='cardImage' src={card.logo} alt={card.alt} />
                        <div className="cardDetails">
                            <h4 className="cardCourseName">{card.courseName}</h4>
                            <h4 className="cardTrainerName">{card.trainerName}</h4>
                            <p className="cardRating">{card.rating}</p>
                            <button onClick={handleBuyNowClick} className="cardBuyNowButton">Buy Now</button>
                            <img onClick={handleCourseEditClick} src={editIcon} alt="Edit" className="editIcon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurTopCourses;
