import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/skillmate1.jpg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <nav className="navbar-container custom-navbar">
      <div className="logo" onClick={() => handleNavigation('/')}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li onClick={() => handleNavigation('/test')}>Test</li>
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/courses')}>Courses</li>
        <li onClick={() => handleNavigation('/community')}>Community</li>
        <li onClick={() => handleNavigation('/resources')}>Resources</li>
        <li onClick={() => handleNavigation('/subscriptions')}>Subscription</li>
        <li onClick={() => handleNavigation('/contact')}>Contact</li>
        <button className="notification-btn">🔔</button>
      </ul>

      {username && username !== 'ADMIN' ? (
        <div className="user-profile" onClick={() => handleNavigation('/profile')}>
          <img
            src={'default-profile-pic.jpg'} // Ideally replace with dynamic user profile picture
            alt="Profile"
            className="user-profile-pic"
          />
        </div>
      ) : (
        <button
          onClick={() => handleNavigation(username === 'ADMIN' ? '/admin-profile' : '/login/mobile')}
          className="sign-in-btn"
        >
          {username === 'ADMIN' ? 'Admin' : 'Sign In'}
        </button>
      )}

      <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
