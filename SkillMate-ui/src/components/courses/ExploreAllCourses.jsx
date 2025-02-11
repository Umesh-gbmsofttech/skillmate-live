import React, { useEffect, useState } from 'react';
import './ExploreAllCourses.css';
import { useNavigate } from 'react-router-dom';

function ExploreAllCourses() {
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    const handleExploreAllCoursesClick = () => {
        navigate('/courses');
    };

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.explore-all-courses-section');
            if (section) {
                const rect = section.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
                setIsVisible(isInViewport);
            }
        };

        // Adding scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Trigger scroll handler on mount to check visibility
        handleScroll();

        // Cleanup scroll event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={`explore-all-courses-section ${isVisible ? 'visible' : ''}`}>
                <p className='explore-all-courses-section-big-text'>
                    Providing a holistic ecosystem for skill development, internships, and career growth.
                </p>
                <p className='explore-all-courses-section-little-text1'>
                    To address the skill gap in the IT sector by offering
                </p>
                <p className='explore-all-courses-section-little-text2'>
                    Affordable, quality training and guaranteed placement opportunities.
                </p>
                <button className='explore-courses' onClick={handleExploreAllCoursesClick}>Explore All Courses</button>
                <div className='overlay'>

                </div>
            </div>
        </>

    );
}

export default ExploreAllCourses;
