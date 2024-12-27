import React, { createContext, useState, useContext } from 'react';

// Create Context
const CourseContext = createContext();

// Provider Component
export const CourseProvider = ({ children }) => {
    const [purchasedCourses, setPurchasedCourses] = useState([]);

    const addCourse = (course) => {
        setPurchasedCourses([...purchasedCourses, course]);
    };

    return (
        <CourseContext.Provider value={{ purchasedCourses, addCourse }}>
            {children}
        </CourseContext.Provider>
    );
};

// Custom hook to use the course context
export const useCourses = () => useContext(CourseContext);

