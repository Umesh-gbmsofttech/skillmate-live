import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../redux/coursesSlice';
import Fuse from 'fuse.js';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import logo from '../../assets/skillmate.jpg';
import referAndEarn from '../../assets/refer-earn.png';
import editIcon from '../../assets/editIcon.png';
import Search from '../Search';
import Loading from '../../Loading';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import { showWarningToast } from '../utility/ToastService';

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const username = useSelector((state) => state.auth.username);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { courses, status, error } = useSelector((state) => state.courses);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  // Fuse.js configuration for fuzzy search
  const fuse = new Fuse(courses, {
    keys: ['title', 'description', 'price', 'days'],
    includeScore: true,
    threshold: 0.3,
  });

  const filteredCourses = searchQuery ? fuse.search(searchQuery).map((result) => result.item) : courses;

  const handleCourseEditClick = (course) => navigate('/admin-profile/edit-courses', { state: { course } });
  const handleContactUsClick = (course) => navigate('/contact', { state: { course } });
  const handleBuyNowClick = (course) => {
    if (!isAuthenticated) {
      showWarningToast('Please login to continue.');
      setIsConfirmDialogOpen(true);
      return;
    }
    navigate('/subscriptions', { state: { course } });
  };
  const handleOk = () => navigate('/login/mobile');
  const handleCancel = () => setIsConfirmDialogOpen(false);
  const handleReferNowClick = () => showWarningToast('This feature is not available right now.');

  return (
    <div>
      <Box sx={{ padding: 2, backgroundColor: '#1A2130' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#3B6790', textAlign: 'center' }}>
          Explore a wide range of courses designed to help you succeed in the tech industry
        </Typography>

        <Search onSearch={setSearchQuery} />

        {status === 'loading' ? (
          <Loading />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : filteredCourses.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
            {filteredCourses.map((course) => (
              <Card key={course.id} sx={{ width: 300, boxShadow: 3, backgroundColor: '#71BBB2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`data:image/jpeg;base64,${course?.image}` || logo}
                  alt={course.title || 'Course Image'}
                />
                <CardContent sx={{ padding: '0 16px' }}>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.days} Days of course
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {course.rating}
                  </Typography>
                </CardContent>
                {username === 'ADMIN' && (
                  <img
                    onClick={() => handleCourseEditClick(course)}
                    src={editIcon}
                    alt="edit"
                    style={{ width: 20, height: 20, cursor: 'pointer', position: 'relative', top: '0%', right: '-88%' }}
                  />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => handleContactUsClick(course)} sx={{ mb: 1 }}>
                    Contact Us
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleBuyNowClick(course)}>
                    BUY NOW
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography>No courses available.</Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 4, border: 1, borderRadius: 1, backgroundColor: '#FBF5DD' }}>
        <Box>
          <Typography variant="h5" gutterBottom>Refer and Earn</Typography>
          <Typography variant="body1" gutterBottom>Earn extra money by referring your friends and family to SkillMate.</Typography>
          <Button variant="contained" color="primary" onClick={handleReferNowClick} sx={{ mt: 2 }}>Refer Now</Button>
        </Box>
        <Box>
          <img src={referAndEarn} alt="Refer and Earn" style={{ width: '20vh', height: '20vh' }} />
        </Box>
      </Box>
    </div>
  );
}

export default Courses;
