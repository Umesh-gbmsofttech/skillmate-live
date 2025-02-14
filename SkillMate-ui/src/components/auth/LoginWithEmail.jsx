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
import baseUrl from '../urls/baseUrl'


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
      const response = await fetch(`${baseUrl}auth/otp/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      console.log(response)
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
      const response = await fetch(`${baseUrl}auth/verifyOtp?identifier=${email}&otp=${otp.trim()}&type=email`, {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        showSuccessToast('OTP verified successfully!');
        showSuccessToast(`Welcome ${result.userData.name}`);
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
    // <div className="container mt-5">
    //   <div className="row justify-content-center">
    //     <div className="col-md-6">
    //       <div className="card shadow">
    //         <div className="card-body">
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-lg">
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
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
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
              <button type="submit" className="btn btn-success w-100" disabled={loading}>
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
  );
};

export default LoginWithEmail;