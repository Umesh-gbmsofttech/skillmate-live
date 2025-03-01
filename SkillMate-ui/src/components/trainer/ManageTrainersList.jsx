import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import profileImagePlaceholder from '../../assets/profilePic.jpg';
import { Grid, Typography, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import Search from '../Search';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import baseUrl from '../urls/baseUrl';
import CustomButton from '../utility/CustomButton';

function ManageTrainersList() {
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get(`${baseUrl}trainers`);
                console.log('res', response.data);
                const fetchedTrainers = response.data.map((trainer) => ({
                    id: trainer.id,
                    name: trainer.name,
                    experience: trainer.experience,
                    ratingsAverage: '4.5',
                    stars: '⭐⭐⭐⭐⭐',
                    rateByUsers: '(10,321)',
                    technologies: trainer.technologies ? trainer.technologies.join(', ') : 'Not specified',
                    image: trainer.image
                        ? `data:image/png;base64,${trainer.image}`
                        : profileImagePlaceholder,
                }));
                setTrainers(fetchedTrainers);
                setLoading(false);
            } catch (error) {
                showErrorToast('Error fetching trainers data!');
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    const fuse = new Fuse(trainers, {
        keys: ['name', 'technologies', 'experience'],
        threshold: 0.3,
        includeScore: true,
    });

    const filteredTrainers = searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : trainers;

    const handleDeleteTrainer = (trainerId) => {
        setTrainerToDelete(trainerId);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (trainerToDelete) {
            try {
                const response = await axios.delete(`${baseUrl}trainers/${trainerToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Trainer deleted successfully!');
                    setTrainers((prevTrainers) => prevTrainers.filter((trainer) => trainer.id !== trainerToDelete));
                    setSearchQuery('');
                } else {
                    showErrorToast('Failed to delete the trainer. Please try again.');
                }
            } catch (error) {
                showErrorToast('An error occurred while trying to delete the trainer.');
            }
            setIsConfirmDialogOpen(false);
        }
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false);
        setTrainerToDelete(null);
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Grid container spacing={3} sx={{ padding: 3, textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: 'inline-block', padding: '0 80px', border: "none" }}>
                            Trainer&apos;s List
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Search onSearch={setSearchQuery} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{ marginBottom: 2, fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)' }}>
                            Number of Results: {filteredTrainers.length}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CustomButton text={'New Registered Trainer'} onClick={() => navigate('/admin-profile/manage-trainers/assign-course-to/trainer')} />
                        <CustomButton text={'Add New Trainer'} onClick={() => navigate('/trainer-signup')} />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {filteredTrainers.length > 0 ? (
                                filteredTrainers.map((trainer) => (
                                    <Grid key={trainer.id} item xs={12} sm={6} md={4} lg={2.5}>
                                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                height="210"
                                                image={trainer.image}
                                                alt={`${trainer.name} profile`}
                                                sx={{ objectFit: 'cover', objectPosition: 'top' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }} style={{ padding: "8px" }} >
                                                <Typography sx={{ fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)', fontWeight: 'bold' }} gutterBottom>
                                                    {trainer.name}
                                                </Typography>
                                                <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                    Experience: {trainer.experience}
                                                </Typography>
                                                <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                    Ratings: {trainer.ratingsAverage} {trainer.stars} {trainer.rateByUsers}
                                                </Typography>
                                                <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                    Technologies: {trainer.technologies}
                                                </Typography>
                                                <Typography sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                    Trainer ID: {trainer.id}
                                                </Typography>
                                            </CardContent>
                                            <Grid container justifyContent="space-around" sx={{ marginBottom: '8px' }} spacing={1}>
                                                <Grid item>
                                                    <CustomButton text={'Edit'} padding={'5px 5px'} onClick={() => navigate(`/trainer-profile-update/${trainer.id}`)} />
                                                </Grid>
                                                <Grid item>
                                                    <CustomButton text={'Delete'} padding={'5px 5px'} color={'var(--color-p2)'} backgroundColor={'var(--color-p4)'} onClick={() => handleDeleteTrainer(trainer.id)} />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="body1" align="center" color="textSecondary">
                                        No trainers available.
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    <ConfirmationDialog
                        open={isConfirmDialogOpen}
                        onClose={handleCancel}
                        onConfirm={handleConfirmDelete}
                        message="Are you sure you want to delete this trainer?"
                    />
                </Grid>
            )}
        </>
    );
}

export default ManageTrainersList;
