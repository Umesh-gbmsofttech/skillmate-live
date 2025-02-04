// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import courseReducer from './courseSlice';
import communityDataReducer from './communityDataSlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    communityData: communityDataReducer, // Register the new reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Ensure that thunk is enabled for async actions
    }),
});

export default store;
