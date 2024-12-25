import React, { useContext, useState } from 'react';
import './StudentSignUp.css';
// import { GlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

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
    // const { setUserData } = useContext(GlobalContext);

    let navigate=useNavigate();

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
                    // setUserData(data);
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
        <div className="student-overlay">
            <div className="student-signup-form-container">
                <form className="student-signup-form" onSubmit={handleSubmit}>
                    <h2>Student Sign Up</h2>

                    {error && <p className="error-message">{error}</p>}

                    <div className="profile-pic-container">
                        {profilePic ? (
                            <div className="profile-pic-preview">
                                <img
                                    className="profile-pic"
                                    src={`data:image/jpeg;base64,${profilePic}`}
                                    alt="Profile Preview"
                                />
                            </div>
                        ) : (
                            <div className="profile-pic-placeholder">No Image Uploaded</div>
                        )}
                    </div>

                    <label>
                        Profile Picture:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            required
                        />
                    </label>

                    <label>
                        Name:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Mobile:
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Current Work Status:
                        <select
                            value={workingStatus}
                            onChange={(e) => setWorkingStatus(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="freelance">Freelance</option>
                            <option value="un-employeed">Unemployed</option>
                        </select>
                    </label>

                    <label>
                        Resume (PDF):
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                            required
                        />
                    </label>

                    <label>
                        Qualification:
                        <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" >Submit</button>
                </form>
                <Link to="/login/mobile">
                    Have a account? plz Login
                </Link>
            </div>
        </div>

    );
};

export default StudentSignUp;
