import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import CustomButton from './CustomButton';

export default function ConfirmationDialog({ open, onClose, onConfirm, message }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: 'var(--color-p1)',
                    borderRadius: 3,
                    padding: 2,
                    boxShadow: 5,
                    transition: 'ease-in-out 0.3s',
                    ":hover": { boxShadow: 10 }
                },
                '& .MuiDialogTitle-root': {
                    fontWeight: 'bold',
                    fontSize: 'var(--font-size-p1)',
                    color: 'var(--color-p2)',
                    fontFamily: 'var(--font-p2)',
                },
                '& .MuiDialogContentText-root': {
                    fontSize: 'var(--font-size-p3)',
                    color: 'var(--color-p2)',
                    fontFamily: 'var(--font-p2)',
                    padding: '10px 0',
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
                <CustomButton text={'Cancel'} onClick={onClose} />
                <CustomButton text={'OK'} onClick={onConfirm} color={'var(--color-p2)'} backgroundColor={'var(--color-p4)'} />
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

