import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/home/Navbar';
import Contact from './components/contact/Contact';
import Courses from './components/courses/Courses';
import CardSection from './components/home/CardSection';
import StudentSignUp from './components/auth/StudentSignUp';
import TrainerSignUp from './components/auth/TrainerSignUp';
import Footer from './components/home/Footer';
import Carausal from './components/home/Carausal';
import Community from './components/home/community/Community';
import Subscription from './components/subscription/Subscription';
import Live from './components/subscription/Live';
import DeleteProfile from './components/profile/DeleteProfile';
import Profile from './components/profile/Profile';
import OurTopCourses from './components/courses/OurTopCourses';
import ExploreAllCourses from './components/courses/ExploreAllCourses';
import TopTrainers from './components/trainer/TopTrainers';
import TestimonialsOfPlatformUsers from './components/home/TestimonialsOfPlatformUsers';
import TechnologyStack from './components/home/technologyStack/TechnologyStack';
import OurStudentsPlacedIn from './components/home/tieUpComponies/OurStudentsPlacedIn';
import Test from './components/home/Test';
import StudentProfile from './components/profile/StudentProfile';
import TrainerProfile from './components/profile/TrainerProfile';
import AdminProfile from './components/profile/AdminProfile';
import TrainerProfileUpdate from './components/profile/TrainerProfileUpdate';
import StudentProfileUpdate from './components/profile/StudentProfileUpdate';
import ManageTrainersList from './components/trainer/ManageTrainersList';
import ManageStudentsList from './components/student/ManageStudentsList';
import AdEditStudent from './components/student/Ad_EditStudent';
import AdEditTrainer from './components/trainer/Ad_EditTrainer';
import AdEditCourse from './components/courses/Ad_EditCourse';
import ManageCoursesList from './components/courses/ManageCoursesList';
import ReviewsSection from './components/rating-review/ReviewsSection';
import LeaveRatingReview from './components/rating-review/Leave_Rating_Review';
import RatingCard from './components/rating-review/RatingCard';
import LoginWithEmail from './components/auth/LoginWithEmail';
import LoginWithMobile from './components/auth/LoginWithMobile';
import Student_Or_Trainer_signup from './components/auth/Student_Or_Trainer_signup';
import AdminLogin from './components/auth/AdminLogin';
import AddCourseForm from './components/courses/AddCourseForm';
import BuyCourse from './components/subscription/BuyCourse';
import MyCourses from './components/courses/MyCourses';
import { CourseProvider } from './components/context/CourseContext';
// import LoginProfile from './components/auth/Profile';


function App() {

  const username = 'admin';

  // const trainerHeading = {
  //   name: 'John doe',
  //   trainerCardHeading: 'Body text for whatever you d like to say.'
  // }
  return (
    // debouncing throatling
    //rahulrathod2002
    
    

    <Router>
      {/* <Profile /> */}
      <Navbar />
      <Routes>
        <Route path="*" element={<h1 className='page-not-found-error-msg'>404 - Page Not Found</h1>} />
        <Route path="/" element={
          <>
            {/* home */}
            <Carausal />
            {/* <CardSection /> */}
            <OurTopCourses />
            <ExploreAllCourses />
            <TopTrainers sectionHeading={'TOP TRAINERS'} />
            <TopTrainers sectionHeading={'Successfully placed students'} />
            <TestimonialsOfPlatformUsers heading={'Testimonials of Platform Users'} />
            <ReviewsSection />
            <TechnologyStack />
            <OurStudentsPlacedIn />
          </>
        } />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login/email" element={<LoginWithEmail />} />
        <Route path="/login/mobile" element={<LoginWithMobile />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/trainer-signup" element={<TrainerSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-or-trainer/signup" element={<Student_Or_Trainer_signup />} />
        <Route path="/reviews-section" element={<ReviewsSection />} />
        <Route path="/community" element={<Community />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/live" element={<Live />} />
        <Route path="/about" element={<Footer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student-profile" element={<StudentProfile username />} />
        <Route path="/student-profile-update" element={<StudentProfileUpdate username />} />
        <Route path="/trainer-profile" element={<TrainerProfile username />} />
        <Route path="/trainer-profile-update" element={<TrainerProfileUpdate username />} />
        <Route path="/admin-profile" element={<AdminProfile username />} />
        <Route path="/admin-profile/manage-trainers" element={<ManageTrainersList />} />
        <Route path="/admin-profile/edit-trainers" element={<AdEditTrainer />} />
        <Route path="/admin-profile/manage-students" element={<ManageStudentsList />} />
        <Route path="/admin-profile/edit-students" element={<AdEditStudent />} />
        <Route path="/admin-profile/edit-courses" element={<AdEditCourse />} />
        <Route path="/admin-profile/manage-courses" element={<ManageCoursesList />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />

        <Route path="/rating-reviews/page" element={<LeaveRatingReview />} />
        <Route path="/rating-reviews/page/card" element={<RatingCard />} />
        <Route path="/admin-profile/edit-course" element={<AddCourseForm />} />

        <Route path="/buy-course" element={<BuyCourse />} />
        <Route path="/my-courses" element={<MyCourses />} />

        {/* <Route path="/login-profile" element={<LoginProfile />} /> */}

      </Routes>
      <Footer />
    </Router>
   
  );
}

export default App;
