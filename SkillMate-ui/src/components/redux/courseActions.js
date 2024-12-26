// courseActions.js

export const setCourses = (courses) => ({
  type: 'SET_COURSES',
  payload: courses,
});

export const updateCourse = (updatedCourse) => ({
  type: 'UPDATE_COURSE',
  payload: updatedCourse,
});
