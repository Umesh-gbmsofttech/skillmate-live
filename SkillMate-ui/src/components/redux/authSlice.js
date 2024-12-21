import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
        username: null,
        email: null,
        mobile: '', // Initialize as an empty string
        otp: '', // Initialize as an empty string
        userData: null,
        error: null,
        isOtpSent: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.isAuthenticated = false;
            state.mobile = '';
            state.email = null;
            state.otp = '';
            state.userData = null;
            state.isOtpSent = false;
        },
        setMobile: (state, action) => {
            state.mobile = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setOtpSent: (state, action) => {
            state.isOtpSent = action.payload;
        }
    },
});

export const { loginSuccess, logout, setMobile, setEmail, setOtp, setUserData, setError, setOtpSent } = authSlice.actions;

export default authSlice.reducer;
