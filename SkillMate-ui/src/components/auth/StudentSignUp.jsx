import React, { useContext, useState } from 'react';
import './StudentSignUp.css';
import { GlobalContext } from '../context/GlobalContext'; // Ensure GlobalContext is imported

const StudentSignUp = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');
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
            if (file.size > 2 * 1024 * 1024) {  // Limit file size to 2MB
                setError('File size must be less than 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result.split(',')[1]); // Extract Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !mobile || !email || !address || !qualification || !profilePic) {
            setError('Please fill in all fields and upload a profile picture.');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        const studentData = { name, mobile, email, address, qualification, profilePic };

        fetch('http://localhost:8080/student/save', {
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
                    setUserData(data);
                    setName('');
                    setMobile('');
                    setEmail('');
                    setAddress('');
                    setQualification('');
                    setProfilePic(null);
                    setError(null);

                    console.log('Student saved successfully:', data);
                    alert('Student data submitted successfully!');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Mobile:
                        <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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
                        Qualification:
                        <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default StudentSignUp;
