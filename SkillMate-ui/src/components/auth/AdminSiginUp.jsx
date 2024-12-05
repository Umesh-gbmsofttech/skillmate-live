import React, { useState, useContext } from 'react';
import './AdminSignUp.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext'; // Import the GlobalContext

const AdminSignUp = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUserData } = useContext(GlobalContext); // Access setUserData from context

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !mobile || !email || !address || !profilePic) {
            setError('Please fill in all fields and upload a profile picture.');
            return;
        }

        const adminData = {
            name,
            mobile,
            email,
            address,
            profilePic: profilePic.split(',')[1]
        };

        fetch('http://localhost:8080/admin/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setUserData(data);
                    console.log('Admin data submitted successfully:', data);
                    alert('Admin data submitted successfully!');
                    navigate('/');
                } else {
                    setError('Sign up failed. Please try again.');
                }
            })
            .catch((error) => {
                setError('Sign up failed. Please try again.');
            });
    };

    return (
        <div className="admin-overlay">
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-sign-up-container">
                <h2>Admin Sign Up</h2>
                <div className="profile-pic-container">
                    {profilePic ? (
                        <img src={profilePic} alt="Profile Preview" className="profile-pic" />
                    ) : (
                        <div className="profile-pic-placeholder">No Image</div>
                    )}
                </div>
                <label>
                    Profile Picture:
                    <input type="file" accept="image/*" onChange={handleFileChange} required />
                </label>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Mobile Number:
                    <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdminSignUp;
