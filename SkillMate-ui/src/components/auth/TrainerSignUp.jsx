import React, { useContext, useState } from 'react';
import './TrainerSignUp.css';
import { GlobalContext } from '../context/GlobalContext';

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
    const [error, setError] = useState(null);
    const { setUserData } = useContext(GlobalContext);

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !mobile || !email || !address || !qualification || !experience || !profilePic || !workStatus || technologies.length === 0) {
            setError('Please fill in all fields and upload a profile picture.');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        setError(null);

        const trainerData = {
            name,
            mobile,
            email,
            address,
            qualification,
            experience,
            workStatus,
            technologies,
            profilePic,
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

    const handleTechnologiesChange = (e) => {
        const selectedTechnologies = Array.from(e.target.selectedOptions, (option) => option.value);
        setTechnologies(selectedTechnologies);
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

    return (
        <div className="trainer-overlay">
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
                            <option value="un-employeed">Un Employeed</option>
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
                        Technologies:
                        <select
                            multiple
                            value={technologies}
                            onChange={handleTechnologiesChange}
                            required
                        >
                            <option value="Java">Java</option>
                            <option value="Spring Boot">Spring Boot</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                            <option value="Angular">Angular</option>
                            <option value="React Native">React Native</option>
                        </select>
                    </label>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TrainerSignUp;
