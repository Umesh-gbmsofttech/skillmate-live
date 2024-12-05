import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/skillmate1.jpg';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCoursesClick = () => {
    navigate('/courses');
  };

  const handleCommunityClick = () => {
    navigate('/community');
  };

  const handleResourcesClick = () => {
    navigate('/resources');
  };

  const handleSubscriptionClick = () => {
    navigate('/subscriptions');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleCoursesClick}>Courses</li>
        <li onClick={handleCommunityClick}>Community</li>
        <li onClick={handleResourcesClick}>Resources</li>
        <li onClick={handleSubscriptionClick}>Subscription</li>
        <li onClick={handleContactClick}>Contact</li>
        <button className="notification-btn">🔔</button>
      </ul>

      {user ? (
        <div className="user-profile" onClick={handleProfileClick}>
          <img src={user.profilePic || 'default-profile-pic.jpg'} alt="Profile" className="user-profile-pic" />
        </div>
      ) : (
        <button onClick={handleSignInClick} className="sign-in-btn">Sign In</button>
      )}

      <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
