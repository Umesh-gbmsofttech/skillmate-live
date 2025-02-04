import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import urls from '../urls/Urls';
import {
  setEmail,
  setOtp,
  setIsOtpSent,
  setIsOtpVerified,
  setError,
  loginSuccess,
} from '../redux/authSlice';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';

const LoginWithEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { email, otp, isOtpSent, error } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
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
        showSuccessToast('OTP sent successfully!');
      } else {
        const errorMessage = await response.text();
        dispatch(setError(errorMessage));
        showErrorToast(`${errorMessage}`);
      }
    } catch (err) {
      dispatch(setError('An error occurred while sending OTP. Please try again.'));
      showErrorToast('An error occurred while sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    dispatch(setError(null));
    setLoading(true);
    try {
      const response = await fetch(`${urls.login.verifyOtpEmail}?identifier=${email}&otp=${otp}&type=email`, {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        showSuccessToast('OTP verified successfully!');
        showSuccessToast(`Welcome ${result.userData.fullName}`);
        dispatch(loginSuccess({
          token: result.token,
          userData: result.userData,
        }));
        localStorage.setItem('token', result.token);
        dispatch(setIsOtpSent(false));
        dispatch(setIsOtpVerified(true));
        navigate('/');
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login with Email</h2>
              {!isOtpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      value={otp}
                      onChange={(e) => dispatch(setOtp(e.target.value))}
                      placeholder="Enter the OTP"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Verify OTP'
                      )}
                    </button>
                  </div>
                </form>
              )}
              {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
              <div className="mt-4 text-center">
                <p className="mb-0">
                  <a href="#" onClick={() => navigate('/login/mobile')} className="text-decoration-none">
                    Login With Mobile
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" onClick={() => navigate('/student-or-trainer/signup')} className="text-decoration-none">
                    Don't have an account? Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithEmail;// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import urls from '../urls/Urls';
// import {
//   setEmail,
//   setOtp,
//   setIsOtpSent,
//   setIsOtpVerified,
//   setError,
//   loginSuccess,
// } from '../redux/authSlice';
// import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../../ToastService';


// const LoginWithEmail = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redux state
//   const { email, otp, isOtpSent, error } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(false);

//   // Handle sending OTP
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
//         showErrorToast(`${errorMessage}`);
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
//       const response = await fetch(`${urls.login.verifyOtpEmail}?identifier=${email}&otp=${otp}&type=email`, {
//         method: 'POST',
//       });

//       if (response.ok) {
//         const result = await response.json();
//         // console.log(result)
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
//         // navigate('/login-profile'); // Navigate directly to profile page
//         navigate('/'); //home
//       } else {
//         const errorMessage = await response.text();
//         dispatch(setError(errorMessage));
//         showErrorToast(`${errorMessage}`);
//       }
//     } catch (err) {
//       dispatch(setError('An error occurred while verifying OTP. Please try again.'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card p-4 shadow-lg login-container-form">
//         <h2 className="text-center mb-4">Login with Email</h2>
//         {!isOtpSent ? (
//           <div>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email:
//               </label>
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
//               onClick={() => navigate('/login/mobile')}
//               className="text-decoration-none"
//             >
//               Login With Mobile
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

// export default LoginWithEmail;

