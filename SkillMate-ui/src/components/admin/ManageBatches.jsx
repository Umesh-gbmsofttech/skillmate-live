import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import Search from '../Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Loading';
import CustomButton from '../utility/CustomButton';
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
                const response = await axios.get(`${baseUrl}batches`);
                setBatches(response.data);
            } catch (error) {
                showErrorToast('Error fetching batches');
            } finally {
                setLoading(false);
            }
        };

        fetchBatches();
    }, []);

    // Initialize Fuse.js for search
    const fuse = new Fuse(batches, {
        keys: ['trainer.course.title', 'trainer.trainer.name', 'id'],
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
                const response = await axios.delete(`${baseUrl}batches/${batchToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Batch deleted successfully!');
                    setBatches((prevBatches) => prevBatches.filter((batch) => batch.id !== batchToDelete));
                    setSearchQuery(''); // Clear search query
                } else {
                    showInfoToast('Failed to delete the batch. Please try again.');
                }
            } catch (error) {
                showErrorToast('Unable To Delete, something went wrong!');
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
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography sx={{ textAlign: 'center', marginTop: 3, fontWeight: 'bold', fontSize: 'var(--font-size-p1)', fontFamily: 'var(--font-p2)', backgroundImage: 'linear-gradient(to right, var(--color-p1),rgba(0, 128, 128, 0.6),var(--color-p1))', display: 'inline-block', padding: '0 80px', border: "none" }}>
                        Batch&apos;s List
                    </Typography>

                    <Search onSearch={setSearchQuery} />
                    <Typography sx={{ marginBottom: 2, fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)' }}>
                        Number of Results: {filteredBatches?.length}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        <CustomButton text={' Create New Batch'} onClick={handleBatchCreateClick} />
                    </Box>

                    <Grid container spacing={2}>
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map((batch) => (
                                <Grid item xs={12} sm={6} md={4} key={batch.id}>
                                    <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 3, transition: 'box-shadow 0.3s ease', ':hover': { boxShadow: 5 } }}>
                                        <ListItem
                                            secondaryAction={
                                                <>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => handleBatchEditClick(batch.id)}
                                                        aria-label="edit"
                                                    >
                                                        <EditIcon color="success" />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => handleDeleteBatch(batch.id)}
                                                        aria-label="delete"
                                                    >
                                                        <DeleteIcon color="info" />
                                                    </IconButton>
                                                </>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={
                                                        batch.trainer?.trainer?.image
                                                            ? `data:image/jpeg;base64,${batch.trainer.trainer.image}`
                                                            : profileImagePlaceholder
                                                    }
                                                    alt="Batch Profile"
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography sx={{ fontWeight: 'bold', fontSize: 'var(--font-size-p2)', fontFamily: 'var(--font-p2)', color: 'var(--color-p2)' }}>
                                                        Course: {batch.trainer?.course?.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Box sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                            Batch ID: {batch.id}
                                                        </Box>
                                                        <Box sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                            Trainer: {batch.trainer?.trainer?.name}
                                                        </Box>
                                                        <Box sx={{ fontSize: 'var(--font-size-p3)', fontFamily: 'var(--font-p1)', color: 'var(--color-p2)' }}>
                                                            Students Enrolled: {batch.students.length}
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
