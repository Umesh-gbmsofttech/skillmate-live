import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions'; // Import the action
import './AddCourseForm.css';

function AddCourseForm() {
  const [courseName, setCourseName] = useState('');
  const [days, setDays] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare course data
    const courseData = {
      courseName,
      days,
      time,
      price,
      description,
    };

    try {
      const response = await axios.post('http://localhost:8080/courses/create', courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      dispatch(setCourses(response.data)); // Update Redux store
      navigate('/admin-profile/manage-courses'); // Redirect to courses page
    } catch (error) {
      console.error('Error uploading the course:', error);
      setError('Failed to add the course. Please try again.');
    }
  };

  return (
    <div className="add-course-form-container">
      <h2>Add New Course</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourseForm;



