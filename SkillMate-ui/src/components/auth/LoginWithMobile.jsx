import React, { useState, useEffect, useContext } from 'react';
import './LoginWithMobile.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const findUser = async (url, method, body) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
    });
    return response.json();
};

const LoginWithMobile = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(true);
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

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value.trim());
    };

    // const handleUserCheck = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await findUser(`http://localhost:8080/students/fetch/${id}`, 'GET');

    //         if (response && response === 'User not found') {
    //             setError('User not found!');
    //             setUserExists(false);
    //             setUserData(null);
    //         } else {
    //             setUserExists(true);
    //             setUserData(response);
    //             setError(null);
    //             sendOtp();
    //         }
    //     } catch (err) {
    //         setError('Error checking user');
    //         setUserExists(false);
    //     }
    // };

    const handleUserCheck = async (e) => {
        e.preventDefault();
        try {
            const response = await findUser(`http://localhost:8080/otp/fetch/${mobile}`, 'GET');
    
            if (response && response === 'User not found') {
                setError('User not found!');
                setUserExists(false);
                setUserData(null);
            } else {
                setUserExists(true);
                setUserData(response);
                setError(null);
                await sendOtp(); // Send OTP only if user exists
            }
        } catch (err) {
            setError('Error checking user');
            setUserExists(false);
        }
    };
    

    // const sendOtp = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/otp/sendOtp', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ mobile }),
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             setIsOtpSent(true);
    //             setTimeRemaining(60);
    //         } else {
    //             setError(data.error || 'Failed to send OTP');
    //         }
    //     } catch (error) {
    //         setError('Failed to send OTP');
    //     }
    // };

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch('http://localhost:8080/otp/verifyOtp', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ mobile, otp }),
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             setGlobalUserData(userData);
    //             navigate('/');
    //         } else {
    //             setError(data.error || 'Invalid OTP');
    //         }
    //     } catch (error) {
    //         setError('Failed to verify OTP');
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/otp/verifyOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setGlobalUserData(userData);  
                navigate('/');  
            } else {
               
                setError(data.error || 'Invalid OTP');
            }
        } catch (error) {

            setError('Failed to verify OTP. Please try again later.');
            console.error('Error during OTP verification:', error); 
        }
    };
    
    
    const sendOtp = async () => {
        try {
            const response = await fetch('http://localhost:8080/otp/sendOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
               
                setIsOtpSent(true);
                setTimeRemaining(60);
            } else {
                
                setError(data.error || 'Failed to send OTP');
            }
        } catch (error) {
            
            setError('Failed to send OTP due to network issues');
        }
    };
    

    return (
        <div>
            <div className="login-overlay">
                <div className="login-container-mobile">
                    <h2 className="login-title-mobile">Login Form</h2>
                    {error && <p className="error-mobile">{error}</p>}

                    <form onSubmit={isOtpSent ? handleLogin : handleUserCheck}>
                        <label htmlFor="mobile" className="label-mobile">
                            Mobile Number:
                            <input
                                id="mobile"
                                type="text"
                                value={mobile}
                                onChange={handleMobileChange}
                                className="input-mobile"
                                required
                            />
                        </label>
                        <br />

                        {isOtpSent && (
                            <>
                                <label htmlFor="otp" className="label-otp">
                                    OTP:
                                    <input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        className="input-otp"
                                        required
                                    />
                                </label>
                                <br />
                            </>
                        )}
                        <i> <a onClick={() => navigate('/login/email')}>Login With Email </a></i>
                        <br /><i><a onClick={() => navigate('/student-or-trainer/sigunup')}>Don't have an account Signup </a></i>

                        <button type="submit" className="login-btn-mobile">
                            {isOtpSent ? 'Login' : 'Get OTP'}
                        </button>

                        {isOtpSent && timeRemaining > 0 && (
                            <p>Resend OTP in {timeRemaining} seconds</p>
                        )}

                    </form>

                    {userExists && userData && (
                        <div className="user-details">
                            <h3>User Details:</h3>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Phone: {userData.mobile || userData.mobile}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginWithMobile;
