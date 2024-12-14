import React, { useState, useEffect, useContext } from 'react';
import './LoginWithMobile.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const findUserByEmail = async (url, method, body) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
    });
    return response.json();
};

const LoginWithEmail = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [userExists, setUserExists] = useState(false);
    const [userData, setUserData] = useState(null);
    const { setUserData: setGlobalUserData } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeRemaining]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value.trim());
    };

    const handleUserCheck = async (e) => {
        e.preventDefault();
        try {
            const response = await findUserByEmail(`http://localhost:8080/login/find-user-email/${email}`, 'GET');

            if (response && response === 'User not found') {
                setError('User not found!');
                setUserExists(false);
                setUserData(null);
            } else {
                setUserExists(true);
                setUserData(response);
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
            const response = await fetch('http://localhost:3001/send-otp-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
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
            const response = await fetch('http://localhost:3001/verify-otp-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
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
                <div className="login-container-email">
                    <h2 className="login-title-email">Login Form</h2>
                    {error && <p className="error-email">{error}</p>}

                    <form onSubmit={isOtpSent ? handleLogin : handleUserCheck}>
                        <label htmlFor="email" className="label-email">
                            Email:
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="input-email"
                                required
                            />
                        </label>
                        <br />

                        {isOtpSent && (
                            <>
                                <label htmlFor="otp" className="label-otp-email">
                                    OTP:
                                    <input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        className="input-otp-email"
                                        required
                                    />
                                </label>
                                <br />
                            </>
                        )}
                        <i> <a onClick={() => navigate('/login/mobile')}>Login With Mobile </a></i>
                        <br /><i><a onClick={() => navigate('/sstudent-or-trainer/sigunup')}>Don't have an account Signup </a></i>

                        <button type="submit" className="login-btn-email">
                            {isOtpSent ? 'Login' : 'Get OTP'}
                        </button>

                        {isOtpSent && timeRemaining > 0 && (
                            <p>Resend OTP in {timeRemaining} seconds</p>
                        )}

                    </form>

                    {userExists && userData && (
                        <div className="user-details-email">
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

export default LoginWithEmail;
