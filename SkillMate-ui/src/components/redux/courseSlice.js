

// courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// courseReducer.js

const initialState = {
  courses: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_COURSES':
          return {
              ...state,
              courses: action.payload,
          };
          case 'UPDATE_COURSE':
            console.log("Updating course:", action.payload); // Debugging line
            return {
                ...state,
                courses: state.courses.map((course) =>
                    course._id === action.payload._id ? action.payload : course
                ),
            };
        
      default:
          return state;
  }
};

export default courseReducer;
