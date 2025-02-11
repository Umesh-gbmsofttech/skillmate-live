import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import urls from '../urls/Urls';
import {
  setMobileNumber,
  setOtp,
  setIsOtpSent,
  setIsOtpVerified,
  setError,
  loginSuccess,
} from '../redux/authSlice';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

const LoginWithMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { mobileNumber, otp, isOtpSent, error } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async () => {
    dispatch(setError(null));
    setLoading(true);
    try {
      const response = await fetch(urls.login.sendOtpNumber, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber }),
      });

      if (response.ok) {
        dispatch(setIsOtpSent(true));
        showErrorToast(`${errorMessage}`);
      } else {
        const errorMessage = await response.text();
        dispatch(setError(errorMessage));
      }
    } catch (err) {
      dispatch(setError('An error occurred while sending OTP. Please try again.'));
      showErrorToast('An error occurred while sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    dispatch(setError(null));
    setLoading(true);
    try {
      const response = await fetch(`${urls.login.verifyOtpNumber}?identifier=${mobileNumber}&otp=${otp}&type=mobile`, {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        showSuccessToast('OTP verified successfully!');
        showSuccessToast(`welcome ${result.userData.fullName}`);
        // Save token and user data to Redux store
        dispatch(loginSuccess({
          token: result.token,
          userData: result.userData, // Adjusted to match your backend response structure
        }));

        // Store token in localStorage
        localStorage.setItem('token', result.token);

        // Navigate to the profile page after successful login
        dispatch(setIsOtpSent(false));
        dispatch(setIsOtpVerified(true));
        navigate('/'); // Redirect to the home page or your preferred page
      } else {
        const errorMessage = await response.text();
        dispatch(setError(errorMessage));
        showErrorToast(`${errorMessage}`);
      }
    } catch (err) {
      dispatch(setError('An error occurred while verifying OTP. Please try again.'));
      showErrorToast('An error occurred while verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Login with Mobile</h2>
        {!isOtpSent ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobileNumber"
                className="form-control"
                value={mobileNumber}
                onChange={(e) => dispatch(setMobileNumber(e.target.value))}
                placeholder="Enter your mobile number"
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="otp" className="form-label">
                OTP:
              </label>
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
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Login'
              )}
            </button>
          </div>
        )}
        {/* {error && <p className="text-danger mt-3">{error}</p>} */}
        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

        <div className="mt-4 text-center">
          <p className="mb-0">
            <a href="#"
              onClick={() => navigate('/login/email')}
              className="text-decoration-none"
            >
              Login With Email
            </a>
          </p>
          <p className="mb-0">
            <a href="#"
              onClick={() => navigate('/student-or-trainer/signup')}
              className="text-decoration-none"
            >
              Don't have an account? Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithMobile;
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import urls from '../urls/Urls';
// import {
//   setMobileNumber,
//   setOtp,
//   setIsOtpSent,
//   setIsOtpVerified,
//   setError,
//   loginSuccess,
// } from '../redux/authSlice';
// import './LoginWithMobile.css';
// import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../../ToastService';

// const LoginWithMobile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redux state
//   const { mobileNumber, otp, isOtpSent, error } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(false);

//   // Handle sending OTP
//   const handleSendOtp = async () => {
//     dispatch(setError(null));
//     setLoading(true);
//     try {
//       const response = await fetch(urls.login.sendOtpNumber, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       if (response.ok) {
//         dispatch(setIsOtpSent(true));
//         showErrorToast(`${errorMessage}`);
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while sending OTP. Please try again.'));
//       showErrorToast('An error occurred while sending OTP. Please try again.');

//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async () => {
//     dispatch(setError(null));
//     setLoading(true);
//     try {
//       const response = await fetch(`${urls.login.verifyOtpNumber}?identifier=${mobileNumber}&otp=${otp}&type=mobile`, {
//         method: 'POST',
//       });

//       if (response.ok) {
//         const result = await response.json();
//         // console.log(result.token);
//         // console.log(result.userData);
//         showSuccessToast('OTP verified successfully!');
//         showSuccessToast(`welcome ${result.userData.fullName}`);
//         // Save token and user data to Redux store
//         dispatch(loginSuccess({
//           token: result.token,
//           userData: result.userData, // Adjusted to match your backend response structure
//         }));

//         // Store token in localStorage
//         localStorage.setItem('token', result.token);

//         // Navigate to the profile page after successful login
//         dispatch(setIsOtpSent(false));
//         dispatch(setIsOtpVerified(true));
//         navigate('/'); // Redirect to the home page or your preferred page
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//         showErrorToast(`${errorMessage}`);
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while verifying OTP. Please try again.'));
//       showErrorToast('An error occurred while verifying OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card p-4 shadow-lg login-container-mobile">
//         <h2 className="text-center mb-4">Login with Mobile</h2>
//         {!isOtpSent ? (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="mobileNumber" className="form-label">
//                 Mobile Number:
//               </label>
//               <input
//                 type="text"
//                 id="mobileNumber"
//                 className="form-control"
//                 value={mobileNumber}
//                 onChange={(e) => dispatch(setMobileNumber(e.target.value))}
//                 placeholder="Enter your mobile number"
//               />
//             </div>
//             <button
//               className="btn btn-primary w-100"
//               onClick={handleSendOtp}
//               disabled={loading}
//             >
//               {loading ? (
//                 <span
//                   className="spinner-border spinner-border-sm"
//                   role="status"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 'Send OTP'
//               )}
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="otp" className="form-label">
//                 OTP:
//               </label>
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
//               disabled={loading}
//             >
//               {loading ? (
//                 <span
//                   className="spinner-border spinner-border-sm"
//                   role="status"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 'Login'
//               )}
//             </button>
//           </div>
//         )}
//         {/* {error && <p className="text-danger mt-3">{error}</p>} */}

//         <div className="mt-4 text-center">
//           <i>
//             <a
//               onClick={() => navigate('/login/email')}
//               className="text-decoration-none"
//             >
//               Login With Email
//             </a>
//           </i>
//           <br />
//           <i>
//             <a
//               onClick={() => navigate('/student-or-trainer/signup')}
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

// export default LoginWithMobile;
