import React, { useContext, useState } from 'react';
import './TrainerSignUp.css';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

const TrainerSignUp = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [workStatus, setWorkStatus] = useState('');
    const [technologies, setTechnologies] = useState([]); 
    const [profilePic, setProfilePic] = useState(null);
    const [resume, setResume] = useState(null);  
    const [error, setError] = useState(null);
    const { setUserData } = useContext(GlobalContext);

    const handleTechnologiesChange = (e) => {
        const { value } = e.target;
        setTechnologies((prevTechnologies) => {
            if (prevTechnologies.includes(value)) {
                return prevTechnologies.filter((tech) => tech !== value);
            } else {
                return [...prevTechnologies, value];
            }
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
            };
            reader.readAsDataURL(file);
        }
    };

 
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'mobile') setMobile(value);
        if (name === 'email') setEmail(value);
        if (name === 'address') setAddress(value);
        if (name === 'qualification') setQualification(value);
        if (name === 'experience') setExperience(value);
        if (name === 'workStatus') setWorkStatus(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !mobile || !email || !address || !qualification || !experience || !profilePic || !workStatus || technologies.length === 0 || !resume) {
            setError('Please fill in all fields, upload a profile picture, and a resume.');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        setError(null);

        const technologiesString = technologies.join(',');

        const trainerData = {
            name,
            mobile,
            email,
            address,
            qualification,
            experience,
            workStatus,
            technologies: technologiesString, 
            profilePic,
            resume, 
        };

        try {
            const response = await fetch('http://localhost:8080/trainer/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trainerData),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Trainer data submitted successfully!');
                setUserData(result);
            } else {
                const errorText = await response.text();
                setError(`Error: ${errorText || 'Something went wrong. Please try again later.'}`);
            }
        } catch (error) {
            setError('Network error. Please check your connection or try again later.');
        }
    };
    
    return (
        <div className='trainer-overlay'>
            <div className="trainer-signup-form-container">
            <form className="trainer-signup-form" onSubmit={handleSubmit}>
                <h2>Trainer Sign Up</h2>

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
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Mobile:
                    <input
                        type="tel"
                        name="mobile"
                        value={mobile}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Qualification:
                    <input
                        type="text"
                        name="qualification"
                        value={qualification}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Experience (years):
                    <input
                        type="number"
                        name="experience"
                        value={experience}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Current Work Status:
                    <select
                        name="workStatus"
                        value={workStatus}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                        <option value="un-employeed">Unemployed</option>
                    </select>
                </label>

                <div className="selected-technologies">
                    <h4>Selected Technologies:</h4>
                    <div className="technologies-display">
                        {technologies.map((tech, index) => (
                            <span key={index} className="technology-tag">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <label>
                    Technologies:
                    <div className="technologies-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="Java"
                                checked={technologies.includes('Java')}
                                onChange={handleTechnologiesChange}
                            />
                            Java
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Spring Boot"
                                checked={technologies.includes('Spring Boot')}
                                onChange={handleTechnologiesChange}
                            />
                            Spring Boot
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="JavaScript"
                                checked={technologies.includes('JavaScript')}
                                onChange={handleTechnologiesChange}
                            />
                            JavaScript
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="React"
                                checked={technologies.includes('React')}
                                onChange={handleTechnologiesChange}
                            />
                            React
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Angular"
                                checked={technologies.includes('Angular')}
                                onChange={handleTechnologiesChange}
                            />
                            Angular
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="React Native"
                                checked={technologies.includes('React Native')}
                                onChange={handleTechnologiesChange}
                            />
                            React Native
                        </label>
                    </div>
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

                <button type="submit">Submit</button>
            </form>
            <Link to="/login/mobile">
                    Have a account? plz Login
             </Link>
        </div>
        </div>
    );
};

export default TrainerSignUp;
