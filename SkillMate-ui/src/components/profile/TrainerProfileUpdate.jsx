import React, { useState, useEffect } from 'react';
import './TrainerProfileUpdate.css';
import defaultProfilePic from '../../assets/skillmate.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TrainerProfileUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.auth.userData);
    const trainerid = userData.id;

    const [trainerData, setTrainerData] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        qualification: '',
        workStatus: '',
        experience: 0,
        technologies: [],
        companyName: '',
        profilePic: defaultProfilePic,
        resume: null,
    });
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        if (trainerid) {
            axios
                .get(`http://localhost:8080/trainers/fetch/${trainerid}`)
                .then((response) => {
                    setTrainerData((prev) => ({
                        ...prev,
                        ...response.data,
                        technologies: response.data.technologies || [],
                    }));
                })
                .catch((error) => console.error('Error fetching trainer data:', error));
        }
    }, [trainerid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrainerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
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

            // Create a new FileReader to convert the file to a byte array
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert base64 to byte[]
                const byteArray = new Uint8Array(reader.result);
                setFile(byteArray); // Store byte[] in state
            };
            reader.readAsArrayBuffer(file); // Read file as ArrayBuffer to get byte array
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
                setResumeFile(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTechnologiesChange = (e) => {
        const { value, checked } = e.target;
        setTrainerData((prev) => {
            const newTechnologies = checked
                ? [...prev.technologies, value]
                : prev.technologies.filter((tech) => tech !== value);
            return {
                ...prev,
                technologies: newTechnologies,
            };
        });
    };

    const handleSubmitClick = async () => {
        if (!trainerData.name || !trainerData.email) {
            setError('Name and Email are required.');
            return;
        }

        const formData = new FormData();
        if (file) formData.append('profilePic', file);
        if (resumeFile) formData.append('resume', resumeFile);

        Object.keys(trainerData).forEach((key) => {
            const value = key === 'technologies' ? trainerData[key].join(', ') : trainerData[key];
            formData.append(key, value);
        });

        try {
            await axios.put(`http://localhost:8080/trainers/update/${trainerid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Profile updated successfully!');
            navigate('/trainer-profile');
        } catch (error) {
            console.error('Error updating trainer data:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="trainer-profile-update">
            <h2>Update Profile</h2>
            <div className="profile-section">
                <label>
                    Profile Picture:
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <img
                        src={trainerData.profilePic || defaultProfilePic}
                        alt="Profile Preview"
                        className="profile-preview"
                    />
                </label>
            </div>

            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={trainerData.name}
                onChange={handleInputChange}
                required
            />

            <label>Mobile:</label>
            <input
                type="text"
                name="mobile"
                value={trainerData.mobile}
                onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={trainerData.email}
                onChange={handleInputChange}
                required
            />

            <label>Address:</label>
            <textarea
                name="address"
                value={trainerData.address}
                onChange={handleInputChange}
            />

            <label>Qualification:</label>
            <input
                type="text"
                name="qualification"
                value={trainerData.qualification}
                onChange={handleInputChange}
            />

            <label>Experience:</label>
            <input
                type="number"
                name="experience"
                value={trainerData.experience}
                onChange={handleInputChange}
            />

            <label>Work Status:</label>
            <select
                name="workStatus"
                value={trainerData.workStatus}
                onChange={handleInputChange}
            >
                <option value="">Select</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="freelance">Freelance</option>
                <option value="un-employed">Unemployed</option>
            </select>

            <div className="technologies-checkbox">
                <h5>Select Technologies:</h5>
                <label>
                    <input
                        type="checkbox"
                        value="Java"
                        checked={trainerData.technologies.includes('Java')}
                        onChange={handleTechnologiesChange}
                    />
                    Java
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Spring Boot"
                        checked={trainerData.technologies.includes('Spring Boot')}
                        onChange={handleTechnologiesChange}
                    />
                    Spring Boot
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="JavaScript"
                        checked={trainerData.technologies.includes('JavaScript')}
                        onChange={handleTechnologiesChange}
                    />
                    JavaScript
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="React"
                        checked={trainerData.technologies.includes('React')}
                        onChange={handleTechnologiesChange}
                    />
                    React
                </label>
            </div>

            <label>Upload Resume (PDF):</label>
            <input type="file" accept="application/pdf" onChange={handleResumeChange} />

            <button type="button" onClick={handleSubmitClick}>Submit</button>
        </div>
    );
};

export default TrainerProfileUpdate;
