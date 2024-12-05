import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/home/Navbar';
import Contact from './components/contact/Contact';
import Courses from './components/courses/Courses';
import Login from './components/auth/Login';
import CardSection from './components/home/CardSection';
import StudentSignUp from './components/auth/StudentSignUp';
import TrainerSignUp from './components/auth/TrainerSignUp';
import ReviewsSection from './components/home/ReviewsSection';
import Footer from './components/home/Footer';
import Carausal from './components/home/Carausal';
import Community from './components/home/Community';
import Subscription from './components/subscription/Subscription';
import Live from './components/subscription/Live';
import DeleteProfile from './components/profile/DeleteProfile';
import Profile from './components/profile/Profile';
import AdminSignUp from './components/auth/AdminSiginUp';
import Stud_Trainer_Admin from './components/auth/Stud_Trainer_Admin';

function App() {
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
            <CardSection />
            <ReviewsSection />
          </>
        } />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/trainer-signup" element={<TrainerSignUp />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/stud_trainer_admin" element={<Stud_Trainer_Admin />} />
        <Route path="/reviews-section" element={<ReviewsSection />} />
        <Route path="/community" element={<Community />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/live" element={<Live />} />
        <Route path="/about" element={<Footer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
