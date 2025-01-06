import React, { useEffect, useState } from 'react';
import './StudentSection.css';  // Import the specific CSS file for the StudentSection
import studentImage from '../../../assets/skillmate.jpg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import altImage from '../../../assets/skillmate.jpg';

const StudentSection = () => {

    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch('http://localhost:8080/students/fetch', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudents(data); // Assuming the API returns an array of reviews
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

    // console.log(students[0].courses[0].courseName)

    const handleCardClick = (student) => {
        navigate('/rating-reviews/page', { state: { student } })
    }


    const student = [
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
            {students?.length > 0 ? (
                <div className="community-container-students-grid">
                    {students.map((student, index) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(student)}
                            className="community-container-student-card"
                        >
                            <div className="community-container-student-image-wrapper">
                                <img
                                    src={student.profilePic ? `data:image/png;base64,${student.profilePic}` : altImage}
                                    alt={student.fullName || 'Student Image'}
                                    className="community-container-student-image"
                                />
                            </div>
                            <div className="community-container-student-info">
                                <h3>{student?.fullName}</h3>
                                <p>{student?.position}</p>
                                <p>{student?.experience}</p>
                                <ul>
                                    expertise:
                                    {student?.courses && student.courses.length > 0 ? (
                                        student.courses.map((course, idx) => (

                                            <li key={idx}>{course.courseName}</li>
                                        ))
                                    ) : (
                                        <li>No expertise listed</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="community-container-students-grid">
                    {/* Display mock data if no students are fetched */}
                    {Array(5).fill({
                        name: 'Alice Johnson',
                        position: 'Full Stack Developer',
                        experience: '2 years',
                        expertise: 'React, Node.js',
                        imageUrl: studentImage,
                        alt: 'Student Image 1',
                    }).map((student, index) => (
                        <div
                            key={index}
                            onClick={handleCardClick}
                            className="community-container-student-card"
                        >
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
            )}
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
