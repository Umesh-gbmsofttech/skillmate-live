import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import logo from '../../assets/skillmate1.jpg';

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

  // Function to check if the current path matches the link
  const isActiveLink = (linkPath) => location.pathname === linkPath;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px" bgcolor="#16404D" color="#A6CDC6" boxShadow="0 5px 10px rgba(0, 0, 0, 0.1)" position="relative">
      <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
        <img src={logo} alt="Logo" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <Box display="flex" gap={2} fontSize="20px" fontWeight="bold" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Typography
            onClick={() => handleNavigation('/')}
            sx={{
              position: 'relative',
              display: 'inline-block',
              textDecoration: isActiveLink('/') ? 'underline' : 'none', // For active link
              '&:hover': {
                color: '#F0F0F0',
                cursor: 'pointer',
              },
              '&:hover::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/') ? '0%' : '100%',
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/') ? '0%' : '0%', // Active link should show underline immediately
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
            }}
          >
            Home
          </Typography>

          <Typography
            onClick={() => handleNavigation('/courses')}
            sx={{
              position: 'relative',
              display: 'inline-block',
              textDecoration: isActiveLink('/courses') ? 'underline' : 'none',
              '&:hover': {
                color: '#F0F0F0',
                cursor: 'pointer',
              },
              '&:hover::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/courses') ? '0%' : '100%',
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/courses') ? '0%' : '0%', // Active link should show underline immediately
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
            }}
          >
            Courses
          </Typography>

          <Typography
            onClick={() => handleNavigation('/community')}
            sx={{
              position: 'relative',
              display: 'inline-block',
              textDecoration: isActiveLink('/community') ? 'underline' : 'none',
              '&:hover': {
                color: '#F0F0F0',
                cursor: 'pointer',
              },
              '&:hover::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/community') ? '0%' : '100%',
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/community') ? '0%' : '0%', // Active link should show underline immediately
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
            }}
          >
            Community
          </Typography>
          <Typography
            onClick={() => handleNavigation('/contact')}
            sx={{
              position: 'relative',
              display: 'inline-block',
              textDecoration: isActiveLink('/contact') ? 'underline' : 'none',
              '&:hover': {
                color: '#F0F0F0',
                cursor: 'pointer',
              },
              '&:hover::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/contact') ? '0%' : '100%',
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isActiveLink('/contact') ? '0%' : '0%', // Active link should show underline immediately
                height: '2px',
                backgroundColor: '#FF8C00',
                transition: 'width 0.3s ease',
              },
            }}
          >
            Contact
          </Typography>
          {isAuthenticated && (
            <>
              <Typography
                onClick={handleLogout}
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&:hover': {
                    color: '#F0F0F0',
                    cursor: 'pointer',
                  },
                  '&:hover::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#FF8C00',
                    transition: 'width 0.3s ease',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: '#FF8C00',
                    transition: 'width 0.3s ease',
                  },
                }}
              >
                Logout
              </Typography>
              {/* <IconButton sx={{ color: '#fff' }}>🔔</IconButton> */}
            </>
          )}
        </Box>

        {/* Profile or Sign In for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {isAuthenticated ? (
            username !== 'ADMIN' ? (
              <IconButton onClick={handleProfileClick}>
                <Avatar src={profilePicUrl} alt={userData ? userData.fullName : 'Profile'} sx={{ width: 35, height: 35 }} />
              </IconButton>
            ) : (
              <Button onClick={() => handleNavigation('/admin-profile')} variant="outlined" color="inherit">
                Admin
              </Button>
            )
          ) : (
            <Button onClick={() => handleNavigation('/login/mobile')} variant="outlined" color="inherit">
              Sign In
            </Button>
          )}
        </Box>

        {/* Hamburger Menu Icon for smaller screens */}
        <IconButton sx={{ display: { xs: 'block', md: 'none' }, color: '#fff' }} onClick={toggleMenu}>
          ☰
        </IconButton>

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
          vertical: 'bottom', // Positioning the menu directly below the icon
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
        <MenuItem onClick={() => handleNavigation('/resources')}>Resources</MenuItem>
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
