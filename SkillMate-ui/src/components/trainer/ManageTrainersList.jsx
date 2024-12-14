import React from 'react';
import './ManageTrainersList.css';
import Search from '../Search';
import editIcon from '../../assets/editIcon.png';
import profileImage from '../../assets/profilePic.jpg';
import { useNavigate } from 'react-router-dom';

function ManageTrainersList() {
    const navigate = useNavigate();
    const handleTrainerEditClick = () => {
        navigate('/admin-profile/edit-trainers', { state: { trainerId: '123' } });
    }
    const handleTrainerAddClick = () => {
        navigate('/admin-profile/edit-trainers', { state: { trainerId: '123' } });
    }
    const trainers = [
        { name: 'Trainer 1', experience: '8+ years', ratingsAverage: '4.5', stars: '⭐⭐⭐⭐⭐', rateByUsers: '(10,321)', technologies: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', profileImage },
        { name: 'Trainer 2', experience: '8+ years', ratingsAverage: '4.5', stars: '⭐⭐⭐⭐⭐', rateByUsers: '(10,321)', technologies: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', profileImage },
        { name: 'Trainer 3', experience: '8+ years', ratingsAverage: '4.5', stars: '⭐⭐⭐⭐⭐', rateByUsers: '(10,321)', technologies: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', profileImage },
        { name: 'Trainer 4', experience: '8+ years', ratingsAverage: '4.5', stars: '⭐⭐⭐⭐⭐', rateByUsers: '(10,321)', technologies: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', profileImage },
        { name: 'Trainer 5', experience: '8+ years', ratingsAverage: '4.5', stars: '⭐⭐⭐⭐⭐', rateByUsers: '(10,321)', technologies: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', profileImage },
    ];

    return (
        <div className="trainers-list-container">
            <div className="admin-welcome">
                <h1>Hello, Admin!</h1>
                <p>Trainer's List</p>
            </div>

            <Search />
            <button onClick={handleTrainerAddClick} className='add__new-trainer-btn'>Add New Trainer</button>

            <div className="ad__trainers-list">
                {trainers.map((trainer, index) => (
                    <div key={index} className="ad__trainer-list-card">
                        <img className="trainer-profile" src={trainer.profileImage} alt={`${trainer.name} profile`} />
                        <div className="trainer-details-data">
                            <h3>{trainer.name}</h3>
                            <p>Experience: {trainer.experience}</p>
                            <p>Ratings: {trainer.ratingsAverage} {trainer.stars} {trainer.rateByUsers}</p>
                            <p>Technologies: {trainer.technologies}</p>
                        </div>
                        <button onClick={handleTrainerEditClick} className="ad_edit_tr-btn">
                            <img src={editIcon} alt="edit" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageTrainersList;
