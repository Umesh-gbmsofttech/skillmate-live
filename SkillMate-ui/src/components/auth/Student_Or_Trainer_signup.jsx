import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

function Student_Or_Trainer_signup() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleLoginBackClick = () => {
        navigate('/login/mobile');
    };

    const handleStudentSignUpClick = () => {
        navigate('/student-signup');
    };

    const handleTrainerSignUpClick = () => {
        navigate('/trainer-signup');
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)',
                zIndex: 999,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40vh',
                    maxWidth: '50vh',
                    width: '80%',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 4,
                    overflow: 'auto',
                    p: 2,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        mb: 2,
                        width: '100%',
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#45a049',
                            transform: 'translateY(-2px)',
                        },
                    }}
                    onClick={handleStudentSignUpClick}
                >
                    Sign Up as a Student
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        mb: 2,
                        width: '100%',
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#45a049',
                            transform: 'translateY(-2px)',
                        },
                    }}
                    onClick={handleTrainerSignUpClick}
                >
                    Sign Up as a Trainer
                </Button>
                <Typography
                    component="a"
                    sx={{
                        mt: 1,
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: '#f3f3f3',
                        },
                    }}
                    onClick={handleLoginBackClick}
                >
                    Back to Login
                </Typography>
            </Box>
        </Box>
    );
}

export default Student_Or_Trainer_signup;
