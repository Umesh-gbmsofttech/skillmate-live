import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastService.css';

// Success Toast
export const showSuccessToast = (message, options = {}) => {
    toast.success(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "toast-success",
        ...options,
    });
};

// Error Toast
export const showErrorToast = (message, options = {}) => {
    toast.error(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "toast-error",
        ...options,
    });
};

// Info Toast
export const showInfoToast = (message, options = {}) => {
    toast.info(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "toast-info",
        ...options,
    });
};

// Warning Toast
export const showWarningToast = (message, options = {}) => {
    toast.warn(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "toast-warning",
        ...options,
    });
};
// // ToastService.js
// import { toast } from 'react-toastify';
// import { Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

// // Success Toast
// export const showSuccessToast = (message, options = {}) => {
//     toast.success(message, {
//         // position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         ...options,  // Merge with additional options passed to the function
//     });
// };

// // Error Toast
// export const showErrorToast = (message, options = {}) => {
//     toast.error(message, {
//         // position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         ...options,
//     });
// };

// // Info Toast
// export const showInfoToast = (message, options = {}) => {
//     toast.info(message, {
//         // position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         ...options,
//     });
// };

// // Warning Toast
// export const showWarningToast = (message, options = {}) => {
//     toast.warn(message, {
//         // position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         ...options,
//     });
// };
