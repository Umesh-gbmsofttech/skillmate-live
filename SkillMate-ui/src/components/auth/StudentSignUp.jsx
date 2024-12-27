import React, { useState } from 'react';
import './StudentSignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { setUserData } from '../redux/authSlice';

const StudentSignUp = () => {
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [resume, setResume] = useState(null);
    const [workingStatus, setWorkingStatus] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    let navigate = useNavigate();

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
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.includes('pdf')) {
                setError('Please upload a valid PDF file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setResume(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName || !mobileNumber || !email || !address || !qualification || !profilePic || !resume || !workingStatus) {
            setError('Please fill in all fields and upload a profile picture and resume.');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        const studentData = { fullName, mobileNumber, email, address, qualification, profilePic, resume, workingStatus };

        fetch('http://localhost:8080/students/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text || 'An error occurred on the server.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    // Dispatch user data to Redux store
                    dispatch(setUserData(userData = data.userData));
                    setFullName('');
                    setMobileNumber('');
                    setEmail('');
                    setAddress('');
                    setQualification('');
                    setProfilePic(null);
                    setResume(null);
                    setWorkingStatus('');
                    setError(null);

                    alert('Student data submitted successfully!');
                    navigate("login/mobile");
                }
            })
            .catch((error) => {
                setError(error.message || 'An error occurred while submitting the form.');
            });
    };

    return (
        <div className="bootstrap-scope student-overlay">
            <div className="student-signup-form-container">
                <form className="student-signup-form" onSubmit={handleSubmit}>
                    <h2>Student Sign Up</h2>
                    {error && <p className="alert alert-danger">{error}</p>}

                    {/* Form Fields */}
                    <label>
                        Name:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>

                    <label>
                        Mobile:
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>

                    <label>
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>

                    <label>
                        Qualification:
                        <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <Link to="/login/mobile" className="btn btn-link">
                    Have an account? Please Login
                </Link>
            </div>
        </div>
    );
};

export default StudentSignUp;