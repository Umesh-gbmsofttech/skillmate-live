import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Stud_Trainer_Admin.css';

function Stud_Trainer_Admin() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleAdminSignUpClick = () => {
        navigate('/admin-signup');
    };

    const handleStudentSignUpClick = () => {
        navigate('/student-signup');
    };

    const handleTrainerSignUpClick = () => {
        navigate('/trainer-signup');
    };

    return (
        <div className="stud-trainer-overlay">
            <div className="stud-trainer-admin-container">
                <button className="stud-trainer-button" onClick={handleStudentSignUpClick}>Sign Up as a Student</button>
                <button className="stud-trainer-button" onClick={handleTrainerSignUpClick}>Sign Up as a Trainer</button>
                <button className="stud-trainer-button" onClick={handleAdminSignUpClick}>Sign Up as an Admin</button>
            </div>
        </div>
    );
}

export default Stud_Trainer_Admin;
