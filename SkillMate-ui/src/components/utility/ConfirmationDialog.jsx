import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function ConfirmationDialog({ open, onClose, onConfirm, message }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: '#16404D', // Light background color for the dialog
                    borderRadius: 3, // Rounded corners
                    padding: 2, // Adding padding to the dialog
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Light shadow effect
                },
                '& .MuiDialogTitle-root': {
                    fontSize: '1.25rem', // Larger title font size
                    fontWeight: 'bold', // Make the title bold
                    color: '#999', // Darker text color for the title
                },
                '& .MuiDialogContentText-root': {
                    fontSize: '1rem', // Slightly larger content text
                    color: '#888', // Subtle text color
                    padding: '10px 0', // Padding for spacing between title and message
                },
                // '& .MuiDialogActions-root': {
                //     paddingTop: '15px', 
                //     justifyContent: 'space-between', 
                // },
            }}
        >
            <DialogTitle>{message}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                     // Slightly muted color for Cancel button
                    sx={{
                        padding: '8px 16px', // Adjust button padding
                        fontWeight: 'bold', // Make Cancel text bold
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                        color:"#fff",
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color:'#FBFFE4'
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="black"
                    sx={{
                        padding: '6px 14px',
                        fontWeight: 'bold',
                        backgroundColor: '#D91656', // Custom blue color
                        '&:hover': {
                            backgroundColor:'rgba(217, 22, 86,0.8)', // Darker blue on hover
                        },
                        textTransform: 'none', // Remove uppercasing on text
                    }}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

// export default function ConfirmationDialog({ open, onClose, onConfirm }) {
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle>Are you sure?</DialogTitle>
//             <DialogContent>
//                 <p>Do you really want to perform this action?</p>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button
//                     onClick={() => {
//                         onConfirm();  // Call the confirm function
//                         onClose();    // Close the dialog
//                     }}
//                     color="primary"
//                 >
//                     OK
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

