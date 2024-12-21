import React, { useState, useEffect } from 'react';
import './LoginWithMobile.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setOtp, setUserData, setError } from '../redux/authSlice';
import urls from '../urls/Urls';

const LoginWithEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useSelector((state) => state.auth.email);
    const otp = useSelector((state) => state.auth.otp);
    const error = useSelector((state) => state.auth.error);
    const isOtpSent = useSelector((state) => state.auth.isOtpSent);
    const userData = useSelector((state) => state.auth.userData);

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [userExists, setUserExists] = useState(false);

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
        dispatch(setEmail(e.target.value));
    };

    const handleOtpChange = (e) => {
        dispatch(setOtp(e.target.value.trim()));
    };

    const sendOtp = async () => {
        try {
            const response = await fetch(urls.login.sendOtpEmail, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(setOtp(true));
                setTimeRemaining(60);
            } else {
                dispatch(setError(data.error || 'Failed to send OTP'));
            }
        } catch (error) {
            dispatch(setError('Failed to send OTP due to network issues'));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(urls.login.verifyOtpEmail, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(setUserData(data.user));  // Assuming response has user data
                navigate('/');
            } else {
                dispatch(setError(data.error || 'Invalid OTP'));
            }
        } catch (error) {
            dispatch(setError('Failed to verify OTP. Please try again later.'));
            console.error('Error during OTP verification:', error);
        }
    };

    return (
        <div>
            <div className="login-overlay">
                <div className="login-container-email">
                    <h2 className="login-title-email">Login Form</h2>
                    {error && <p className="error-email">{error}</p>}

                    <form onSubmit={isOtpSent ? handleLogin : sendOtp}>
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
                        <i><a onClick={() => navigate('/login/mobile')}>Login With Mobile</a></i>
                        <br />
                        <i><a onClick={() => navigate('/student-or-trainer/sigunup')}>Don't have an account? Sign Up</a></i>

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
