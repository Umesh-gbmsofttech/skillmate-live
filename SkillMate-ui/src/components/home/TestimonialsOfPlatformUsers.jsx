import React, { useEffect, useState, useRef } from 'react';
import './TestimonialsOfPlatformUsers.css';

function TestimonialsOfPlatformUsers({ heading }) {
    const youtubeVideos = [
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
        'https://www.youtube.com/embed/dUaCEs3HfdI',
    ];

    const [visibleVideos, setVisibleVideos] = useState([]);

    // Ref to hold the video elements
    const videoRefs = useRef([]);

    useEffect(() => {
        // Ensure videoRefs is correctly initialized
        videoRefs.current = videoRefs.current.slice(0, youtubeVideos.length);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Debugging the visibility of each video
                        console.log(`Video ${entry.target.dataset.index} is in viewport`);
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.5 } // Make sure it triggers when 50% is visible
        );

        // Observe each video element using ref
        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className='testimonialContainer'>
            <h3 className='testimonialHeading'>{heading}</h3>
            <div className="testimonialCardSection">
                {youtubeVideos.map((video, index) => (
                    <div
                        key={index}
                        ref={(el) => (videoRefs.current[index] = el)}
                        data-index={index}
                        className="videoCard"
                    >
                        <iframe
                            loading="lazy"
                            className="testimonialVideo"
                            src={video}
                            title={`YouTube video testimonial ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TestimonialsOfPlatformUsers;
