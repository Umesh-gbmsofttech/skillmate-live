// import React, { useState } from 'react';
// import './TrainerProfile.css';
// import profilePic from '../../assets/skillmate.jpg';
// import editIcon from '../../assets/editIcon.png';
// import hideEye from '../../assets/hide-eye.png';
// import viewEye from '../../assets/view-eye.png';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';


// function TrainerProfile() {
//     const [showProfile, setShowProfile] = useState(true);
//     const userData = useSelector((state) => state.auth.userData);  // Fetch user data from Redux store

//     const location = useLocation();
//     const { username } = location.state || { username: 'Admin' };
//     const navigate = useNavigate();

//     const user = {
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         mobile: '+1 123-456-7890',
//         address: '123 Main St, City, State, Zip',
//         qualification: 'Master of Science, Computer Science',
//         experience: 5,
//         workStatus: 'Freelancer',
//         companyName: 'XYZ Corp.',
//         technologies: ['Python', 'Django', 'Flask'],
//         profilePic,
//         resume: 'resume.pdf',
//     };

//     const handleUpdateAccountClick = () => {
//         navigate('/trainer-profile-update', { state: { username: 'Umesh Mrugjale' } })
//         console.log('Updating account...');
//     };

//     return (
//         <div className="trainer-profile">
//             <div className="trainer-header">
//                 <img className="trainer-header__picture" src={user.profilePic} alt="Profile" />
//                 <h1 className="trainer-header__welcome">
//                     Welcome,
//                     {userData?.roles[0] !== 'TRAINER' && 'STUDENT' ? username : userData.fullName}
//                 </h1>
//                 <div className="trainer-header__actions">
//                     <img
//                         src={showProfile ? hideEye : viewEye}
//                         alt={showProfile ? 'Hide Profile' : 'View Profile'}
//                         onClick={() => setShowProfile(!showProfile)}
//                     />
//                     <img onClick={handleUpdateAccountClick} src={editIcon} alt="Edit Profile" />
//                 </div>
//             </div>

//             {showProfile && (
//                 <div className="trainer-details">
//                     <p className="trainer-details__item">Name: {user.name}</p>
//                     <p className="trainer-details__item">Phone: {user.mobile}</p>
//                     <p className="trainer-details__item">Email: {user.email}</p>
//                     <p className="trainer-details__item">Address: {user.address}</p>
//                     <p className="trainer-details__item">Education: {user.qualification}</p>
//                     <p className="trainer-details__item">Experience: {user.experience} years</p>
//                     <p className="trainer-details__item">Work Status: {user.workStatus}</p>
//                     <p className="trainer-details__item">Company: {user.companyName}</p>
//                     <p className="trainer-details__item">
//                         Technologies: {user.technologies.join(', ')}
//                     </p>
//                     <p className="trainer-details__item">Resume: {user.resume}</p>
//                 </div>
//             )}

//             <div className="trainer-actions">
//                 <p className="trainer-actions__update" onClick={handleUpdateAccountClick}>
//                     Update Account
//                 </p>
//             </div>

//             <div className="trainer-meeting">
//                 <h2 className="trainer-meeting__heading">Update Meeting Link</h2>
//                 <div className="trainer-meeting__form">
//                     from-<input type="time" className="trainer-meeting__input" placeholder="From" />

//                     -to-

//                     <input type="time" className="trainer-meeting__input" placeholder="To" />
//                     <div className="trainer-meeting__link">
//                         <input type="text" className="trainer-meeting__input-link" placeholder="Meeting Link" />
//                         <button className="trainer-meeting__button">Submit</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="trainer-students">
//                 <h2 className="trainer-students__heading">Manage Students</h2>
//                 <div className="trainer-students__batch">
//                     <label className="trainer-students__label" htmlFor="batch">Select Batch</label>
//                     <select className="trainer-students__select" id="batch">
//                         <option value="26">26</option>
//                         <option value="27">27</option>
//                     </select>
//                 </div>
//                 <table className="trainer-students__table">
//                     <thead>
//                         <tr>
//                             <th>Sr. No.</th>
//                             <th>Student Name</th>
//                             <th>Batch</th>
//                             <th>In Time</th>
//                             <th>Out Time</th>
//                             <th>Course Name</th>
//                             <th>Total Attendance</th>
//                             <th>Remark</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>Sagar</td>
//                             <td>27</td>
//                             <td>10:00 AM</td>
//                             <td>7:00 PM</td>
//                             <td>FULL STACK</td>
//                             <td>170 days (90%)</td>
//                             <td>Good</td>
//                         </tr>
//                         <tr>
//                             <td>2</td>
//                             <td>Rahul</td>
//                             <td>26</td>
//                             <td>10:00 AM</td>
//                             <td>7:00 PM</td>
//                             <td>FULL STACK</td>
//                             <td>170 days (90%)</td>
//                             <td>Good</td>
//                         </tr>
//                         <tr>
//                             <td>3</td>
//                             <td>Umesh</td>
//                             <td>27</td>
//                             <td>10:00 AM</td>
//                             <td>7:00 PM</td>
//                             <td>FULL STACK</td>
//                             <td>170 days (90%)</td>
//                             <td>Good</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default TrainerProfile;

