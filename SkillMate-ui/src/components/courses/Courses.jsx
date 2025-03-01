import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../redux/coursesSlice';
import { fetchReviews } from '../redux/ratingReviewSlice';
import Fuse from 'fuse.js';
import { Card, Typography, Box, Rating, CircularProgress } from '@mui/material';
import logo from '../../assets/skillmate.jpg';
import Search from '../Search';
import Loading from '../../Loading';
import { showWarningToast } from '../utility/ToastService';
import editIcon from '../../assets/editIcon.png';
import referAndEarn from '../../assets/refer-earn.png';
import CustomButton from '../utility/CustomButton';

function Courses({ topCourses = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { courses, status, error } = useSelector((state) => state.courses);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews);
  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  useEffect(() => {
    courses.forEach((course) => {
      dispatch(fetchReviews({ courseId: course.id, token: localStorage.getItem('token') }));
    });
  }, [dispatch, courses]);

  const fuse = new Fuse(courses, {
    keys: ['title', 'description', 'price', 'days'],
    includeScore: true,
    threshold: 0.3,
  });

  const filteredCourses = searchQuery ? fuse.search(searchQuery).map((result) => result.item) : courses;

  const handleReferNowClick = () => showWarningToast('This feature is not available right now.');
  const handleCourseEditClick = (course) => navigate('/admin-profile/edit-courses', { state: { course } });
  const handleBuyNowClick = (course) => {
    if (!isAuthenticated) {
      showWarningToast('Please login to continue.');
      return;
    }
    navigate('/subscriptions', { state: { course } });
  };
  const handleContactUsClick = (course) => navigate('/contact', { state: { course } });
  const getCourseRating = (courseId) => {
    const courseReviews = reviews.filter((review) => review.course?.id === courseId);
    const totalReviews = courseReviews.length;
    const averageRating = totalReviews > 0 ? courseReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
    return { avg: averageRating.toFixed(1), count: totalReviews };
  };

  return (
    <div>
      {!topCourses ? (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: 'inline-block', padding: '0 80px', border: "none" }}>
            Explore a wide range of courses designed to help you succeed in the tech industry</Typography>
          <Search onSearch={setSearchQuery} />
        </Box>
      ) : (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: 'inline-block', padding: '0 80px', border: "none" }}>
            Top Courses</Typography>
          <Typography sx={{ textAlign: 'center', fontSize: 'var(--font-size-p2)', fontWeight: 'bold', fontFamily: 'var(--font-p2)', padding: '10px 68px 0 68px' }}>Courses designed for aspiring developers, this courses equips you with the skills and hands-on experience needed to excel in software development.</Typography>
        </Box>
      )}
      {status === 'loading' ? (
        <Loading />
      ) : error ? (
        <Typography color="error"></Typography>
      ) : filteredCourses.length > 0 ? (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
          padding: 2,
          width: '100%',
        }}>
          {filteredCourses.map((course) => {
            const { avg, count } = getCourseRating(course.id);
            return (
              <Card
                key={course.id}
                sx={{
                  // boxShadow: 3,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 2,
                  height: '100%',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p2)' }}>{course.title}</Typography>
                  <Typography sx={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p3)' }}>{course.description}</Typography>
                  <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p3)' }}>Duration: {course.days} Days</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    {reviewsLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <>
                        <Rating value={Number(avg)} readOnly precision={0.5} />
                        <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-p2)', fontSize: 'var(--font-size-p3)', marginLeft: 1 }}>({count})</Typography>
                      </>
                    )}
                  </Box>
                  {username === 'ADMIN' && (
                    <img onClick={() => handleCourseEditClick(course)} src={editIcon} alt="edit" style={{ width: 20, height: 20, cursor: 'pointer', position: 'absolute', top: 10, right: 10 }} />
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', paddingTop: 1 }}>
                  <CustomButton onClick={() => handleContactUsClick(course)} text="Contact Us" marginBottom={'4px'} width={'100%'} />
                  <CustomButton onClick={() => handleBuyNowClick(course)} text="BUY NOW" width={'100%'} />
                </Box>
              </Card>
            );
          })}
        </Box>
      ) : (
        <Typography>No courses available.</Typography>
      )}
      {!topCourses && (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 4, boxShadow: 3, borderRadius: 1, backgroundColor: 'var(--color-p4)', margin: '1% 1% 1% ', transition: "box-shadow 0.3s ease", ":hover": { boxShadow: 5 } }}>
          <Box>
            <Typography variant="h5" gutterBottom fontWeight={'bold'} color='var(--color-p2)'>Refer and Earn</Typography>
            <Typography variant="body1" gutterBottom color='var(--color-p2)'>Earn extra money by referring your friends and family to SkillMate.</Typography>
            <CustomButton onClick={handleReferNowClick} text="Refer Now" marginTop={2} />
          </Box>
          <Box>
            <img src={referAndEarn} alt="Refer and Earn" style={{ width: '20vh', height: '20vh' }} />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Courses;
