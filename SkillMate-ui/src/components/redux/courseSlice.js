


import { FETCH_COURSES_SUCCESS, SET_COURSES, UPDATE_COURSE, ADD_TO_MY_COURSES } from './courseActions';

const initialState = {
  courses: [],  // Initialize with an empty array
    
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,  // Set courses directly from the payload
      };

    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        ),
      };

      case FETCH_COURSES_SUCCESS:
        return {
          ...state,
          courses: action.payload,
        };

        case ADD_TO_MY_COURSES:
      return {
        ...state,
        myCourses: [...state.myCourses, action.payload],  // Add the purchased course to myCourses
      };

  
      default:
        return state;
    
  }
};

export default courseReducer;
