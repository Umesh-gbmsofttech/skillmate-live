import React from 'react';
import './TrainerSection.css';  // Import the specific CSS file for the TrainerSection
import trainerImage from '../../../assets/skillmate.jpg';
import { useNavigate } from 'react-router-dom';

const TrainerSection = () => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/rating-reviews/page')
    }

    const trainers = [
        {
            name: "John Doe",
            position: "Full Stack Developer",
            experience: "8+ years",
            expertise: "React, Node.js, MongoDB",
            imageUrl: trainerImage,
            alt: "Trainer Image 1",
        },
        {
            name: "Jane Smith",
            position: "Frontend Developer",
            experience: "5+ years",
            expertise: "React, CSS, JavaScript",
            imageUrl: trainerImage,
            alt: "Trainer Image 2",
        },
        {
            name: "Jane Smith",
            position: "Frontend Developer",
            experience: "5+ years",
            expertise: "React, CSS, JavaScript",
            imageUrl: trainerImage,
            alt: "Trainer Image 3",
        },
        {
            name: "Jane Smith",
            position: "Frontend Developer",
            experience: "5+ years",
            expertise: "React, CSS, JavaScript",
            imageUrl: trainerImage,
            alt: "Trainer Image 3",
        },
        {
            name: "Jane Smith",
            position: "Frontend Developer",
            experience: "5+ years",
            expertise: "React, CSS, JavaScript",
            imageUrl: trainerImage,
            alt: "Trainer Image 3",
        },
        {
            name: "Jane Smith",
            position: "Frontend Developer",
            experience: "5+ years",
            expertise: "React, CSS, JavaScript",
            imageUrl: trainerImage,
            alt: "Trainer Image 3",
        },
        // Add more trainers as needed
    ];

    return (
        <section className="community-container-trainers-section">
            <h2 className="community-container-heading">Meet Our Expert Trainers</h2>
            <div className="community-container-trainers-grid">
                {trainers.map((trainer, index) => (
                    <div
                        onClick={handleCardClick}
                        key={index}
                        className="community-container-trainer-card">
                        <div className="community-container-trainer-image-wrapper">
                            <img
                                src={trainer.imageUrl}
                                alt={trainer.alt}
                                className="community-container-trainer-image"
                            />
                        </div>
                        <div className="community-container-trainer-info">
                            <h3>{trainer.name}</h3>
                            <p>{trainer.position}</p>
                            <p>{trainer.experience}</p>
                            <p>Expertise: {trainer.expertise}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="community-container-trainers-info">
                <h1 className="community-container-trainers-info-heading">Our Trainers</h1>
                <p className="community-container-trainers-info-description">
                    Our trainers are experienced working professionals with 8-10 years of industry experience. They are passionate about sharing their knowledge and expertise to help you grow in your IT career.
                </p>
            </section>
        </section>
    );
};

export default TrainerSection;
