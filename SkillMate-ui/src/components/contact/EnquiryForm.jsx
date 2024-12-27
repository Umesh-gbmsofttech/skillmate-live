import React, { useState } from 'react';
import axios from 'axios';
import './EnquiryForm.css';
import picture from '../../assets/professional.jpg';

function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    qualification: '',
    query: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:8080/contact-us/create', formData);
      console.log('Enquiry submitted successfully:', response.data);
      alert('Enquiry submitted successfully!');
      
      // Optionally reset the form
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        qualification: '',
        query: '',
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <div className="contact-us__enquiry-form-container">
      <div className="enquiry-container-heading">
        <p>Fill your information and get free consultancy...</p>
        <p>And sign up to explore more things</p>
      </div>
      <div className="enquiry-container-form-image">
        <img className="enquiry-container-image" src={picture} alt="Professional" />
        <form className="enquiry-container-form" onSubmit={handleEnquirySubmit}>
          <label htmlFor="fullName">Your Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Your Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Your Phone Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="qualification">Your Degree</label>
          <input
            type="text"
            name="qualification"
            placeholder="Your Degree"
            value={formData.qualification}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="query">Your Detailed Query</label>
          <textarea
            name="query"
            placeholder="Your Detailed Query"
            value={formData.query}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EnquiryForm;

