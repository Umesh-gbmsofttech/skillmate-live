// import React, { useState } from 'react';
// import './TrainerProfile.css';
// import profilePic from '../../assets/skillmate.jpg';
// import editIcon from '../../assets/editIcon.png';
// import hideEye from '../../assets/hide-eye.png';
// import viewEye from '../../assets/view-eye.png';
// import { useLocation, useNavigate } from 'react-router-dom';

// function TrainerProfileUpdate() {
//     const [showProfile, setShowProfile] = useState(true);

//     const location = useLocation();
//     const { username } = location.state || { username: 'Admin' };

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

//     const handleSubmitClick = () => {
//         console.log('Account has been updated successfully.');
//     };

//     return (
//         <div className="trainer-profile">
//             <div className="trainer-header">
//                 <img className="trainer-header__picture" src={user.profilePic} alt="Profile" />
//                 <h1 className="trainer-header__welcome">Welcome, {username}</h1>
//                 <div className="trainer-header__actions">
//                     <img
//                         src={showProfile ? hideEye : viewEye}
//                         alt={showProfile ? 'Hide Profile' : 'View Profile'}
//                         onClick={() => setShowProfile(!showProfile)}
//                     />
//                     <img src={editIcon} alt="Edit Profile" />
//                 </div>
//             </div>

//             {showProfile && (
//                 <div className="trainer-details">
//                     <label htmlFor="file">select a profile picture</label>
//                     <input className="trainer-details__item" type="file" />
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
//                 <button className="trainer-actions__submit" onClick={handleSubmitClick}>
//                     Submit
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default TrainerProfileUpdate;



import React, { useState, useEffect } from 'react';
import './TrainerProfileUpdate.css';
import profilePic from '../../assets/skillmate.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TrainerProfileUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const { trainerid } = location.state || { trainerid: "" };

    const [trainerData, setTrainerData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        qualification: '',
        experience: '',
        workStatus: '',
        companyName: '',
        technologies: '',
        profilePic: '',
    });

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (trainerid) {
            axios
                .get(`http://localhost:8080/trainers/fetch/${trainerid}`)
                .then((response) => {
                    setTrainerData(response.data);
                })
                .catch((error) => console.error('Error fetching trainer data:', error));
        }
    }, [trainerid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrainerData({ ...trainerData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitClick = async () => {
        if (!trainerData.name || !trainerData.email) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        if (file) formData.append('profilePic', file);

        Object.keys(trainerData).forEach((key) => {
            formData.append(key, trainerData[key]);
        });

        try {
            await axios.put(`http://localhost:8080/trainers/update/${trainerid}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Trainer data updated successfully.');
            navigate('/trainer-profile');
        } catch (error) {
            console.error('Error updating trainer data:', error);
        }
    };

    return (
        <div className="trainer-profile-update">
            <div className="trainer-header">
                <img
                    className="trainer-header__picture"
                    src={trainerData.profilePic ? `data:image/jpeg;base64,${trainerData.profilePic}` : profilePic}
                    alt="Profile"
                />
                <h1 className="trainer-header__welcome">Update Profile - {trainerData.name}</h1>
            </div>

            <div className="trainer-details">
                <label>Profile Picture:</label>
                <input type="file" onChange={handleFileChange} />

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={trainerData.name}
                    onChange={handleInputChange}
                />

                <label>Mobile:</label>
                <input
                    type="text"
                    name="mobile"
                    value={trainerData.mobile}
                    onChange={handleInputChange}
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={trainerData.email}
                    onChange={handleInputChange}
                />

                <label>Address:</label>
                <textarea
                    name="address"
                    value={trainerData.address}
                    onChange={handleInputChange}
                />

                <label>Qualification:</label>
                <input
                    type="text"
                    name="qualification"
                    value={trainerData.qualification}
                    onChange={handleInputChange}
                />

                <label>Experience (in years):</label>
                <input
                    type="number"
                    name="experience"
                    value={trainerData.experience}
                    onChange={handleInputChange}
                />

                <label>Work Status:</label>
                <input
                    type="text"
                    name="workStatus"
                    value={trainerData.workStatus}
                    onChange={handleInputChange}
                />

                <label>Company Name:</label>
                <input
                    type="text"
                    name="companyName"
                    value={trainerData.companyName}
                    onChange={handleInputChange}
                />

                <label>Technologies:</label>
                <input
                    type="text"
                    name="technologies"
                    value={trainerData.technologies}
                    onChange={handleInputChange}
                    placeholder="Comma-separated"
                />
            </div>

            <button className="trainer-actions__submit" onClick={handleSubmitClick}>
                Submit
            </button>
        </div>
    );
}

export default TrainerProfileUpdate;
