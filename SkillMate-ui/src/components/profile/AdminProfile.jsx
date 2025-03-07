import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/skillmate.jpg';
import CustomButton from '../utility/CustomButton';
import { showWarningToast } from '../utility/ToastService';

function AdminProfile() {
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth.username) || 'Admin';
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        navigate('/admin-login');
        showWarningToast('Please login to access this page.');
        return;
    }

    return (
        <Box sx={ {
            textAlign: "center",
            fontFamily: "var(--font-p1)",
            bgcolor: "var(--color-p1)",
            minHeight: "100vh",
            p: 4
        } }>
            <Box sx={ {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "var(--color-p1)",
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: "90%",
                mx: "auto",
                mb: 3
            } }>
                <Avatar
                    src={ logo }
                    alt="Profile"
                    sx={ { width: 100, height: 100 } }
                />
                <Typography
                    variant="h5"
                    sx={ {
                        fontWeight: "bold",
                        color: "var(--color-p2)",
                        flexGrow: 1,
                        textAlign: "center",
                        fontSize: "var(--font-size-p1)",
                        fontFamily: 'var(--font-p1)',
                        ml: -5
                    } }
                >
                    Welcome, { username }
                </Typography>
            </Box>

            <Typography
                variant="h4"
                sx={ {
                    fontWeight: "bold",
                    mb: 4,
                    fontSize: "var(--font-size-p1)",
                    fontFamily: 'var(--font-p1)',
                } }
            >
                Manage
            </Typography>

            <Box sx={ {
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                bgcolor: "var(--color-p1)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                mx: "5%",
                mb: 4
            } }>
                { [
                    { label: "Trainers", route: "/admin-profile/manage-trainers" },
                    { label: "Students", route: "/admin-profile/manage-students" },
                    { label: "Courses", route: "/admin-profile/manage-courses" },
                    { label: "Batches", route: "/admin-profile/manage-batches" },
                ].map((item) => (
                    <CustomButton
                        key={ item.label }
                        text={ item.label }
                        width="100%"
                        padding="10px 20px"
                        onClick={ () => navigate(item.route) }
                    />
                )) }
            </Box>
        </Box>
    );
}

export default AdminProfile;
