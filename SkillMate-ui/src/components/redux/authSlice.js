import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    username: null,
    email: '',
    mobileNumber: '',
    otp: '',
    userData: null,  // Store user data (trainer or student)
    error: null, // Error message
    isOtpSent: false, // OTP sent status
    isOtpVerified: false, // OTP verification status
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username || state.username;
      state.isAuthenticated = true;
      state.userData = action.payload.userData; // Store user data here
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      state.mobileNumber = '';
      state.email = null;
      state.otp = '';
      state.userData = null;
      state.isOtpSent = false;
      state.isOtpVerified = false;
      state.error = null;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setIsOtpSent: (state, action) => {
      state.isOtpSent = action.payload;
    },
    setIsOtpVerified: (state, action) => {
      state.isOtpVerified = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetState: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.email = null;
      state.mobileNumber = '';
      state.otp = '';
      state.userData = null;
      state.error = null;
      state.isOtpSent = false;
      state.isOtpVerified = false;
    },
  },
});

export const { loginSuccess, logout, setMobileNumber, setEmail, setOtp, setIsOtpSent, setIsOtpVerified, setUserData, setError, resetState } = authSlice.actions;

export default authSlice.reducer;
