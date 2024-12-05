import React from 'react';
import './Live.css';

function Live() {
    const googleMeetingUrl = "https://meet.google.com/nbu-pkky-rxb";

    return (
        <div className='live-lecture-container'>
            <h1 className='live-lecture-title'>Live Session</h1>
            <p>Join the session using the link below:</p>
            <a
                href={googleMeetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="join-meeting-button"
            >
                Join Google Meet
            </a>
        </div>
    );
}

export default Live;
