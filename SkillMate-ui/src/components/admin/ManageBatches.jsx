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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import profileImagePlaceholder from '../../assets/profilePic.jpg';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

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
                const response = await axios.get('http://localhost:8080/batches/fetch');
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
                // console.error('Error fetching batches data:', error);
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
                const response = await axios.delete(`http://localhost:8080/batches/delete/${batchToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Batch deleted successfully!');
                    setBatches((prevBatches) => prevBatches.filter((batch) => batch.id !== batchToDelete));
                    setSearchQuery(''); // Clear search query
                } else {
                    showInfoToast('Failed to delete the batch. Please try again.');
                }
            } catch (error) {
                // console.error('Error deleting the batch:', error);
                showErrorToast(`Unable To Delete something went wrong!.`);
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
                    <Typography variant="h4" gutterBottom>
                        Hello, Admin!
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Batches List
                    </Typography>

                    <Search onSearch={setSearchQuery} />
                    <p className='col-12'>Number of Results: {filteredBatches?.length}</p>

                    <Box sx={{ marginBottom: 2 }}>
                        <IconButton
                            onClick={handleBatchCreateClick}
                            color="primary"
                            variant="contained"
                        >
                            Create New Batch
                        </IconButton>
                    </Box>

                    <List>
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map((batch) => (
                                <Box key={batch.id} sx={{ marginBottom: 2 }}>
                                    <ListItem
                                        secondaryAction={
                                            <>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleBatchEditClick(batch.id)}
                                                    aria-label="edit"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleDeleteBatch(batch.id)}
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
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
                                            primary={`Course: ${batch.courseName}`}
                                            secondary={
                                                <>
                                                    <Box component="span" display="block" variant="body2">
                                                        Batch ID: {batch.id}
                                                    </Box>
                                                    <Box component="span" display="block" variant="body2">
                                                        Trainers: {batch.trainerNames}
                                                    </Box>
                                                    <Box component="span" display="block" variant="body2">
                                                        Students Enrolled: {batch.studentsCount}
                                                    </Box>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No batches available.
                            </Typography>
                        )}
                    </List>

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
