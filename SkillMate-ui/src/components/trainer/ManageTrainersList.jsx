import React, { useEffect, useState } from 'react';
import './ManageTrainersList.css';
import Search from '../Search';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteIcon.png';
import profileImagePlaceholder from '../../assets/profilePic.jpg'; // Placeholder if profile image is missing
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ManageTrainersList() {
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]);

    
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/trainers/fetch');
                const fetchedTrainers = response.data.map((trainer) => ({
                    id: trainer.id,
                    name: trainer.fullName,
                    experience: trainer.experience,
                    ratingsAverage: '4.5',
                    stars: '⭐⭐⭐⭐⭐',
                    rateByUsers: '(10,321)',
                    technologies: trainer.technologies ? trainer.technologies.join(', ') : 'Not specified',
                    profileImage: trainer.profilePic
                        ? `data:image/png;base64,${trainer.profilePic}`
                        : profileImagePlaceholder,
                }));
                setTrainers(fetchedTrainers);
            } catch (error) {
                console.error('Error fetching trainers data:', error);
            }
        };
    
        fetchTrainers();
    }, []);
    
    const handleDeleteCourse = async (trainerId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this course?');
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`http://localhost:8080/trainers/delete/${trainerId}`);
            if (response.status === 200) {
                alert('Trainer deleted successfully!');
                setTrainers((prevTrainers) => prevTrainers.filter((trainer) => trainer.id !== trainerId));
            } else {
                alert('Failed to delete the trainer. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting the trainer:', error);
            alert('An error occurred while trying to delete the trainer.');
        }
    };
    

    const handleTrainerEditClick = (trainerId) => {
        navigate(`/admin-profile/edit-trainers/${trainerId}`)
    };

    const handleTrainerAddClick = () => {
        navigate('/admin-add-trainer', { state: { trainerId: null } });
    };
    


    return (
        <div className="trainers-list-container">
            <div className="admin-welcome">
                <h1>Hello, Admin!</h1>
                <p>Trainer's List</p>
            </div>

            <Search />
            <button onClick={handleTrainerAddClick} className="add__new-trainer-btn">
                Add New Trainer
            </button>

            <div className="ad__trainers-list">
                {trainers.length > 0 ? (
                    trainers.map((trainer, index) => (
                        <div key={index} className="ad__trainer-list-card">
                            <img className="trainer-profile" src={trainer.profileImage} alt={`${trainer.name} profile`} />
                            <div className="trainer-details-data">
                                <h3>{trainer.name}</h3>
                                <p>Experience: {trainer.experience}</p>
                                <p>Ratings: {trainer.ratingsAverage} {trainer.stars} {trainer.rateByUsers}</p>
                                <p>Technologies: {trainer.technologies}</p>
                            </div>
                            <button onClick={() => handleTrainerEditClick(index)} className="ad_edit_tr-btn">
                                <img src={editIcon} alt="edit" />
                            </button>
                            <button onClick={() => handleDeleteCourse(trainer.id)} className="ad_delete_course-btn">
                                                      <img src={deleteIcon} alt="delete" />
                          </button>
                        </div>
                    ))
                ) : (
                    <p>No trainers available.</p>
                )}
            </div>
        </div>
    );
}

export default ManageTrainersList;
