import React, { useState } from 'react';
import './TrainerProfile.css';
import profilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import { useLocation, useNavigate } from 'react-router-dom';

function TrainerProfile() {
    const [showProfile, setShowProfile] = useState(true);

    const location = useLocation();
    const { username } = location.state || { username: 'Admin' };
    const navigate = useNavigate();

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

    const handleUpdateAccountClick = () => {
        navigate('/trainer-profile-update', { state: { username: 'Umesh Mrugjale' } })
        console.log('Updating account...');
    };

    return (
        <div className="trainer-profile">
            <div className="trainer-header">
                <img className="trainer-header__picture" src={user.profilePic} alt="Profile" />
                <h1 className="trainer-header__welcome">Welcome, {username}</h1>
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
                    <p className="trainer-details__item">Name: {user.name}</p>
                    <p className="trainer-details__item">Phone: {user.mobile}</p>
                    <p className="trainer-details__item">Email: {user.email}</p>
                    <p className="trainer-details__item">Address: {user.address}</p>
                    <p className="trainer-details__item">Education: {user.qualification}</p>
                    <p className="trainer-details__item">Experience: {user.experience} years</p>
                    <p className="trainer-details__item">Work Status: {user.workStatus}</p>
                    <p className="trainer-details__item">Company: {user.companyName}</p>
                    <p className="trainer-details__item">
                        Technologies: {user.technologies.join(', ')}
                    </p>
                    <p className="trainer-details__item">Resume: {user.resume}</p>
                </div>
            )}

            <div className="trainer-actions">
                <p className="trainer-actions__update" onClick={handleUpdateAccountClick}>
                    Update Account
                </p>
            </div>

            <div className="trainer-meeting">
                <h2 className="trainer-meeting__heading">Update Meeting Link</h2>
                <div className="trainer-meeting__form">
                    from-<input type="time" className="trainer-meeting__input" placeholder="From" />

                    -to-

                    <input type="time" className="trainer-meeting__input" placeholder="To" />
                    <div className="trainer-meeting__link">
                        <input type="text" className="trainer-meeting__input-link" placeholder="Meeting Link" />
                        <button className="trainer-meeting__button">Submit</button>
                    </div>
                </div>
            </div>

            <div className="trainer-students">
                <h2 className="trainer-students__heading">Manage Students</h2>
                <div className="trainer-students__batch">
                    <label className="trainer-students__label" htmlFor="batch">Select Batch</label>
                    <select className="trainer-students__select" id="batch">
                        <option value="26">26</option>
                        <option value="27">27</option>
                    </select>
                </div>
                <table className="trainer-students__table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Student Name</th>
                            <th>Batch</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Course Name</th>
                            <th>Total Attendance</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Sagar</td>
                            <td>27</td>
                            <td>10:00 AM</td>
                            <td>7:00 PM</td>
                            <td>FULL STACK</td>
                            <td>170 days (90%)</td>
                            <td>Good</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Rahul</td>
                            <td>26</td>
                            <td>10:00 AM</td>
                            <td>7:00 PM</td>
                            <td>FULL STACK</td>
                            <td>170 days (90%)</td>
                            <td>Good</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Umesh</td>
                            <td>27</td>
                            <td>10:00 AM</td>
                            <td>7:00 PM</td>
                            <td>FULL STACK</td>
                            <td>170 days (90%)</td>
                            <td>Good</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrainerProfile;
