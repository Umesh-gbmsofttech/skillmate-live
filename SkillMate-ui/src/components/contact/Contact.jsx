
import React, { useState } from 'react';
import Footer from '../home/Footer';
import Navbar from '../home/Navbar';
import logo from '../../assets/skillmate.jpg';
import whatsapp from '../../assets/whatsapp.png';
import './Contact.css';
import ReviewsSection from '../rating-review/ReviewsSection';
import EnquiryForm from './EnquiryForm';
import writeIcon from '../../assets/writeIcon.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests

function Contact() {
    const navigate = useNavigate();
    const location = useLocation();
    const course = location.state?.course;

    const [formData, setFormData] = useState({
        query: '',
        selectedOption: '',
    });

    const alt = 'https://via.placeholder.com/300';

    const handleWhatsAppClick = () => {
        alert('opening whatsapp');
        window.open(`https://api.whatsapp.com/send?phone=+919226224019&text=Hi, I'm interested in enrolling in your React js course. Please let me know your availability.`);
    };

    const handleRateUsClick = (course) => {
        navigate('/rating-reviews/page/card', { state: { course } });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send form data to Spring Boot backend
        axios.post('http://localhost:8080/sendEmail', formData)
            .then(response => {
                alert('Query submitted successfully!');
            })
            .catch(error => {
                alert('Error submitting query!');
                console.error(error);
            });
    };

    return (
        <div className="contact-us-container">
            {course ?
                (
                    <>
                        <div className="contact-us-course-section">
                            <div className="contact-us-course-image">
                                <img src={course?.coverImage} alt={alt} />
                            </div>
                            <div className="contact-us-course-details">
                                <h1 className="contact-us-course-heading">{course?.name}</h1>
                                <h1 className="contact-us-course-prize">{course?.price}</h1>
                                <p className="contact-us-course-period">{course?.duration} days</p>
                                <div className="contact-us-course-options">
                                    <label>Select Query:</label>
                                    <select name="selectedOption" value={formData.selectedOption} onChange={handleInputChange}>
                                        <option value="">Select an option</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Course Details">Course Details</option>
                                        <option value="Enrollment Process">Enrollment Process</option>
                                        <option value="Payment Issues">Payment Issues</option>
                                    </select>
                                </div>

                                <details>
                                    <summary>See the full details of this course ...</summary>
                                    <p>{course.description}</p>
                                </details>

                                <div className="email-us-section">
                                    <div className="email-us-section__email">
                                        <textarea
                                            name="query"
                                            placeholder="Enter your detailed query here..."
                                            required
                                            value={formData.query}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <button className="contact-us-course-button" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="leave__a-rating-review" onClick={() => handleRateUsClick(course)}>
                            <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
                        </div>

                        <h1 className="reviews-heading">Latest Reviews</h1>
                        <ReviewsSection />
                    </>
                ) : ("")}
            <div className="contact-whatsapp-contact-section">
                <div className="whatsapp-us">
                    <img src={whatsapp} alt={alt} onClick={handleWhatsAppClick} />
                    <h2>09226224019</h2>
                </div>
            </div>

            <EnquiryForm />
        </div>
    );
}

export default Contact;
