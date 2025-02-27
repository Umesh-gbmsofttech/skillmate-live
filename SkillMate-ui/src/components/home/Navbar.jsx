import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import ConfirmationDialog from '../utility/ConfirmationDialog';
// import logo from '../../assets/skillmate.jpg';
import logo from '../../assets/skillmate3.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location

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

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
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

  const profilePicUrl = userData && userData.image
    ? `data:image/jpeg;base64,${userData.image}`
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

  // Function to check if the current path matches the link
  const isActiveLink = (linkPath) => location.pathname === linkPath;
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Community', path: '/community' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px" bgcolor="var(--color-p3)" color="var(--color-p1)" boxShadow="0 5px 10px rgba(0, 0, 0, 0.1)" position="relative">
      <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
        {/* <img src={logo} alt="Logo" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} /> */}
        <img src={logo} alt="Logo" width={'100%'} height={50} style={{ mixBlendMode: "multiply" }} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <Box display="flex" gap={2} fontSize="20px" fontWeight="bold" sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((link) => (
            <Typography
              key={link.path}
              onClick={() => handleNavigation(link.path)}
              sx={{
                fontFamily: "var(--font-p1)",
                fontSize: '1.2rem',
                position: 'relative',
                display: 'inline-block',
                // textDecoration: isActiveLink(link.path) ? 'underline' : 'none',
                '&:hover': {
                  color: 'var(--color-p1)',
                  cursor: 'pointer',
                },
                '&:hover::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isActiveLink(link.path) ? '100%' : '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-p1)',
                  transition: 'width 0.3s ease',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isActiveLink(link.path) ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'var(--color-p1)',
                  transition: 'width 0.3s ease',
                },
              }}
            >
              {link.label}
            </Typography>
          ))}
          {/* Logout button styling here should be revised as well.  Follow the pattern above */}
          {isAuthenticated && (
            <Typography
              onClick={handleLogout}
              sx={{
                fontFamily: "var(--font-p1)",
                fontSize: '1.2rem',
                position: 'relative',
                display: 'inline-block',
                '&:hover': {
                  color: 'var(--color-p1)',
                  cursor: 'pointer',
                },
                '&:hover::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-p1)',
                  transition: 'width 0.3s ease',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '0%',
                  height: '2px',
                  backgroundColor: 'var(--color-p1)',
                  transition: 'width 0.3s ease',
                },
              }}
            >
              Logout
            </Typography>
          )}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {isAuthenticated ? (
            username === 'ADMIN' ? (
              <Button onClick={() => handleNavigation('/admin-profile')} variant="outlined" color="inherit">
                {username}
              </Button>
            ) : (
              <IconButton onClick={handleProfileClick}>
                <Avatar src={profilePicUrl} alt={userData ? userData.fullName : 'Profile'} sx={{ width: 35, height: 35, '&:focus': { outline: 'none', border: 'none' } }} />
              </IconButton>
            )
          ) : (
            <Button sx={{ '&:focus': { outline: 'none', border: 'none' } }} onClick={() => handleNavigation('/login/mobile')} variant="outlined" color="inherit">
              Sign In
            </Button>
          )}
        </Box>

        {/* Hamburger Menu Icon for smaller screens */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
          {isAuthenticated ? (
            username === 'ADMIN' ? (
              <Button onClick={() => handleNavigation('/admin-profile')} variant="outlined" color="inherit">
                {username}
              </Button>
            ) : (
              <IconButton onClick={handleProfileClick} sx={{ '&:focus': { outline: 'none', border: 'none' } }}>
                <Avatar src={profilePicUrl} alt={userData ? userData.fullName : 'Profile'} sx={{ width: 35, height: 35, '&:focus': { outline: 'none', border: 'none' } }} />
              </IconButton>
            )
          ) : (
            <Button sx={{ '&:focus': { outline: 'none', border: 'none' } }} onClick={() => handleNavigation('/login/mobile')} variant="outlined" color="inherit">
              Sign In
            </Button>
          )}
          <IconButton sx={{ color: '#fff', '&:focus': { outline: 'none', border: 'none' } }} onClick={toggleMenu}>
            ☰
          </IconButton>
        </Box>
      </Box>



      {/* Mobile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/courses')}>Courses</MenuItem>
        <MenuItem onClick={() => handleNavigation('/community')}>Community</MenuItem>
        <MenuItem onClick={() => handleNavigation('/contact')}>Contact</MenuItem>
        {isAuthenticated && (
          <>
            <MenuItem onClick={() => handleNavigation('/subscriptions')}>Subscription</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        )}
      </Menu>

      {/* Confirmation Dialog for Logout */}
      <ConfirmationDialog
        open={isConfirmDialogOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to log out?"
      />
    </Box>
  );
}

export default Navbar;