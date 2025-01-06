import React, { useEffect, useState } from 'react';
import './TrainerSection.css';  // Import the specific CSS file for the TrainerSection
import trainerImage from '../../../assets/skillmate.jpg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import altImage from '../../../assets/skillmate.jpg';


const TrainerSection = () => {

    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const handleCardClick = (trainer) => {
        navigate('/rating-reviews/page', { state: { trainer } })
    }
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch('http://localhost:8080/trainers/fetch', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTrainers(data); // Assuming the API returns an array of reviews
                    console.log(data)
                } else {
                    console.error('Failed to fetch reviews');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchTrainers();
    }, []);

    // console.log(trainers.length)//4
    // console.log(trainers[0].fullName)//Rahul
    // console.log(trainers[0].profilePic)//base64 image
    // console.log(trainers[0].technologies)//Java,Spring Boot,JavaScript,React,React Native
    // console.log(trainers[0].experience)//8

    const trainer = [
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
            {trainers?.length > 0 ?
                <div className="community-container-trainers-grid">
                    {trainers.map((trainer, index) => (
                        <div
                            onClick={() => handleCardClick(trainer)}
                            key={index}
                            className="community-container-trainer-card">
                            <div className="community-container-trainer-image-wrapper">
                                <img
                                    src={trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : altImage}
                                    alt={altImage}
                                    className="community-container-trainer-image"
                                />
                            </div>
                            <div className="community-container-trainer-info">
                                <h3>{trainer?.fullName}</h3>
                                <p>{trainer?.position}</p>
                                <p>{trainer?.experience} + years</p>
                                <p>Expertise: {trainer.technologies}</p>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="community-container-trainers-grid">
                    {trainer.map((trainer, index) => (
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
            }
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
