// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import coursesReducer from './coursesSlice';
import communityDataReducer from './communityDataSlice';
import myCoursesReducer from './myCoursesSlice';
import trainerCoursesReducer from './trainerCoursesSlice';
import trainerBatchesReducer from './trainerBatchesSlice';
import ratingReviewReducer from './ratingReviewSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    communityData: communityDataReducer,
    myCourses: myCoursesReducer,
    trainerCourses: trainerCoursesReducer,
    trainerBatches: trainerBatchesReducer,
    reviews: ratingReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
