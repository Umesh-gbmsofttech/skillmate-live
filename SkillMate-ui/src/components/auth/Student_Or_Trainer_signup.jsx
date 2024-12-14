import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Student_Or_Trainer_signup.css';

function Student_Or_Trainer_signup() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleLoginBackClick = () => {
        navigate('/login/mobile');
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
                <i><a onClick={handleLoginBackClick}>Back to Login</a></i>
            </div>
        </div>
    );
}

export default Student_Or_Trainer_signup;
