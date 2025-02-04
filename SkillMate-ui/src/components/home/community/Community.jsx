import React, { useEffect } from 'react';
import './Community.css';  // Import the CSS for the overall Community component
import TrainerSection from './TrainerSection'; // Import Trainer Section
import StudentSection from './StudentSection'; // Import Student Section
import TestimonialsOfPlatformUsers from '../TestimonialsOfPlatformUsers'; // Import Student Section
import { useNavigate } from 'react-router-dom';
import { clearCommunityData } from '../../redux/communityDataSlice';
import { useDispatch, useSelector } from 'react-redux';

const Community = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCommunityData());  // Clear selected trainer/student
  }, [token]);

  return (
    <div className="community-container">
      <section className="community-container-about-section">
        <div className="community-container-about-content">
          <h1 className="community-container-description-heading">Welcome to SkillMate</h1>
          <p className="community-container-description">
            SkillMate is a premier training and placement platform offering 100% placement guarantee support. Our comprehensive programs include:
          </p>
          <p className="community-container-description">
            Current Curriculum with Industry-aligned Courses
            Real-World Project Training with Expert Guidance
            Tailored Career Guidance and Mentorship
            Supportive Developer Community for Networking
            Placement Assistance with Top IT Companies
          </p>
          Don't Wait! Enroll Today and Build Your IT Career!
        </div>
      </section>

      {/* Render both Trainer and Student Sections */}
      <TrainerSection />  {/* Trainer section component */}
      <StudentSection />  {/* Student section component */}
      {/* <TestimonialsOfPlatformUsers heading={'What Our Community Says'} /> */}
    </div>
  );
};

export default Community;
