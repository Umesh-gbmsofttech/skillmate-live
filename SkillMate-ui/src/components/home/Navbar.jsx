import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/skillmate1.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import ConfirmationDialog from '../utility/ConfirmationDialog';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const username = useSelector((state) => state.auth.username);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (username) {
      console.log(username);
    }
    if (userData) {
      console.log(userData.fullName);
      console.log(userData.roles);
    }
  }, [userData, username]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsConfirmDialogOpen(false);
    dispatch(logout());
    navigate('/');
  };

  const handleCancelLogout = () => {
    setIsConfirmDialogOpen(false);
  };

  const profilePicUrl = userData && userData.profilePic
    ? `data:image/jpeg;base64,${userData.profilePic}`
    : logo;

  const handleProfileClick = () => {
    if (username === 'ADMIN') {
      handleNavigation('/admin-profile');
    } else if (userData && userData.roles) {
      if (userData.roles[0] === 'TRAINER') {
        handleNavigation('/trainer-profile');
      } else if (userData.roles[0] === 'STUDENT') {
        handleNavigation('/student-profile');
      }
    }
  };

  return (
    <nav className="navbar-container custom-navbar">
      <div className="logo" onClick={() => handleNavigation('/')}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/courses')}>Courses</li>
        <li onClick={() => handleNavigation('/community')}>Community</li>
        <li onClick={() => handleNavigation('/resources')}>Resources</li>
        <li onClick={() => handleNavigation('/subscriptions')}>Subscription</li>
        <li onClick={() => handleNavigation('/contact')}>Contact</li>
        {isAuthenticated ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          ''
        )}
        <li className="notification-btn">🔔</li>
      </ul>

      {isAuthenticated ? (
        username !== 'ADMIN' ? (
          <div className="user-profile" onClick={handleProfileClick}>
            <img
              src={profilePicUrl}
              alt={userData ? userData.fullName : 'Profile'}
              className="user-profile-pic"
            />
          </div>
        ) : (
          <button
            onClick={() => handleNavigation('/admin-profile')}
            className="sign-in-btn"
          >
            Admin
          </button>
        )
      ) : (
        <button
          onClick={() => handleNavigation('/login/mobile')}
          className="sign-in-btn"
        >
          Sign In
        </button>
      )}

      <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        ☰
      </button>

      <ConfirmationDialog
        open={isConfirmDialogOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to log out?"
      />
    </nav>
  );
}

export default Navbar;
// import React, { useEffect, useState } from 'react';
// import './Navbar.css';
// import logo from '../../assets/skillmate1.jpg';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../redux/authSlice';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userData = useSelector((state) => state.auth.userData);
//   const username = useSelector((state) => state.auth.username); // for admin only
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


//   // Log user data for debugging (optional)
//   useEffect(() => {
//     if (username) {
//       console.log(username);
//     }
//     if (userData) {
//       console.log(userData.fullName);
//       console.log(userData.roles);
//     }
//   }, [userData, username]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };
//   const handleLogout = (route) => {
//     confirm(`Logout ${route}`) && dispatch(logout());
//     // dispatch(logout());
//     navigate(route);
//   };

//   // Fallback profile picture for users without one
//   const profilePicUrl = userData && userData.profilePic
//     ? `data:image/jpeg;base64,${userData.profilePic}`
//     : logo; // Fallback to the logo if no profile picture

//   const handleProfileClick = () => {
//     console.log('profiel click', username)
//     if (username || userData) {
//       if (username === 'ADMIN') {
//         handleNavigation('/admin-profile');
//       }

//       if (userData.roles) {
//         if (userData.roles[0] === 'TRAINER') {
//           handleNavigation('/trainer-profile');
//         } else if (userData.roles[0] === 'STUDENT') {
//           handleNavigation('/student-profile');
//         }
//       }
//     }
//   };

//   return (
//     <nav className="navbar-container custom-navbar">
//       <div className="logo" onClick={() => handleNavigation('/')}>
//         <img src={logo} alt="Logo" />
//       </div>
//       <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
//         <li onClick={() => handleNavigation('/')}>Home</li>
//         <li onClick={() => handleNavigation('/courses')}>Courses</li>
//         <li onClick={() => handleNavigation('/community')}>Community</li>
//         <li onClick={() => handleNavigation('/resources')}>Resources</li>
//         <li onClick={() => handleNavigation('/subscriptions')}>Subscription</li>
//         <li onClick={() => handleNavigation('/contact')}>Contact</li>
//         {isAuthenticated ? <li onClick={() => handleLogout('/')}>Logout</li> : ''}
//         <li className="notification-btn">🔔</li>
//       </ul>

//       {isAuthenticated ? (
//         username !== 'ADMIN' ? (
//           <div className="user-profile" onClick={handleProfileClick}>
//             <img
//               src={profilePicUrl}
//               alt={userData ? userData.fullName : 'Profile'}
//               className="user-profile-pic"
//             />
//           </div>
//         ) : (
//           <button
//             onClick={() => handleNavigation('/admin-profile')}
//             className="sign-in-btn"
//           >
//             Admin
//           </button>
//         )
//       ) : (
//         <button
//           onClick={() => handleNavigation('/login/mobile')}
//           className="sign-in-btn"
//         >
//           Sign In
//         </button>
//       )}

//       <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
//         ☰
//       </button>
//     </nav>
//   );
// }

// export default Navbar;
