import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    username: localStorage.getItem('username') || null,
    email: '',
    mobileNumber: '',
    otp: '',
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
    error: null,
    isOtpSent: false,
    isOtpVerified: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);

      // Check if userData exists in payload, otherwise fallback for Admin
      if (action.payload.userData) {
        state.username = action.payload.userData.name || state.username;
        state.userData = action.payload.userData;
        localStorage.setItem('userData', JSON.stringify(action.payload.userData));
      } else {
        // Admin case - only token is returned, so username is hardcoded or kept null
        state.username = 'ADMIN';
        state.userData = null;
        localStorage.removeItem('userData');
      }

      // Persist username in localStorage
      localStorage.setItem('username', state.username);

      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.username = null;
      localStorage.removeItem('username');
      state.isAuthenticated = false;
      state.mobileNumber = '';
      state.email = null;
      state.otp = '';
      state.userData = null;
      localStorage.removeItem('userData');
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

// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: localStorage.getItem('token') || null,
//     isAuthenticated: !!localStorage.getItem('token'),
//     username: null,
//     email: '',
//     mobileNumber: '',
//     otp: '',
//     userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null, // Safe check
//     error: null,
//     isOtpSent: false,
//     isOtpVerified: false,
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload.token;
//       localStorage.setItem('token', action.payload.token); // Persist token
//       state.username = action.payload.username || state.username;
//       state.isAuthenticated = true;
//       state.userData = action.payload.userData;
//       localStorage.setItem('userData', JSON.stringify(action.payload.userData)); // Persist userData
//     },
//     logout: (state) => {
//       state.token = null;
//       localStorage.removeItem('token'); // Clear token
//       state.username = null;
//       state.isAuthenticated = false;
//       state.mobileNumber = '';
//       state.email = null;
//       state.otp = '';
//       state.userData = null;
//       localStorage.removeItem('userData'); // Clear userData
//       state.isOtpSent = false;
//       state.isOtpVerified = false;
//       state.error = null;
//     },
//     setMobileNumber: (state, action) => {
//       state.mobileNumber = action.payload;
//     },
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },
//     setOtp: (state, action) => {
//       state.otp = action.payload;
//     },
//     setIsOtpSent: (state, action) => {
//       state.isOtpSent = action.payload;
//     },
//     setIsOtpVerified: (state, action) => {
//       state.isOtpVerified = action.payload;
//     },
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     resetState: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.username = null;
//       state.email = null;
//       state.mobileNumber = '';
//       state.otp = '';
//       state.userData = null;
//       state.error = null;
//       state.isOtpSent = false;
//       state.isOtpVerified = false;
//     },
//   },
// });

// export const { loginSuccess, logout, setMobileNumber, setEmail, setOtp, setIsOtpSent, setIsOtpVerified, setUserData, setError, resetState } = authSlice.actions;

// export default authSlice.reducer;

