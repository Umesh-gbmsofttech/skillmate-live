import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions'; // Import the action
import './AddCourseForm.css';

function AddCourseForm() {
  const [courseName, setCourseName] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  // const trainers = useSelector((state) => state.trainers); // Assuming trainers are stored in the Redux state
  const [trainers, setTrainers] = useState([]); // Local state to store trainers

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare course data
    const courseData = new FormData();
    courseData.append('courseName', courseName);
    courseData.append('days', days);
    courseData.append('price', price);
    courseData.append('description', description);
    courseData.append('trainerId', trainerId);
    if (coverImage) {
      courseData.append('coverImage', coverImage);
    }

    try {
      const response = await axios.post('http://localhost:8080/courses/create', courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setCourses(response.data)); // Update Redux store
      navigate('/admin-profile/manage-courses'); // Redirect to courses page
    } catch (error) {
      console.error('Error uploading the course:', error);
      setError('Failed to add the course. Please try again.');
    }
  };

  // Fetch trainer list (if not already available in Redux store)
  useEffect(() => {
    if (!trainers || trainers.length === 0) {
      axios.get('http://localhost:8080/trainers/fetch')
        .then((response) => {
          // Dispatch to save trainers in Redux store
          // dispatch({ type: 'SET_TRAINERS', payload: response.data });
          setTrainers(response.data);
        })
        .catch((err) => console.error('Error fetching trainers:', err));
    }
  }, [trainers, dispatch]);
  // }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
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
          <label>Duration (in days):</label>
          <input
            type="text"
            value={days}
            onChange={(e) => setDays(e.target.value)}
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
        <div>
          <label>Trainer:</label>
          <select
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
          >
            <option value="">Select Trainer</option>
            {trainers && trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {"id: " + trainer.id + ", "} {"Name: " + trainer.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourseForm;
