
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import urls from '../urls/Urls';
// import './LoginWithMobile.css';
// import { setEmail,setOtp,setIsOtpSent,setIsOtpVerified,setError, loginSuccess,} from '../redux/authSlice'; // Adjust the import path if needed

// const LoginWithEmail = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redux state
//   const { email, otp, isOtpSent, error } = useSelector((state) => state.auth);

//   // Function to send OTP to email
//   const handleSendOtp = async () => {
//     dispatch(setError(null)); // Clear any previous errors
//     try {
//       const response = await fetch(urls.login.sendOtpEmail, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         dispatch(setIsOtpSent(true));
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while sending OTP. Please try again.'));
//     }
//   };


//   const handleVerifyOtp = async () => {
//     dispatch(setError(null)); 
//     try {
//       const response = await fetch(urls.login.verifyOtpEmail, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         dispatch(loginSuccess(result)); // Update login state
//         dispatch(setIsOtpSent(false));
//         dispatch(setIsOtpVerified(true));
//         navigate('/student-profile'); // Navigate to the profile page
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while verifying OTP. Please try again.'));
//     }
//   };

//   return (
//     <div className="container mt-5 ">
//       <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', margin: '0 auto' }}>
//         <h2 className="text-center mb-4">Login with Email</h2>
//         {!isOtpSent ? (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => dispatch(setEmail(e.target.value))}
//                 placeholder="Enter your email"
//               />
//             </div>
//             <button className="btn btn-primary w-100" onClick={handleSendOtp}>
//               Send OTP
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="otp" className="form-label">OTP:</label>
//               <input
//                 type="text"
//                 id="otp"
//                 className="form-control"
//                 value={otp}
//                 onChange={(e) => dispatch(setOtp(e.target.value))}
//                 placeholder="Enter the OTP"
//               />
//             </div>
//             <button className="btn btn-success w-100" onClick={handleVerifyOtp}>
//               Login
//             </button>
//           </div>
//         )}
//         {error && <p className="text-danger mt-3">{error}</p>}
//         <div className="mt-4 text-center">
//           <i>
//             <a onClick={() => navigate('/login/mobile')} className="text-decoration-none">
//               Login With Mobile
//             </a>
//           </i>
//           <br />
//           <i>
//             <a
//               onClick={() => navigate('/student-or-trainer/sigunup')}
//               className="text-decoration-none"
//             >
//               Don't have an account? Sign Up
//             </a>
//           </i>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginWithEmail;



// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import urls from '../urls/Urls';
// import './LoginWithMobile.css';
// import { setEmail, setOtp, setIsOtpSent, setIsOtpVerified, setError, loginSuccess } from '../redux/authSlice'; // Adjust the import path if needed

// const LoginWithEmail = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redux state
//   const { email, otp, isOtpSent, error } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(false);

 
//   const handleSendOtp = async () => {
//     dispatch(setError(null)); 
//     setLoading(true); 
//     try {
//       const response = await fetch(urls.login.sendOtpEmail, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         dispatch(setIsOtpSent(true));
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while sending OTP. Please try again.'));
//     } finally {
//       setLoading(false); // Stop loading after the API call
//     }
//   };

//   const handleVerifyOtp = async () => {
//     dispatch(setError(null)); 
//     setLoading(true); // Start loading
//     try {
//       const response = await fetch(urls.login.verifyOtpEmail, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         dispatch(loginSuccess(result)); 
//         dispatch(setIsOtpSent(false));
//         dispatch(setIsOtpVerified(true));
//         navigate('/student-profile'); 
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while verifying OTP. Please try again.'));
//     } finally {
//       setLoading(false); // Stop loading after the API call
//     }
//   };

//   return (
//     <div className="container mt-5 ">
//       <div className="card p-4 shadow-lg login-container-form">
//         <h2 className="text-center mb-4">Login with Email</h2>
//         {!isOtpSent ? (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => dispatch(setEmail(e.target.value))}
//                 placeholder="Enter your email"
//               />
//             </div>
//             <button
//               className="btn btn-primary w-100"
//               onClick={handleSendOtp}
//               disabled={loading} // Disable button while loading
//             >
//               {loading ? (
//                 <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
//               ) : (
//                 'Send OTP'
//               )}
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="otp" className="form-label">OTP:</label>
//               <input
//                 type="text"
//                 id="otp"
//                 className="form-control"
//                 value={otp}
//                 onChange={(e) => dispatch(setOtp(e.target.value))}
//                 placeholder="Enter the OTP"
//               />
//             </div>
//             <button
//               className="btn btn-success w-100"
//               onClick={handleVerifyOtp}
//               disabled={loading} // Disable button while loading
//             >
//               {loading ? (
//                 <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
//               ) : (
//                 'Login'
//               )}
//             </button>
//           </div>
//         )}
//         {error && <p className="text-danger mt-3">{error}</p>}
//         <div className="mt-4 text-center">
//           <i>
//             <a onClick={() => navigate('/login/mobile')} className="text-decoration-none">
//               Login With Mobile
//             </a>
//           </i>
//           <br />
//           <i>
//             <a
//               onClick={() => navigate('/student-or-trainer/sigunup')}
//               className="text-decoration-none"
//             >
//               Don't have an account? Sign Up
//             </a>
//           </i>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginWithEmail;





            
////////////////////////////
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import urls from '../urls/Urls';
import { setEmail, setOtp, setIsOtpSent, setIsOtpVerified, setError, loginSuccess } from '../redux/authSlice'; // Adjust the import path if needed

const LoginWithEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { email, otp, isOtpSent, error, userData } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async () => {
    dispatch(setError(null));
    setLoading(true);
    try {
      const response = await fetch(urls.login.sendOtpEmail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        dispatch(setIsOtpSent(true));
      } else {
        const errorMessage = await response.text();
        dispatch(setError(errorMessage));
      }
    } catch (err) {
      dispatch(setError('An error occurred while sending OTP. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    dispatch(setError(null));
    setLoading(true);
    try {
      const response = await fetch(urls.login.verifyOtpEmail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Save token and user data to Redux store
        dispatch(loginSuccess({ 
          token: result.token, 
          userData: result.userDetails 
        }));
  
        // Store token in localStorage (or keep it in Redux)
        localStorage.setItem('token', result.token); 
  
        // Navigate to the profile page after successful login
        dispatch(setIsOtpSent(false));
        dispatch(setIsOtpVerified(true));
        navigate('/login-profile'); // Navigate directly to profile page
      } else {
        const errorMessage = await response.text();
        dispatch(setError(errorMessage));
      }
    } catch (err) {
      dispatch(setError('An error occurred while verifying OTP. Please try again.'));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg login-container-form">
        <h2 className="text-center mb-4">Login with Email</h2>
        {!isOtpSent ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Enter your email"
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              ) : (
                'Send OTP'
              )}
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
            <button
              className="btn btn-success w-100"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              ) : (
                'Login'
              )}
            </button>
          </div>
        )}
        {error && <p className="text-danger mt-3">{error}</p>}

        <div className="mt-4 text-center">
          <i>
            <a onClick={() => navigate('/login/mobile')} className="text-decoration-none">
              Login With Mobile
            </a>
          </i>
          <br />
          <i>
            <a
              onClick={() => navigate('/student-or-trainer/sigunup')}
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

export default LoginWithEmail;
