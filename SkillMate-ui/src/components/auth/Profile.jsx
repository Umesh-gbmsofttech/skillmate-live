// // src/components/LoginProfile.js
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import urls from '../urls/Urls';

// const LoginProfile = () => {
//   const navigate = useNavigate();
  
//   // Get authentication state from Redux store
//   const { isAuthenticated, token, userData } = useSelector((state) => state.auth);

//   const [profileData, setProfileData] = useState(userData);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login'); // Redirect to login page
//     }
//   }, [isAuthenticated, navigate]);

//   // Fetch profile data if authenticated and no userData in Redux store
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       if (!isAuthenticated || !token) {
//         setError('You are not authenticated. Please login again.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await api.get('/auth/profile');//here i want to fetch user details when user signups/login then he get token and the userdetails object from the backend

//         if (response.status === 200) {
//           setProfileData(response.data);
//         } else {
//           setError(`Error: ${response.status} - ${response.statusText}`);
//         }
//       } catch (err) {
//         console.error('Fetch Error:', err);
//         setError('An error occurred while fetching profile data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isAuthenticated && !userData) {
//       fetchProfileData();
//     } else {
//       setLoading(false);
//     }
//   }, [isAuthenticated, token, userData]);

//   // Render loading, error, or profile data
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-danger">{error}</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card p-4 shadow-lg">
//         <h2 className="text-center mb-4">User Profile</h2>
//         {profileData ? (
//           <div>
//             <h4>Profile Information</h4>
//             <p><strong>Full Name:</strong> {profileData.fullName}</p>
//             <p><strong>Email:</strong> {profileData.email}</p>
//             <p><strong>Mobile Number:</strong> {profileData.mobileNumber}</p>
//             {/* Render additional profile fields as necessary */}
//           </div>
//         ) : (
//           <p>No profile data available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginProfile;
// // import React, { useState, useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import urls from '../urls/Urls';

// // const LoginProfile = () => {
// //   const navigate = useNavigate();
  
// //   // Get authentication state from Redux store
// //   const { isAuthenticated, token, userData } = useSelector((state) => state.auth);

// //   const [profileData, setProfileData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Redirect to login if not authenticated
// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate('/login'); // Redirect to login page
// //     }
// //   }, [isAuthenticated, navigate]);

// //   // Fetch profile data if authenticated
// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       if (!isAuthenticated || !token) {
// //         setError('You are not authenticated. Please login again.');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch(urls.login.getDetails, {
// //           method: 'GET',
// //           headers: {
// //             'Authorization': `Bearer ${token}`, // Use token from Redux store
// //           },
// //         });

// //         // Check if the response is successful
// //         if (response.ok) {
// //           const data = await response.json();
// //           setProfileData(data); // Store fetched profile data
// //         } else {
// //           const errorMessage = await response.text();
// //           setError(`Error: ${response.status} - ${errorMessage}`);
// //         }
// //       } catch (err) {
// //         console.error('Fetch Error:', err); // Log the actual error
// //         setError('An error occurred while fetching profile data.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (isAuthenticated && token) {
// //       fetchProfileData();
// //     }
// //   }, [isAuthenticated, token]); // Re-run when authentication state or token changes

// //   // Render loading, error, or profile data
// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-danger">{error}</div>;
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <div className="card p-4 shadow-lg">
// //         <h2 className="text-center mb-4">User Profile</h2>
// //         {profileData ? (
// //           <div>
// //             <h4>Profile Information</h4>
// //             <p><strong>Full Name:</strong> {profileData.fullName}</p>
// //             <p><strong>Email:</strong> {profileData.email}</p>
// //             <p><strong>Mobile Number:</strong> {profileData.mobileNumber}</p>
// //           </div>
// //         ) : (
// //           <p>No profile data available.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginProfile;
