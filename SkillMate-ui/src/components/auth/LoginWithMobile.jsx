// import React, { useState, useEffect } from 'react';
// import './LoginWithMobile.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMobileNumber, setOtp, setUserData, setError } from '../redux/authSlice';
// import urls from '../urls/Urls';

// const LoginWithMobile = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const mobileNumber= useSelector((state) => state.auth.mobileNumber);
//     const otp = useSelector((state) => state.auth.otp);
//     const error = useSelector((state) => state.auth.error);
//     const isOtpSent = useSelector((state) => state.auth.isOtpSent);
//     const userData = useSelector((state) => state.auth.userData);

//     const [timeRemaining, setTimeRemaining] = useState(0);
//     const [userExists, setUserExists] = useState(false);

//     useEffect(() => {
//         let timer;
//         if (timeRemaining > 0) {
//             timer = setInterval(() => {
//                 setTimeRemaining((prev) => prev - 1);
//             }, 1000);
//         }
//         return () => clearInterval(timer);
//     }, [timeRemaining]);

//     const handleMobileChange = (e) => {
//         dispatch(setMobileNumber(e.target.value));
//     };

//     const handleOtpChange = (e) => {
//         dispatch(setOtp(e.target.value.trim()));
//     };

//     const sendOtp = async () => {
//         try {
//             const response = await fetch(urls.login.sendOtpNumber, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ mobileNumber }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 dispatch(setOtp(true));
//                 setIsotpSent(true)
//                 setTimeRemaining(60);
//             } else {
//                 dispatch(setError(data.error || 'Failed to send OTP'));
//             }
//         } catch (error) {
//             dispatch(setError('Failed to send OTP due to network issues'));
//         }
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(urls.login.verifyOtpNumber, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ mobileNumber, otp }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 dispatch(setUserData(data.user)); // Assuming response has user data
//                 navigate('/');
//             } else {
//                 dispatch(setError(data.error || 'Invalid OTP'));
//             }
//         } catch (error) {
//             dispatch(setError('Failed to verify OTP. Please try again later.'));
//             console.error('Error during OTP verification:', error);
//         }
//     };

//     return (
//         <div>
//             <div className="login-overlay">
//                 <div className="login-container-mobile">
//                     <h2 className="login-title-mobile">Login Form</h2>
//                     {error && <p className="error-mobile">{error}</p>}

//                     <form onSubmit={isOtpSent ? handleLogin : sendOtp}>
//                         <label htmlFor="mobile" className="label-mobile">
//                             Mobile Number:
//                             <input
//                                 id="mobile"
//                                 type="text"
//                                 value={mobileNumber || ''} // Fallback to an empty string
//                                 onChange={handleMobileChange}
//                                 className="input-mobile"
//                                 required
//                             />
//                         </label>
//                         <br />

//                         {isOtpSent && (
//                             <>
//                                 <label htmlFor="otp" className="label-otp">
//                                     OTP:
//                                     <input
//                                         id="otp"
//                                         type="text"
//                                         value={otp || ''} // Fallback to an empty string
//                                         onChange={handleOtpChange}
//                                         className="input-otp"
//                                         required
//                                     />
//                                 </label>
//                                 <br />
//                             </>
//                         )}
//                         <i>
//                             <a onClick={() => navigate('/login/email')}>Login With Email</a>
//                         </i>
//                         <br />
//                         <i>
//                             <a onClick={() => navigate('/student-or-trainer/sigunup')}>Don't have an account? Sign Up</a>
//                         </i>

//                         <button type="submit" className="login-btn-mobile">
//                             {isOtpSent ? 'Login' : 'Get OTP'}
//                         </button>

//                         {isOtpSent && timeRemaining > 0 && (
//                             <p>Resend OTP in {timeRemaining} seconds</p>
//                         )}
//                     </form>

//                     {userExists && userData && (
//                         <div className="user-details">
//                             <h3>User Details:</h3>
//                             <p>Name: {userData.name}</p>
//                             <p>Email: {userData.email}</p>
//                             <p>Phone: {userData.mobile || userData.mobile}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginWithMobile;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import urls from '../urls/Urls';
import './LoginWithMobile.css';
import {
  setMobileNumber,
  setOtp,
  setIsOtpSent,
  setIsOtpVerified,
  setError,
  loginSuccess,
} from '../redux/authSlice'; 

const LoginWithMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mobileNumber, otp, isOtpSent, error } = useSelector((state) => state.auth);

 
  const handleSendOtp = async () => {
  dispatch(setError(null)); 
  try {
    const response = await fetch(urls.login.sendOtpNumber, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber }),
    });

    if (response.ok) {
      dispatch(setIsOtpSent(true));
    } else {
      const errorMessage = await response.text();
      dispatch(setError(errorMessage));
    }
  } catch (err) {
    dispatch(setError('An error occurred while sending OTP. Please try again.'));
  }
};

  
  const handleVerifyOtp = async () => {
    dispatch(setError(null)); 
    try {
      const response = await fetch(urls.login.verifyOtpNumber, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(loginSuccess(result)); 
        dispatch(setIsOtpSent(false));
        dispatch(setIsOtpVerified(true));
        navigate('/student-profile'); 
      } else {
        const errorMessage = await response.text();
        dispatch(setError(errorMessage));
      }
    } catch (err) {
      dispatch(setError('An error occurred while verifying OTP. Please try again.'));
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="card p-4 shadow-lg login-container-mobile" >
        <h2 className="text-center mb-4">Login with Mobile</h2>
        {!isOtpSent ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                className="form-control input-otp:focus"
                value={mobileNumber}
                onChange={(e) => dispatch(setMobileNumber(e.target.value))}
                placeholder="Enter your mobile number"
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleSendOtp}>
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="otp" className="form-label">OTP:</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                value={otp}
                onChange={(e) => dispatch(setOtp(e.target.value))}
                placeholder="Enter the OTP"
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleVerifyOtp}>
              Login
            </button>
          </div>
        )}
        {error && <p className="text-danger mt-3">{error}</p>}
        <div className="mt-4 text-center">
          <i>
            <a onClick={() => navigate('/login/email')} className="text-decoration-none">
              Login With Email
            </a>
          </i>
          <br />
          <i>
            <a
              onClick={() => navigate('/student-or-trainer/signup')}
              className="text-decoration-none"
            >
              Don't have an account? Sign Up
            </a>
          </i>
        </div>
      </div>
    </div>
  );
};

export default LoginWithMobile;




 // components/LoginWithMobile.jsx
 