import React from 'react';
import './StudentSection.css';  // Import the specific CSS file for the StudentSection
import studentImage from '../../../assets/skillmate.jpg';
import { useNavigate } from 'react-router-dom';

const StudentSection = () => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/rating-reviews/page')
    }


    const students = [
        {
            name: "Alice Johnson",
            position: "Full Stack Developer",
            experience: "2 years",
            expertise: "React, Node.js",
            imageUrl: studentImage,
            alt: "Student Image 1",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        {
            name: "Bob Walker",
            position: "Frontend Developer",
            experience: "1 year",
            expertise: "React, HTML, CSS",
            imageUrl: studentImage,
            alt: "Student Image 2",
        },
        // Add more students as needed
    ];

    return (
        <section className="community-container-student-section">
            <h2 className="community-container-heading">Meet Our Placed Students</h2>
            <div className="community-container-students-grid">
                {students.map((student, index) => (
                    <div
                        onClick={handleCardClick}
                        key={index}
                        className="community-container-student-card">
                        <div className="community-container-student-image-wrapper">
                            <img
                                src={student.imageUrl}
                                alt={student.alt}
                                className="community-container-student-image"
                            />
                        </div>
                        <div className="community-container-student-info">
                            <h3>{student.name}</h3>
                            <p>{student.position}</p>
                            <p>{student.experience}</p>
                            <p>Expertise: {student.expertise}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="community-container-students-info">
                <h1 className="community-container-students-info-heading">Our Students</h1>
                <p className="community-container-students-info-description">
                    Our students are passionate learners who have honed their skills through hands-on experience and expert guidance. They are ready to make a mark in the IT industry with their growing expertise.
                </p>
            </section>
        </section>
    );
};

export default StudentSection;
