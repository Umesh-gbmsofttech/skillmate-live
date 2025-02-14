import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import Search from '../Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Loading';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Divider,
    Box,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import profileImagePlaceholder from '../../assets/profilePic.jpg';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl'


function ManageBatches() {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [batchToDelete, setBatchToDelete] = useState(null);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`${baseUrl}/batches/fetch`);
                const fetchedBatches = response.data.map((batch) => ({
                    id: batch.id,
                    courseName: batch.course?.map(course => course.courseName).join(', ') || 'Not specified',
                    trainerNames: batch.trainer?.map(trainer => trainer.fullName).join(', ') || 'Not specified',
                    trainerProfilePic: batch.trainer?.map(trainer => trainer.profilePic).join(', ') || null,
                    courseCoverImage: batch.course?.map(course => course.coverImage).join(', ') || null,
                    studentsCount: batch.students?.length || 0,
                }));
                setBatches(fetchedBatches);
            } catch (error) {
                showErrorToast('Error fetching batches');
            } finally {
                setLoading(false);
            }
        };

        fetchBatches();
    }, []);

    // Initialize Fuse.js
    const fuse = new Fuse(batches, {
        keys: ['courseName', 'trainerNames', 'id'],
        threshold: 0.3, // Adjust for better fuzzy searching
    });

    // Get filtered results using Fuse.js
    const filteredBatches = searchQuery
        ? fuse.search(searchQuery).map(result => result.item)
        : batches;

    const handleDeleteBatch = (batchId) => {
        setBatchToDelete(batchId);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (batchToDelete) {
            try {
                const response = await axios.delete(`${baseUrl}batches/delete/${batchToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Batch deleted successfully!');
                    setBatches((prevBatches) => prevBatches.filter((batch) => batch.id !== batchToDelete));
                    setSearchQuery(''); // Clear search query
                } else {
                    showInfoToast('Failed to delete the batch. Please try again.');
                }
            } catch (error) {
                showErrorToast('Unable To Delete something went wrong!');
            }
        }
        setIsConfirmDialogOpen(false); // Close the confirmation dialog
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false); // Close the confirmation dialog without deleting
        setBatchToDelete(null); // Reset the batch ID
    };

    const handleBatchEditClick = (batchId) => {
        navigate(`/admin-profile/manage-batches/edit/${batchId}`);
    };

    const handleBatchCreateClick = () => {
        navigate('/admin-profile/manage-batches/create/new');
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h4" gutterBottom color='#3caacb' align="center">
                        Batches List
                    </Typography>

                    <Search onSearch={setSearchQuery} />
                    <Typography variant="body1" color="#3caacb" align="center" sx={{ marginBottom: 2 }}>
                        Number of Results: {filteredBatches?.length}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        <Button
                            onClick={handleBatchCreateClick}
                            color="primary"
                            variant="contained"
                        >
                            Create New Batch
                        </Button>
                    </Box>

                    <Grid container spacing={2}>
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map((batch) => (
                                <Grid item xs={12} sm={6} md={4} key={batch.id}>
                                    <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: '#f7f7f71b' }}>
                                        <ListItem
                                            secondaryAction={
                                                <>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => handleBatchEditClick(batch.id)}
                                                        aria-label="edit"
                                                    >
                                                        <EditIcon color='secondary' />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => handleDeleteBatch(batch.id)}
                                                        aria-label="delete"
                                                    >
                                                        <DeleteIcon color='warning' />
                                                    </IconButton>
                                                </>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={
                                                        batch?.trainerProfilePic
                                                            ? `data:image/jpeg;base64,${batch.trainerProfilePic}`
                                                            : batch?.courseCoverImage
                                                                ? `data:image/jpeg;base64,${batch.courseCoverImage}`
                                                                : profileImagePlaceholder
                                                    }
                                                    alt="Batch Profile"
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color="#3caacb" sx={{ fontWeight: 'bold' }}>
                                                        Course: {batch.courseName}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Box component="span" display="block" variant="body2" sx={{ color: '#F5EFFF' }}>
                                                            Batch ID: {batch.id}
                                                        </Box>
                                                        <Box component="span" display="block" variant="body2" sx={{ color: '#F5EFFF' }}>
                                                            Trainers: {batch.trainerNames}
                                                        </Box>
                                                        <Box component="span" display="block" variant="body2" sx={{ color: '#F5EFFF' }}>
                                                            Students Enrolled: {batch.studentsCount}
                                                        </Box>
                                                    </>
                                                }
                                            />

                                        </ListItem>
                                        <Divider />
                                    </Box>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary" align="center" sx={{ width: '100%' }}>
                                No batches available.
                            </Typography>
                        )}
                    </Grid>

                    <ConfirmationDialog
                        open={isConfirmDialogOpen}
                        onClose={handleCancel}
                        onConfirm={handleConfirmDelete}
                        message="Are you sure you want to delete this batch?"
                    />
                </Box>
            )}
        </>
    );
}

export default ManageBatches;
