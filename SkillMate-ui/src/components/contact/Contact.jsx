import React from 'react';
import Footer from '../home/Footer';
import ReviewsSection from '../home/ReviewsSection';
import Navbar from '../home/Navbar';
import logo from '../../assets/skillmate.jpg';
import './Contact.css';

function Contact() {
    return (
        <div className="contact-container">
            <div className="product-section">
                <div className="product-image">
                    <img src={logo} alt="Product" />
                </div>
                <div className="product-details">
                    <h1 className="product-heading">Product Heading</h1>
                    <div className="product-options">
                        <div className="product-option1">
                            <label>Select Query:</label>
                            <select>
                                <option>op 1</option>
                                <option>op 2</option>
                                <option>op 3</option>
                                <option>op 4</option>
                                <option>op 5</option>
                            </select>
                        </div>
                        <div className="product-option2">
                            <label>Write Query:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <button className="product-button">Submit</button>
                    <details>
                        <summary>FAQ</summary>
                        <p>Answer to the frequently asked question...</p>
                    </details>
                </div>
            </div>

            <h1 className="reviews-heading">Latest Reviews</h1>
            <ReviewsSection />

            <div className="trend-section">
                <h1>Email Us</h1>
                <textarea name="query" placeholder="Enter your detailed query here..." required></textarea>
                <button className="trend-button">Submit</button>
            </div>
        </div>
    );
}

export default Contact;
