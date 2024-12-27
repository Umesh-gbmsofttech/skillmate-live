import axios from 'axios';

// Action Types
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const SET_COURSES = 'SET_COURSES';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const ADD_TO_MY_COURSES = 'ADD_TO_MY_COURSES';


// Action Creators
export const fetchCoursesSuccess = (courses) => ({
  type: FETCH_COURSES_SUCCESS,
  payload: courses,
});

export const setCourses = (courses) => ({
  type: SET_COURSES,
  payload: courses,
});

export const updateCourse = (updatedCourse) => ({
  type: UPDATE_COURSE,
  payload: updatedCourse,
});
export const addToMyCourses = (course) => ({
  type: ADD_TO_MY_COURSES,
  payload: course,
});



