import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Ad_EditTrainer.css';

function AdEditTrainer() {
    const { trainerId } = useParams(); // Access trainerId from the URL parameters
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        address: '',
        qualification: '',
        experience: '',
        workingStatus: '',
        technologies: '',
        profilePic: null,  // Initially null, to hold file object
        resume: null
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch trainer data based on trainerId
    useEffect(() => {
        const fetchTrainerData = async () => {
            if (trainerId) {
                try {
                    console.log(`Fetching trainer data for ID: ${trainerId}`);
                    const response = await axios.get(`http://localhost:8080/trainers/fetch/${trainerId}`);
                    const fetchedTrainer = response.data;
                    setFormData({
                        fullName: fetchedTrainer.fullName,
                        mobileNumber: fetchedTrainer.mobileNumber,
                        email: fetchedTrainer.email,
                        address: fetchedTrainer.address,
                        qualification: fetchedTrainer.qualification,
                        experience: fetchedTrainer.experience,
                        workingStatus: fetchedTrainer.workingStatus,
                        technologies: fetchedTrainer.technologies.join(', '), // Convert array to string
                        profilePic: fetchedTrainer.profilePic || null,
                        resume: fetchedTrainer.resume || null
                    });
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching trainer data:', error);
                    setLoading(false);
                }
            }
        };
        fetchTrainerData();
    }, [trainerId]);

    // Handle form input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle profile picture upload
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError('File size must be less than 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profilePic: reader.result.split(',')[1]  // Store base64 string for image
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle resume upload
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setError('Please upload a valid PDF file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {  // Limit size to 5MB
                setError('File size must be less than 5MB.');
                return;
            }
            setFormData((prevData) => ({
                ...prevData,
                resume: file  // Store the file object in state
            }));
        }
    };

    // Handle form submission to update trainer details
    const handleSubmitClick = async (event) => {
        event.preventDefault();
        const trainerData = new FormData();
        trainerData.append('fullName', formData.fullName);
        trainerData.append('mobileNumber', formData.mobileNumber);
        trainerData.append('email', formData.email);
        trainerData.append('address', formData.address);
        trainerData.append('qualification', formData.qualification);
        trainerData.append('experience', formData.experience);
        trainerData.append('workingStatus', formData.workingStatus);
        trainerData.append('technologies', formData.technologies.split(',').map((tech) => tech.trim()));  // Convert technologies to an array

        // Append profile picture if available
        if (formData.profilePic) {
            trainerData.append('profilePic', formData.profilePic);  // Append base64 string directly
        }

        // Append resume if available
        if (formData.resume) {
            trainerData.append('resume', formData.resume);
        }

        try {
            const response = await axios.put(`http://localhost:8080/trainers/update/${trainerId}`, trainerData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                alert('Trainer data updated successfully!');
                // navigate(`/trainers/${trainerId}`);
            } else {
                setError('Failed to update trainer data. Please try again later.');
            }
        } catch (error) {
            setError('Error occurred while updating trainer data. Please try again later.');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin__edit-trainer-container">
            <h2>Edit Trainer Information</h2>
            <form onSubmit={handleSubmitClick}>
                <div className="ad__-trainer-details">
                    {/* Profile Picture */}
                    <div className="profile-pic-container">
                        {formData.profilePic && (
                            <div className="profile-pic-preview">
                                <img
                                    className="profile-pic"
                                    src={`data:image/jpeg;base64,${formData.profilePic}`}  // Convert byte[] to base64 string
                                    alt="Profile Preview"
                                />
                            </div>
                        )}
                    </div>
                    <label>
                        Profile Picture:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                        />
                    </label>

                    {/* Full Name */}
                    <div className="ad__-trainer-details__item">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter trainer's full name"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="ad__-trainer-details__item">
                        <label>Mobile Number:</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter trainer's mobile number"
                        />
                    </div>

                    {/* Email */}
                    <div className="ad__-trainer-details__item">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter trainer's email"
                        />
                    </div>

                    {/* Current Work Status */}
                    <label>
                        Current Work Status:
                        <select
                            name="workingStatus"
                            value={formData.workingStatus}
                            onChange={handleInputChange}
                        >
                            <option value="">Select</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="freelance">Freelance</option>
                            <option value="unemployed">Unemployed</option>
                        </select>
                    </label>

                    {/* Address */}
                    <div className="ad__-trainer-details__item">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter trainer's address"
                        />
                    </div>

                    {/* Qualification */}
                    <div className="ad__-trainer-details__item">
                        <label>Qualification:</label>
                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            placeholder="Enter trainer's qualification"
                        />
                    </div>

                    {/* Technologies */}
                    <div className="ad__-trainer-details__item">
                        <label>Technologies:</label>
                        <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleInputChange}
                            placeholder="Enter technologies (comma separated)"
                        />
                    </div>

                    {/* Resume Upload */}
                    <label>
                        Resume (PDF):
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                        />
                    </label>
                </div>

                <div className="ad__-trainer-actions">
                    <button className="ad__-trainer-actions__submit" type="submit">Update Trainer</button>
                </div>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default AdEditTrainer;
