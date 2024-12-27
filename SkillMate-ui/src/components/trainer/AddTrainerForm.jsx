import React, { useState } from 'react';
import axios from 'axios';
import './AddTrainerForm.css';

const AddTrainerForm = ({ setAddFormVisible, setTrainers }) => {
    const [trainerData, setTrainerData] = useState({
        fullName: '',
        experience: '',
        technologies: '',
        profilePic: null, 
    });

    const [error, setError] = useState(''); 
    const [profilePic, setProfilePic] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainerData({
            ...trainerData,
            [name]: value,
        });
    };

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
                setProfilePic(reader.result.split(',')[1]);
                setTrainerData({
                    ...trainerData,
                    profilePic: reader.result.split(',')[1], // Save the base64 image data
                });
                setError(''); // Clear the error when a valid image is selected
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', trainerData.fullName);
        formData.append('experience', trainerData.experience);
        formData.append('technologies', trainerData.technologies);
        if (trainerData.profilePic) {
            formData.append('profilePic', trainerData.profilePic); // Add the base64 encoded profile pic
        }
    
        try {
            const response = await axios.post('http://localhost:8080/trainers/create', formData, {
               
            });
    
            if (response.status === 200) {
                alert('Trainer added successfully!');
                setAddFormVisible(false); 
                setTrainers((prevTrainers) => [...prevTrainers, response.data]); // Add the new trainer to the list
            } else {
                alert('Failed to add the trainer. Please try again.');
            }
        } catch (error) {
            console.error('Error adding trainer:', error);
            alert('An error occurred while adding the trainer.');
        }
    };
    

    return (
        <div className="add-trainer-form">
            <h2>Add New Trainer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={trainerData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Experience:</label>
                    <input
                        type="text"
                        name="experience"
                        value={trainerData.experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Technologies:</label>
                    <input
                        type="text"
                        name="technologies"
                        value={trainerData.technologies}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        onChange={handleProfilePicChange} // Use the updated profile picture handler
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
                </div>
                <button type="submit">Add Trainer</button>
            </form>
            
        </div>
    );
};

export default AddTrainerForm;
