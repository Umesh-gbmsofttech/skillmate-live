import React from 'react';
import './MyCourses.css';
import logo from '../../assets/skillmate.jpg';

function MyCourses() {

    const sessions = [
        {
            title: "Introduction to React",
            date: "November 1, 2024",
            duration: "1 hour",
            imageUrl: logo,
            alt: "https://via.placeholder.com/300",
        },
        {
            title: "Advanced JavaScript",
            date: "November 3, 2024",
            duration: "2 hours",
            imageUrl: logo,
            alt: "https://via.placeholder.com/300",
        },
        {
            title: "CSS Grid and Flexbox",
            date: "November 5, 2024",
            duration: "1.5 hours",
            imageUrl: logo,
            alt: "https://via.placeholder.com/300",
        },
    ];

    return (
        <div className='my-courses-container'>
            <h1>My Courses</h1>
            <div className='my-courses-list'>
                {sessions.map((session, index) => (
                    <div key={index} className='my-course-card'>
                        <img src={session.imageUrl} alt={session.alt} className='session-image' />
                        <div className='my-course-info'>
                            <h2 className='my-course-title'>{session.title}</h2>
                            <p className='my-course-date'>Date: {session.date}</p>
                            <p className='my-course-duration'>Duration: {session.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCourses;
