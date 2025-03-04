import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import TopTrainersAndStudents from "../../trainer/TopTrainersAndStudents";

const Community = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <div>
      {/* About Section */}
      <Box
        sx={{
          p: 5,
          margin: '0 2%',
          mt: 2,
          textAlign: "center",
          borderRadius: 2,
          color: "var(--color-p2)",
          boxShadow: 3,
          fontFamily: "var(--font-p1)",
          backgroundColor: "var(--color-p4)",
          transition: "box-shadow 0.3s ease",
          ":hover": { boxShadow: 5 },
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom fontFamily={'var(--font-p2)'}>
          Welcome to SkillMate
        </Typography>
        <Typography fontWeight="bold" paragraph fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p2)'}>
          SkillMate is a premier training and placement platform offering 100% placement guarantee support. Our comprehensive programs include:
        </Typography>
        <Typography fontWeight="bold" paragraph fontSize={'var(--font-size-p3)'} fontFamily={'var(--font-p2)'} sx={{ padding: '0 10%' }}>
          Current Curriculum with Industry-aligned Courses
          Real-World Project Training with Expert Guidance
          Tailored Career Guidance and Mentorship
          Supportive Developer Community for Networking
          Placement Assistance with Top IT Companies
        </Typography>
        <Typography fontWeight="bold" fontSize={'var(--font-size-p2)'} fontFamily={'var(--font-p2)'}>
          Don't Wait! Enroll Today and Build Your IT Career!
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3,
          margin: "4% 2% 0% 2% ",
          mb: -8,
          backgroundColor: "var(--color-p4)",
          borderRadius: 3,
          textAlign: "center",
          boxShadow: 3,
          transition: "box-shadow 0.3s ease",
          ":hover": { boxShadow: 5 },
          fontFamily: "var(--font-p1)",
        }}
      >
        <Typography fontSize={'var(--font-size-p1)'} fontWeight="bold" color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
          Meet Our Expert Trainers
        </Typography>
        <Typography fontSize={'var(--font-size-p2)'} color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
          Our trainers are experienced working professionals with 8-10 years of industry experience.
          They are passionate about sharing their knowledge and expertise to help you grow in your IT career.
        </Typography>
      </Box>
      <TopTrainersAndStudents trainer={"trainer"} community={true} />

      <Box
        sx={{
          p: 3,
          margin: "4% 2% 0% 2% ",
          mb: -8,
          backgroundColor: "var(--color-p4)",
          borderRadius: 3,
          textAlign: "center",
          boxShadow: 3,
          transition: "box-shadow 0.3s ease",
          ":hover": { boxShadow: 5 },
          fontFamily: "var(--font-p1)",
        }}
      >
        <Typography variant="h4" fontSize={'var(--font-size-p1)'} fontWeight="bold" color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
          Meet Our Placed Students
        </Typography>
        <Typography fontSize={'var(--font-size-p2)'} color="var(--color-p2)" fontFamily={'var(--font-p2)'}>
          Our students are passionate learners who have honed their skills through hands-on experience and expert guidance. They are ready to make a mark in the IT industry with their growing expertise.
        </Typography>
      </Box>
      <TopTrainersAndStudents student={"student"} community={true} />

    </div>
  );
};

export default Community;
