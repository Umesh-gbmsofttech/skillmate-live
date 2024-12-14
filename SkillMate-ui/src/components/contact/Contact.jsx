import React from 'react';
import Footer from '../home/Footer';
import Navbar from '../home/Navbar';
import logo from '../../assets/skillmate.jpg';
import whatsapp from '../../assets/whatsapp.png';
import './Contact.css';
import ReviewsSection from '../rating-review/ReviewsSection';
import EnquiryForm from './EnquiryForm';
import writeIcon from '../../assets/writeIcon.png';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate();

    const alt = 'https://via.placeholder.com/300';
    const handleWhatsAppClick = () => {
        alert('opening whatsapp');
        window.open(`https://api.whatsapp.com/send?phone=+919226224019&text=Hi, I'm interested in enrolling in your React js course. Please let me know your availability.`);
    };
    const handleRateUsClick = () => {
        navigate('/rating-reviews/page/card')
    }
    return (
        <div className="contact-us-container">
            <div className="contact-us-course-section">
                <div className="contact-us-course-image">
                    <img src={logo} alt={alt} />
                </div>
                <div className="contact-us-course-details">
                    <h1 className="contact-us-course-heading">React js</h1>
                    <h1 className="contact-us-course-prize">15,000/-</h1>
                    <p className="contact-us-course-period">Period: 180 days</p>
                    <div className="contact-us-course-options">
                        <label>Select Query:</label>
                        <select>
                            <option>op 1</option>
                            <option>op 2</option>
                            <option>op 3</option>
                            <option>op 4</option>
                            <option>op 5</option>
                        </select>
                    </div>

                    <details>
                        <summary>See the full details of this course ...</summary>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ad placeat at exercitationem molestias odio tempore sapiente modi distinctio, ut nostrum ullam, laboriosam dolore vitae temporibus voluptates similique quas corrupti.</p>
                    </details>
                    <div className="email-us-section">
                        <div className="email-us-section__email">
                            <textarea name="query" placeholder="Enter your detailed query here..." required></textarea>
                            <button className="contact-us-course-button">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="leave__a-rating-review" onClick={handleRateUsClick} >
                <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
            </div>

            <h1 className="reviews-heading">Latest Reviews</h1>
            <ReviewsSection />

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
