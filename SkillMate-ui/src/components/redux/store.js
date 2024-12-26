import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import courseReducer from './courseSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: true, // Ensure that thunk is enabled for async actions
        }),
});

export default store;
