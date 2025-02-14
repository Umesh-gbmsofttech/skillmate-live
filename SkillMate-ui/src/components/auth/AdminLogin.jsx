import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import urls from '../urls/Urls';
import { showSuccessToast, showErrorToast } from '../utility/ToastService'; // Import toast functions
import baseUrl from '../urls/baseUrl'


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !password) {
            setError('Please fill in all fields to continue.');
            showErrorToast('Please fill in all fields to continue.');
            setLoading(false);
            return;
        }

        const adminData = { username, password };

        // Make login request
        fetch(`${baseUrl}admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then((token) => {
                if (token) {
                    showSuccessToast('Admin login successful!');
                    dispatch(loginSuccess({ token }));
                    navigate('/admin-profile');
                } else {
                    setError('Login failed. Please try again.');
                    showErrorToast('Login failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Login failed. Please try again later.');
                showErrorToast('Login failed. Please try again later.');
            });
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow-lg admin-sign-up-container">
                <h2>Admin Login</h2>

                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control"
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                </label>
                {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                <button
                    type='submit'
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        'Submit'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
// import React, { useState } from 'react';
// import './AdminLogin.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../redux/authSlice';
// import urls from '../urls/Urls';
// import { ToastContainer } from 'react-toastify';
// import { showSuccessToast, showErrorToast } from '../../ToastService'; // Import toast functions

// const AdminLogin = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);

//         if (!username || !password) {
//             setError('Please fill in all fields to continue.');
//             showErrorToast('Please fill in all fields to continue.');
//             setLoading(false);
//             return;
//         }

//         const adminData = { username, password };

//         // Make login request
//         fetch(urls.admin.login, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(adminData),
//         })
//             .then((response) => {
//                 if (!response.ok) throw new Error('Network response was not ok');
//                 return response.text();
//             })
//             .then((token) => {
//                 if (token) {
//                     showSuccessToast('Admin login successful!');
//                     dispatch(loginSuccess({ token }));
//                     navigate('/admin-profile');
//                 } else {
//                     setError('Login failed. Please try again.');
//                     showErrorToast('Login failed. Please try again.');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 setError('Login failed. Please try again later.');
//                 showErrorToast('Login failed. Please try again later.');
//             });
//         setLoading(false);
//     };

//     return (
//         <div className="admin-overlay">
//             <div>
//                 {/* {error && <p className="error-message">{error}</p>} */}

//                 <form onSubmit={handleSubmit} className="admin-sign-up-container">
//                     <h2>Admin Login</h2>

//                     <label>
//                         Username:
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </label>

//                     <label>
//                         Password:
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </label>

//                     <button
//                         type='submit'
//                         className="btn btn-success w-100"
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <span
//                                 className="spinner-border spinner-border-sm"
//                                 role="status"
//                                 aria-hidden="true"
//                             />
//                         ) : (
//                             'Submit'
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;

