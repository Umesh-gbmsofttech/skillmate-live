import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCourses } from '../redux/courseActions';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utility/ToastService';
import Fuse from 'fuse.js';
import { Card, CardContent, CardMedia, Button, Typography, Box, CircularProgress } from '@mui/material';
import logo from '../../assets/skillmate.jpg';
import referAndEarn from '../../assets/refer-earn.png';
import editIcon from '../../assets/editIcon.png';
import Search from '../Search';
import Loading from '../../Loading';

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses.courses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses/fetch', {
          headers: { 'Content-Type': 'application/json' },
        });
        showSuccessToast('Courses fetched successfully!');
        dispatch(setCourses(response.data));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses.');
        showErrorToast('Failed to fetch courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch]);

  // Fuse.js configuration for fuzzy search
  const fuse = new Fuse(courses, {
    keys: ['courseName', 'description', 'price', 'days'], // Fields to search
    includeScore: true, // Include match score
    threshold: 0.3, // Adjust for sensitivity (lower is stricter)
  });

  // Perform fuzzy search if query exists, otherwise return all courses
  const filteredCourses = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : courses;

  const handleCourseEditClick = (course) => navigate('/admin-profile/edit-courses', { state: { course } });
  const handleContactUsClick = (course) => navigate('/contact', { state: { course } });
  const handleBuyNowClick = (course) => {
    if (!isAuthenticated) {
      showWarningToast('Please login to continue.');
      navigate('/login/mobile');
      return;
    }
    navigate('/subscriptions', { state: { course } });
  };

  const handleReferNowClick = () => showWarningToast('This feature is not available right now. Please try again later.');

  return (
    <div>
      <Box sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom>
          Explore a wide range of courses designed to help you succeed in the tech industry
        </Typography>

        <Search onSearch={setSearchQuery} />

        {loading ? (
          <Loading />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : filteredCourses.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
            {filteredCourses.map((course) => (
              <Card key={course.id} sx={{ width: 300, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="340"
                  image={`data:image/jpeg;base64,${course?.coverImage}` || logo}
                  alt={course.courseName || 'Course Image'}
                />
                <CardContent>
                  <Typography variant="h6">{course.courseName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.days} | Rating: {course.rating}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleContactUsClick(course)}
                    sx={{ mb: 1 }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuyNowClick(course)}
                  >
                    BUY NOW
                  </Button>
                </Box>
                {username === 'ADMIN' && (
                  <Box sx={{ position: 'sticky', top: '90%', right: '5%' }}>
                    <img
                      onClick={() => handleCourseEditClick(course)}
                      src={editIcon}
                      alt="edit"
                      style={{ width: 20, height: 20, cursor: 'pointer' }}
                    />
                  </Box>
                )}
              </Card>
            ))}
          </Box>
        ) : (
          <Typography>No courses available.</Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 4, border: 1, borderRadius: 1 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Refer and Earn
          </Typography>
          <Typography variant="body1" gutterBottom>
            Earn extra money by referring your friends and family to SkillMate. Share your referral link and get 10% off your first purchase.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReferNowClick}
            sx={{ mt: 2 }}
          >
            Refer Now
          </Button>
        </Box>
        <Box>
          <img src={referAndEarn} alt="Refer and Earn" style={{ width: '20vh', height: '20vh' }} />
        </Box>
      </Box>
    </div>
  );
}

export default Courses;
