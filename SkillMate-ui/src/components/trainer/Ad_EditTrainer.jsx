import React, { useState } from 'react';
import './Ad_EditTrainer.css';
import profilePic from '../../assets/profilePic.jpg';

function AdEditTrainer() {
    const [showProfile, setShowProfile] = useState(true);

    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        mobile: '+1 123-456-7890',
        address: '123 Main St, City, State, Zip',
        qualification: 'Master of Science, Computer Science',
        experience: 5,
        workStatus: 'Freelancer',
        companyName: 'XYZ Corp.',
        technologies: ['Python', 'Django', 'Flask'],
        profilePic,
        resume: 'resume.pdf',
    };

    const handleSubmitClick = () => {
        console.log('Account has been updated successfully.');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
    };

    return (
        <div className="admin__edit-trainer-container">
            <div className="ad__-trainer-header">
                <h1 className="ad__-trainer-header__welcome">Edit Trainer</h1>
            </div>

            <div className="ad__-trainer-details">
                <div className="ad__-trainer-header__profile-container">
                    <img className="ad__-trainer-header__picture" src={user.profilePic} alt="Profile" />
                    <div className="ad__-trainer-header__file-upload">
                        <input
                            type="file"
                            id="ad__tr-profile-image"
                            className="ad__-trainer-header__file-input"
                            onChange={handleFileChange}
                        />
                        <button
                            className="ad__-trainer-header__file-button"
                            onClick={() => document.getElementById('ad__tr-profile-image').click()}
                        >
                            Choose Profile Image
                        </button>
                    </div>
                </div>

                <p className="ad__-trainer-details__item">Name: {user.name}</p>
                <p className="ad__-trainer-details__item">Phone: {user.mobile}</p>
                <p className="ad__-trainer-details__item">Email: {user.email}</p>
                <p className="ad__-trainer-details__item">Address: {user.address}</p>
                <p className="ad__-trainer-details__item">Education: {user.qualification}</p>
                <p className="ad__-trainer-details__item">Experience: {user.experience} years</p>
                <p className="ad__-trainer-details__item">Work Status: {user.workStatus}</p>
                <p className="ad__-trainer-details__item">Company: {user.companyName}</p>
                <p className="ad__-trainer-details__item">Technologies: {user.technologies.join(', ')}</p>
                <p className="ad__-trainer-details__item">Resume: {user.resume}</p>
            </div>

            <div className="ad__-trainer-actions">
                <button className="ad__-trainer-actions__submit" onClick={handleSubmitClick}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AdEditTrainer;

// import React, { useState } from 'react';
// import './Ad_EditTrainer.css';
// import profilePic from '../../assets/profilePic.jpg';

// function AdEditTrainer() {
//     const [showProfile, setShowProfile] = useState(true);

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

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         console.log(file);
//     };

//     return (
//         <div className="admin__edit-trainer-container">
//             <div className="ad__-trainer-header">
//                 <h1>Edit Trainer</h1>
//             </div>

//             <div className="ad__-trainer-details">
//                 <div className="ad__-trainer-header__profile-container">
//                     <img className="ad__-trainer-header__picture" src={user.profilePic} alt="Profile" />
//                     <div className="ad__-trainer-header__file-upload">
//                         <input type="file" id="ad__tr-profile-image" className="ad__-trainer-header__file-input" onChange={handleFileChange} />
//                         <button className="ad__-trainer-header__file-button" onClick={() => document.getElementById('ad__tr-profile-image').click()}>Choose Profile Image</button>
//                     </div>
//                 </div>

//                 {Object.entries(user).map(([key, value]) => (
//                     key !== 'profilePic' && key !== 'resume' && (
//                         <p key={key} className="ad__-trainer-details__item">
//                             {key.charAt(0).toUpperCase() + key.slice(1)}: {Array.isArray(value) ? value.join(', ') : value}
//                         </p>
//                     )
//                 ))}
//             </div>

//             <div className="ad__-trainer-actions">
//                 <button className="ad__-trainer-actions__submit" onClick={handleSubmitClick}>Submit</button>
//             </div>
//         </div>
//     );
// }

// export default AdEditTrainer;

