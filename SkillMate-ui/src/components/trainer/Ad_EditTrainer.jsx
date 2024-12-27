import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Ad_EditTrainer.css';

function AdEditTrainer() {
    const { trainerId } = useParams(); // Get trainerId from URL params
    const [formData, setFormData] = useState({
        fullName: '',
        experience: '',
        rating: '',
        technologies: ''
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchTrainerData = async () => {
            if (trainerId) {
                try {
                    console.log(`Fetching trainer data for ID: ${trainerId}`); // Log trainerId
                    const response = await axios.get(`http://localhost:8080/trainers/fetch/${trainerId}`);
                    console.log('Fetched Trainer Data:', response.data); 
                    const fetchedTrainer = response.data;
                    setFormData({
                        fullName: fetchedTrainer.fullName,
                        experience: fetchedTrainer.experience,
                        rating: fetchedTrainer.rating,
                        technologies: fetchedTrainer.technologies.join(', ') // Convert array to comma-separated string
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
    
    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmitClick = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/trainers/update/${trainerId}`, formData);
            console.log('Trainer updated:', response.data);
            navigate('/trainers'); // Redirect to the trainers list page after successful update
        } catch (error) {
            console.error('Error updating trainer:', error);
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
                    <div className="ad__-trainer-details__item">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter trainer name"
                        />
                    </div>
    
                    <div className="ad__-trainer-details__item">
                        <label>Experience (Years):</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="Enter years of experience"
                        />
                    </div>
    
                    <div className="ad__-trainer-details__item">
                        <label>Rating:</label>
                        <input
                            type="text"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            placeholder="Enter rating"
                        />
                    </div>
    
                    <div className="ad__-trainer-details__item">
                        <label>Technologies:</label>
                        <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleInputChange}
                            placeholder="Enter technologies (comma-separated)"
                        />
                    </div>
                </div>
    
                <div className="ad__-trainer-actions">
                    <button className="ad__-trainer-actions__submit" type="submit">Update Trainer</button>
                </div>
            </form>
        </div>
    );
}

export default AdEditTrainer;

