import React from 'react';
import './LiveSessions.css';
import { useNavigate } from 'react-router-dom';

function LiveSessions() {
    const navigate = useNavigate();

    const handleJoinClick = (session) => {
        navigate('/live', { state: { session } });
    };

    const sessions = [
        {
            title: "Introduction to React",
            date: "November 1, 2024",
            duration: "1 hour",
            imageUrl: "https://via.placeholder.com/300",
        },
        {
            title: "Advanced JavaScript",
            date: "November 3, 2024",
            duration: "2 hours",
            imageUrl: "https://via.placeholder.com/300",
        },
        {
            title: "CSS Grid and Flexbox",
            date: "November 5, 2024",
            duration: "1.5 hours",
            imageUrl: "https://via.placeholder.com/300",
        },
    ];

    return (
        <div className='live-session-container'>
            <h1>Upcoming Live Sessions</h1>
            <div className='session-list'>
                {sessions.map((session, index) => (
                    <div key={index} className='session-card'>
                        <img src={session.imageUrl} alt={session.title} className='session-image' />
                        <div className='session-info'>
                            <h2 className='session-title'>{session.title}</h2>
                            <p className='session-date'>Date: {session.date}</p>
                            <p className='session-duration'>Duration: {session.duration}</p>
                            <button className='join-button' onClick={() => handleJoinClick(session)}>Join Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LiveSessions;
