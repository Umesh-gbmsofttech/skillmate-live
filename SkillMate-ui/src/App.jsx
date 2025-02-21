import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/home/Navbar';
import Contact from './components/contact/Contact';
import Courses from './components/courses/Courses';
import CardSection from './components/home/CardSection';
import StudentSignUp from './components/auth/StudentSignUp';
import TrainerSignUp from './components/auth/TrainerSignUp';
// import Footer from './components/home/Footer';
import Community from './components/home/community/Community';
import Subscription from './components/subscription/Subscription';
import DeleteProfile from './components/profile/DeleteProfile';
import OurTopCourses from './components/courses/OurTopCourses';
import ExploreAllCourses from './components/courses/ExploreAllCourses';
import TopTrainers from './components/trainer/TopTrainers';
import TestimonialsOfPlatformUsers from './components/home/TestimonialsOfPlatformUsers';
import TechnologyStack from './components/home/technologyStack/TechnologyStack';
import OurStudentsPlacedIn from './components/home/tieUpComponies/OurStudentsPlacedIn';
import StudentProfile from './components/profile/StudentProfile';
import TrainerProfile from './components/profile/TrainerProfile';
import AdminProfile from './components/profile/AdminProfile';
import TrainerProfileUpdate from './components/profile/TrainerProfileUpdate';
import StudentProfileUpdate from './components/profile/StudentProfileUpdate';
import ManageTrainersList from './components/trainer/ManageTrainersList';
import ManageStudentsList from './components/student/ManageStudentsList';
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
import Carousel from './components/home/Carousel';
// import LoginProfile from './components/auth/Profile';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageBatches from './components/admin/ManageBatches';
import CreateBatch from './components/admin/CreateBatch';
import UpdateBatch from './components/admin/UpdateBatch';
import EnquiryForm from './components/contact/EnquiryForm';
import { useSelector } from 'react-redux';
import ConfirmationDialog from './components/utility/ConfirmationDialog';
import Footer from './components/home/footer/Footer';
import SoftwareEngineer from './components/home/footer/career/SoftwareEngineer';
import FrontendDeveloper from './components/home/footer/career/FrontendDeveloper';
import BackendDeveloper from './components/home/footer/career/BackendDeveloper';
import FullstackDeveloper from './components/home/footer/career/FullstackDeveloper';
import UiUxDesign from './components/home/footer/explore/UiUxDesign';
import CollaborativeDesignTools from './components/home/footer/explore/CollaborativeDesignTools';
import DesignSystems from './components/home/footer/explore/DesignSystems';
import Prototyping_Wireframing from './components/home/footer/explore/Prototyping_Wireframing';
import WebDevelopmentTools from './components/home/footer/explore/WebDevelopmentTools';
import Chatbot from './components/home/chatbot/Chatbot';
import AssignCourseToTrainer from './components/admin/AssignCourseToTrainer';


function App() {

  const username = 'admin';
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showForm, setShowForm] = useState(true);

  // Function to open the form
  const openForm = () => {
    setShowForm(true); // Open form
  };

  // Function to close the form
  const closeForm = () => {
    // document.querySelector('.contact-us__enquiry-form-container-overlay').style.display = 'none';
    setShowForm(false); // Close form
  };

  useEffect(() => {
    if (!showForm) {
      const timer = setTimeout(() => {
        openForm(); // Open form after 5 seconds
      }, 100000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [showForm]);


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
            <Carousel />
            <ConfirmationDialog />
            {/* <CardSection /> */}
            <OurTopCourses />
            <ExploreAllCourses />
            <TopTrainers sectionHeading={'TOP TRAINERS'} trainer={'trainer'} />
            <TopTrainers sectionHeading={'Successfully placed students'} student={'student'} />
            {/* <TestimonialsOfPlatformUsers heading={'Testimonials of Platform Users'} /> */}
            <ReviewsSection />
            <TechnologyStack />
            <OurStudentsPlacedIn />
            <Chatbot />
          </>
        } />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login/email" element={<LoginWithEmail />} />
        <Route path="/login/mobile" element={<LoginWithMobile />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/trainer-signup" element={<TrainerSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-or-trainer/signup" element={<Student_Or_Trainer_signup />} />
        <Route path="/reviews-section" element={<ReviewsSection />} />
        <Route path="/community" element={<Community />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/about" element={<Footer />} />
        <Route path="/student-profile" element={<StudentProfile username />} />
        <Route path="/student-profile-update/:studentId" element={<StudentProfileUpdate username />} />
        <Route path="/trainer-profile" element={<TrainerProfile username />} />
        <Route path="/trainer-profile-update/:trainerId" element={<TrainerProfileUpdate username />} />
        <Route path="/admin-profile" element={<AdminProfile username />} />
        <Route path="/admin-profile/manage-trainers" element={<ManageTrainersList />} />
        <Route path="/admin-profile/manage-trainers/assign-course-to/trainer" element={<AssignCourseToTrainer />} />
        <Route path="/admin-profile/manage-students" element={<ManageStudentsList />} />
        <Route path="/admin-profile/edit-courses" element={<AdEditCourse />} />
        <Route path="/admin-profile/manage-courses" element={<ManageCoursesList />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />

        <Route path="/rating-reviews/page" element={<LeaveRatingReview />} />
        <Route path="/rating-reviews/page/card" element={<RatingCard />} />
        <Route path="/admin-profile/edit-course" element={<AddCourseForm />} />

        <Route path="/buy-course" element={<BuyCourse />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/admin-profile/manage-batches" element={<ManageBatches />} />
        <Route path="/admin-profile/manage-batches/create/new" element={<CreateBatch />} />
        <Route path="/admin-profile/manage-batches/edit/:batchId" element={<UpdateBatch />} />
        {/* <Route path="/rating_review_form" element={<RatingForm />} /> */}

        {/* Footer Career section */}
        <Route path="/careers/software-engineer" element={<SoftwareEngineer />} />
        <Route path="/careers/frontend-developer" element={<FrontendDeveloper />} />
        <Route path="/careers/backend-developer" element={<BackendDeveloper />} />
        <Route path="/careers/fullstack-developer" element={<FullstackDeveloper />} />
        {/* Footer Explore section */}
        <Route path="/explore/ui-ux-design" element={<UiUxDesign />} />
        <Route path="/explore/collaborative-design-tools" element={<CollaborativeDesignTools />} />
        <Route path="/explore/design-systems" element={<DesignSystems />} />
        <Route path="/explore/prototyping-wireframing" element={<Prototyping_Wireframing />} />
        <Route path="/explore/web-development-tools" element={<WebDevelopmentTools />} />

      </Routes>

      {showForm && !isAuthenticated && <EnquiryForm closeForm={closeForm} />}


      <ToastContainer
        // position="bottom-center"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Footer />
    </Router>

  );
}

export default App;
