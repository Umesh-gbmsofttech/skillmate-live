import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import urls from '../urls/Urls';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in all fields to continue.');
            return;
        }

        const adminData = { username, password };

        fetch(urls.admin.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        })
            .then((response) => {
                console.log('Response:', response);
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then((token) => {
                console.log('JWT Token:', token);
                if (token) {
                    alert('Admin login success!');
                    const username = 'ADMIN';
                    dispatch(loginSuccess({ token, username }));
                    navigate('/admin-profile');
                } else {
                    setError('Login failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Login failed. Please try again later.');
            });
    };

    return (
        <div className="admin-overlay">
           <div>
           {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-sign-up-container">
                <h2>Admin Login</h2>

                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
           </div>
        </div>
    );
};

export default AdminLogin;