import React, { useState, useEffect } from 'react';
import './TrainerProfile.css';
import defaultProfilePic from '../../assets/skillmate.jpg'; // Fallback image
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function TrainerProfile() {
    const [showProfile, setShowProfile] = useState(true);
    const [students, setStudents] = useState([]);
    const [batch, setBatch] = useState('26');
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData); 
    const navigate = useNavigate();

    const handleUpdateAccountClick = () => {
        navigate('/trainer-profile-update', { state: { username: userData.fullName } });
        console.log('Updating account...');
    };

    const fetchStudents = async (selectedBatch) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8080/trainers/fetch/${userData.id}/students?batch=${selectedBatch}`);
            setStudents(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setIsLoading(false);
        }
    };
    const updateStudentDetails = async (studentId, field, value) => {
        try {
            const updatedStudents = students.map((student) => {
                if (student.id === studentId) {
                    return { ...student, [field]: value };
                }
                return student;
            });
            setStudents(updatedStudents);
    
            // Optionally, send the updated data to the backend:
            await axios.put(`http://localhost:8080/students/update/${studentId}`, {
                [field]: value,
            });
        } catch (error) {
            console.error('Error updating student details:', error);
        }
    };
     

    useEffect(() => {
        if (userData?.id) {
            fetchStudents(batch);
        }
    }, [userData, batch]);

    return (
        <div className="trainer-profile">
            <div className="trainer-header">
                <img
                    className="trainer-header__picture"
                    src={userData?.profilePic ? `data:image/jpeg;base64,${userData.profilePic}` : defaultProfilePic}
                    alt="Profile"
                />
                <h1 className="trainer-header__welcome">
                    Welcome, {userData?.fullName || 'Trainer'}
                </h1>
                <div className="trainer-header__actions">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide Profile' : 'View Profile'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img onClick={handleUpdateAccountClick} src={editIcon} alt="Edit Profile" />
                </div>
            </div>

            {showProfile && (
                <div className="trainer-details">
                    <p className="trainer-details__item"><strong>Full Name:</strong> {userData?.fullName}</p>
                    <p className="trainer-details__item"><strong>Mobile Number:</strong> {userData?.mobileNumber}</p>
                    <p className="trainer-details__item"><strong>Email:</strong> {userData?.email}</p>
                    <p className="trainer-details__item"><strong>Working Status:</strong> {userData?.workingStatus}</p>
                    <p className="trainer-details__item"><strong>Experience:</strong> {userData?.experience} years</p>
                    <p className="trainer-details__item"><strong>Company Name:</strong> {userData?.companyName}</p>
                    <p className="trainer-details__item"><strong>Address:</strong> {userData?.address}</p>
                    <p className="trainer-details__item"><strong>Qualification:</strong> {userData?.qualification}</p>
                    <p className="trainer-details__item">
                        <strong>Technologies:</strong> {userData?.technologies?.join(', ') || 'N/A'}
                    </p>
                </div>
            )}

            <div className="trainer-students">
                <h2 className="trainer-students__heading">Manage Students</h2>
                <div className="trainer-students__batch">
                    <label className="trainer-students__label" htmlFor="batch">Select Batch</label>
                    <select
                        className="trainer-students__select"
                        id="batch"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                    >
                        <option value="26">26</option>
                        <option value="27">27</option>
                    </select>
                </div>

                {isLoading ? (
                    <p>Loading students...</p>
                ) : (
                    <table className="trainer-students__table">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Student Name</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
    {students.map((student, index) => (
        <tr key={student.id}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>
                <input
                    type="time"
                    value={student.inTime || ''}
                    onChange={(e) =>
                        updateStudentDetails(student.id, 'inTime', e.target.value)
                    }
                />
            </td>
            <td>
                <input
                    type="time"
                    value={student.outTime || ''}
                    onChange={(e) =>
                        updateStudentDetails(student.id, 'outTime', e.target.value)
                    }
                />
            </td>
            <td>
                <input
                    type="text"
                    value={student.remark || ''}
                    onChange={(e) =>
                        updateStudentDetails(student.id, 'remark', e.target.value)
                    }
                />
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                )}
            </div>
        </div>
    );
}

export default TrainerProfile;
