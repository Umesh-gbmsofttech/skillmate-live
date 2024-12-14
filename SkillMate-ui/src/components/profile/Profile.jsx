import React from 'react'
import './Profile.css';
import AdminProfile from './AdminProfile';
import StudentProfile from './StudentProfile';
import TrainerProfile from './TrainerProfile';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/admin-profile', { state: { username: 'Rahul Rathod' } });
    };
    const handleManageTrainersClick = () => {
        navigate('/admin-profile/manage-trainers', { state: { username: 'Rahul Rathod' } });
    };
    const handleEditTrainersClick = () => {
        navigate('/admin-profile/edit-trainers', { state: { username: 'Rahul Rathod' } });
    };
    const handleManageStudentsClick = () => {
        navigate('/admin-profile/manage-students', { state: { username: 'Rahul Rathod' } });
    };
    const handleManageCoursesClick = () => {
        navigate('/admin-profile/manage-courses', { state: { username: 'Rahul Rathod' } });
    };
    const handleEditStudentsClick = () => {
        navigate('/admin-profile/edit-students', { state: { username: 'Rahul Rathod' } });
    };
    const handleEditCoursesClick = () => {
        navigate('/admin-profile/edit-courses', { state: { username: 'Rahul Rathod' } });
    };

    const handleStudentClick = () => {
        navigate('/student-profile', { state: { username: 'Sagar Gaikwad' } });
    };

    const handleTrainerClick = () => {
        navigate('/trainer-profile', { state: { username: 'Umesh Mrugjale' } });
    };
    const handleRatingPageClick = () => {
        navigate('/rating-reviews/page', { state: { username: 'Umesh Mrugjale' } });
    };
    const handleRatingCardClick = () => {
        navigate('/rating-reviews/page/card', { state: { username: 'Umesh Mrugjale' } });
    };

    return (
        <div className='profile-container'>
            <button onClick={handleAdminClick}>Admin Profile</button>
            <button onClick={handleStudentClick}>Student Profile</button>
            <button onClick={handleTrainerClick}>Trainer Profile</button>
            <button onClick={handleManageTrainersClick}>Manage Trainers</button>
            <button onClick={handleManageStudentsClick}>Manage Students</button>
            <button onClick={handleManageCoursesClick}>Manage Courses</button>
            <button onClick={handleEditTrainersClick}>Edit Trainer</button>
            <button onClick={handleEditStudentsClick}>Edit Student</button>
            <button onClick={handleEditCoursesClick}>Edit Courses</button>

            <button onClick={handleRatingPageClick}>Rating Page</button>
            <button onClick={handleRatingCardClick}>Rating Card</button>
        </div>
    );
}

export default Profile

// import React, { useContext } from 'react';
// import './Profile.css';
// import { useNavigate } from 'react-router-dom';
// import MyCourses from './MyCourses';
// import { GlobalContext } from '../context/GlobalContext';

// function Profile() {
//     const { user, clearUserData } = useContext(GlobalContext);
//     const navigate = useNavigate();

//     // Handle profile-related actions
//     const handleProfileClick = () => {
//         navigate('/profile');
//     };

//     const handleLogout = () => {
//         clearUserData(); // Assuming this will log the user out and clear context
//         navigate('/login'); // Navigate to login after logging out
//     };

//     const handleDeleteProfileClick = () => {
//         navigate('/delete-profile');
//     };

//     const handleUpdateProfileClick = () => {
//         navigate('/update-profile');
//     };

//     if (!user) {
//         return <p className='profile-container-unknown-user'>Please log in to view your profile.</p>;
//     }

//     return (
//         <>
//             <div className='profile-container'>
//                 <div className='profile-picture'>
//                     <img src={user.profilePic} alt="Profile" />
//                 </div>

//                 <div className='profile-details'>
//                     <h1>Welcome, {user.name}</h1>
//                     <p>Email: {user.email}</p>
//                     <p>Phone: {user.mobile}</p>
//                     <p>Address: {user.address}</p>
//                     <p>Education: {user.qualification}</p>
//                     {user.experience && <p>Experience: {user.experience} years</p>}
//                     {user.workStatus && <p>Work Status: {user.workStatus}</p>}
//                     {user.companyName && <p>Company: {user.companyName}</p>}
//                     {user.technologies && <p>Technologies: {user.technologies.join(', ')}</p>}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="profile-action-buttons">
//                     <button onClick={handleLogout}>Logout</button>
//                     <button onClick={handleDeleteProfileClick}>Delete Profile</button>
//                     <button onClick={handleUpdateProfileClick}>Update Profile</button>
//                 </div>
//             </div>

//             {/* My Courses Section */}
//             <div className="profile-my-courses-container">
//                 <MyCourses />
//             </div>
//         </>
//     );
// }

// export default Profile;
