import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

function TestimonialsOfPlatformUsers({ heading }) {
    const youtubeVideos = [
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
        'https://youtu.be/eIrMbAQSU34?si=Y23ciag4B0yQ_73r',
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
        <Box sx={{ padding: '10px', textAlign: 'center', pb: 2, mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#96c6e0' }}>
                {heading}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                {youtubeVideos.map((video, index) => (
                    <Box
                        key={index}
                        ref={(el) => (videoRefs.current[index] = el)}
                        data-index={index}
                        sx={{
                            width: { xs: '100%', sm: '400px' },
                            aspectRatio: '16/9',
                            overflow: 'hidden',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 1s ease, opacity 1s ease',
                            opacity: 0,
                            transform: 'translateY(50px)',
                            '&.visible': {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <iframe
                            loading="lazy"
                            src={video}
                            title={`YouTube video testimonial ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
                        ></iframe>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default TestimonialsOfPlatformUsers;
