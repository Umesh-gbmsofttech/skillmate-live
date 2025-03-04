// src/components/Details.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import CustomButton from './CustomButton';

function Details({ open, onClose, title, content }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <CustomButton onClick={onClose} text="Close" />
            </DialogActions>
        </Dialog>
    );
}

export default Details;
