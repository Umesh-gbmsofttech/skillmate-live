import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './community.css';
import trainerImage from '../../assets/skillmate.jpg';

const Community = () => {
  return (
    <div className="community-container">
      {/* <Navbar /> */}
      <section className="about-section">
        <div className="about-content">
          <h1 className="heading">Welcome to SkillMate</h1>
          <p className="description">
            SkillMate is a premier training and placement platform offering 100% placement guarantee support. Our comprehensive programs include:
          </p>
          <p className="description">


            Current Curriculum with Industry-aligned Courses

            Real-World Project Training with Expert Guidance

            Tailored Career Guidance and Mentorship
            Supportive Developer Community for Networking
            Placement Assistance with Top IT Companies
          </p>
          Don't Wait! Enroll Today and Build Your IT Career!
        </div>
      </section>
      <section className="trainers-section">
        <h2 className="heading animated-heading">Meet Our Expert Trainers</h2>
        <div className="trainers-grid">
          <div className="trainer-card">
            <img src={trainerImage} alt="Trainer" className="trainer-image" />
            <div className="trainer-info">
              <h3>John Doe</h3>
              <p>Full Stack Developer with 8+ years of experience</p>
              <p>Expertise: React, Node.js, MongoDB</p>
            </div>
          </div>
          <div className="trainer-card">
            <img src={trainerImage} alt="Trainer" className="trainer-image" />
            <div className="trainer-info">
              <h3>Jane Smith</h3>
              <p>Data Scientist with 9+ years of experience</p>
              <p>Expertise: Machine Learning, Python, R</p>
            </div>
          </div>
          <div className="trainer-card">
            <img src={trainerImage} alt="Trainer" className="trainer-image" />
            <div className="trainer-info">
              <h3>Bob Johnson</h3>
              <p>Cloud Architect with 10+ years of experience</p>
              <p>Expertise: AWS, Azure, Google Cloud</p>
            </div>
          </div>
          {/* Add more trainer cards here */}
        </div>
      </section>
      <section className="trainer-description-section">
        <h2 className="heading">Our Trainers</h2>
        <p className="description">
          Our trainers are experienced working professionals with 8-10 years of industry experience. They are passionate about sharing their knowledge and expertise to help you grow in your IT career.
        </p>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Community;