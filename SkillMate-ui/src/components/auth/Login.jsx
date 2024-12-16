import React, { useState, useEffect, useContext } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext'; // Import GlobalContext

// Function to fetch user data
const findUser = async (url, method, body) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
    });
    return response.json();
};

const Login = () => {
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [userExists, setUserExists] = useState(false);
    const [userData, setUserData] = useState(null);
    const { setUserData: setGlobalUserData } = useContext(GlobalContext);
    const navigate = useNavigate();

    // Set up OTP timer
    useEffect(() => {
        let timer;
        if (timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeRemaining]);

    const handleMobileChange = (e) => {
        setNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value.trim());
    };

    const handleUserCheck = async (e) => {
        e.preventDefault();
        try {
            const response = await findUser(`http://localhost:8080/login//find-user/${id}`, 'GET');

            if (response && response === 'User not found') {
                setError('User not found!');
                setUserExists(false);
                setUserData(null);
            } else {
                setUserExists(true);
                setUserData(response); // Store user data temporarily
                setError(null);
                sendOtp();
            }
        } catch (err) {
            setError('Error checking user');
            setUserExists(false);
        }
    };

    const sendOtp = async () => {
        try {
            const response = await fetch('http://localhost:8080/otp/sendOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ number }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsOtpSent(true);
                setTimeRemaining(60);
            } else {
                setError(data.error || 'Failed to send OTP');
            }
        } catch (error) {
            setError('Failed to send OTP');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/otp/verifyOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ number, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setGlobalUserData(userData);
                navigate('/');
            } else {
                setError(data.error || 'Invalid OTP');
            }
        } catch (error) {
            setError('Failed to verify OTP');
        }
    };

    return (
        <div>
            <div className="login-overlay">
                <div className="login-container-unique">
                    <h2 className="login-title-unique">Login Form</h2>
                    {error && <p className="error-unique">{error}</p>}

                    <form onSubmit={isOtpSent ? handleLogin : handleUserCheck}>
                        <label htmlFor="number" className="label-otp-unique">
                            Mobile Number:
                            <input
                                id="number"
                                type="text"
                                value={number}
                                onChange={handleMobileChange}
                                className="input-otp-unique"
                                required
                            />
                        </label>
                        <br />

                        {isOtpSent && (
                            <>
                                <label htmlFor="otp" className="label-otp-unique">
                                    OTP:
                                    <input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        className="input-otp-unique"
                                        required
                                    />
                                </label>
                                <br />
                            </>
                        )}

                        <button type="submit" className="login-btn-unique">
                            {isOtpSent ? 'Login' : 'Get OTP'}
                        </button>

                        {isOtpSent && timeRemaining > 0 && (
                            <p>Resend OTP in {timeRemaining} seconds</p>
                        )}

                        <br />
                        <span>Don't have an account? </span>
                        <button type="button" onClick={() => navigate('/stud_trainer_admin')} className="signup-btn-unique">Sign Up</button>
                    </form>

                    {userExists && userData && (
                        <div className="user-details">
                            <h3>User Details:</h3>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Phone: {userData.phoneNo || userData.moNo}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
