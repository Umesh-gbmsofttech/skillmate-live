import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTrainer } from "../../redux/communityDataSlice";
import trainerImage from "../../../assets/skillmate.jpg";
import altImage from "../../../assets/skillmate.jpg";
import Loading from "../../../Loading";
import { showSuccessToast, showErrorToast } from "../../utility/ToastService";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Box,
    Container,
    Paper,
} from "@mui/material";

const TrainerSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [trainers, setTrainers] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch("http://localhost:8080/trainers/fetch", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTrainers(data);
                    setLoading(false);
                    showSuccessToast("Data fetched successfully!");
                }
            } catch (error) {
                setError(`Error fetching trainers: ${error}`);
                showErrorToast(`Error fetching trainers: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, [dispatch, token]);

    const handleCardClick = (trainer) => {
        dispatch(setTrainer(trainer));
        navigate("/rating-reviews/page", { state: { trainer } });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {loading ? (
                <Loading />
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <>
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color='#3caacb'>
                        Meet Our Expert Trainers
                    </Typography>
                    {/* Info Section */}
                    <Box
                        sx={{
                            mt: 5,
                            p: 3,
                            backgroundColor: "#f5f5f5",
                            borderRadius: 2,
                            textAlign: "center",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                            Our Trainers
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Our trainers are experienced working professionals with 8-10 years of industry experience.
                            They are passionate about sharing their knowledge and expertise to help you grow in your IT career.
                        </Typography>
                    </Box>
                    <Grid container spacing={4} justifyContent="center" marginTop={3}>
                        {trainers.map((trainer, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        cursor: 'pointer',
                                        p: 2,
                                        borderRadius: 2,
                                        textAlign: "center",
                                        transition: "0.3s",
                                        backgroundColor: '#FBF5DD',
                                        "&:hover": {
                                            boxShadow: "0px 8px 16px rgba(254, 254, 254, 0.6)",
                                        },
                                        position: "relative",
                                    }}
                                    onClick={() => handleCardClick(trainer)}
                                >
                                    {/* Circular Avatar */}
                                    <Avatar
                                        src={trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : altImage}
                                        alt={trainer.fullName || "Trainer"}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mx: "auto",
                                            mt: -7,
                                            border: "4px solid #16404D",
                                            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
                                        }}
                                    />

                                    <CardContent sx={{ mt: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {trainer.fullName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {trainer.position}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {trainer.experience}+ years experience
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            sx={{ mt: 1, fontWeight: "bold" }}
                                        >
                                            Expertise: {trainer.technologies.join(", ")}
                                        </Typography>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default TrainerSection;
