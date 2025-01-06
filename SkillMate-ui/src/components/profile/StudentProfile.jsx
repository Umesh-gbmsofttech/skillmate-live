import React, { useEffect, useState } from 'react';
import './StudentProfile.css';
import defaultProfilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import MyCourses from '../courses/MyCourses';
import LiveSessions from '../subscription/LiveSessions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function StudentProfile() {
    const [showProfile, setShowProfile] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const [meetings, setMeetings] = useState([]);
    const [courses, setCourses] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const location = useLocation();
    const { username } = location.state || { username: 'Admin' };

    console.log(userData.meetings[0]);
    const navigate = useNavigate();

    // // to fetch the courses of student
    // const fetchCourses = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/courses/student/${userData.id}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         setCourses(response.data);
    //         console.log(response.data)
    //     } catch (error) {
    //         console.error('Error fetching meetings:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchCourses();
    // }, []);
    // // to console the course of student
    // useEffect(() => {
    //     courses.forEach((course) => {
    //         console.log('COURSES:')
    //         console.log('course id: ' + course.id);
    //         console.log('course name: ' + course.courseName);
    //         console.log('course price: ' + course.price);
    //         console.log('course description: ' + course.description);
    //         console.log('course days: ' + course.days);
    //     });
    // }, [meetings, token]);


    // to fetch the meeting links
    const fetchMeetings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/meetings/student/${userData.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMeetings(response.data);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        }
    };
    useEffect(() => {
        fetchMeetings();
    }, []);

    // to console the meeting links
    useEffect(() => {
        meetings.forEach((meeting) => {
            console.log('meeting ID: ' + meeting.id);
            console.log('meeting Link: ' + meeting.meetingLink);
        });
    }, [meetings, token]);


    const user = {
        name: userData?.fullName || 'John Doe',
        email: userData?.email || 'johndoe@example.com',
        mobile: userData?.mobileNumber || '+1 123-456-7890',
        address: userData?.address || '123 Main St, City, State, Zip',
        qualification: userData?.qualification || 'Bachelor of Science, Computer Science',
        workStatus: userData?.workingStatus || 'Full-Time',
        technologies: userData?.technologies || ['JavaScript', 'React', 'Node.js'],
        profilePic: userData?.profilePic
            ? `data:image/jpeg;base64,${userData.profilePic}`
            : defaultProfilePic,
        resume: userData?.resume || 'resume.pdf',
    };

    const handleUpdateAccountClick = () => {
        navigate('/student-profile-update', { state: { userData } });
    };

    const renderProfileItem = (label, value) => (
        <p className="Student-details__item">
            <strong>{label}:</strong> {value}
        </p>
    );

    return (
        <div className="student-container-profile">
            <div className="student-container-profile-welcome">
                <img
                    className="student-profile-picture"
                    src={user.profilePic}
                    alt={`${user.name}'s Profile`}
                />
                <h1 className="student-welcome-text">
                    Welcome, {userData?.roles[0] !== 'STUDENT' ? username : user.name}
                </h1>
                <div className="student-action-button-container">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide' : 'View'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img
                        src={editIcon}
                        alt="Edit"
                        onClick={handleUpdateAccountClick}
                    />
                </div>
            </div>

            {showProfile && (
                <div className="student-profile-details">
                    {renderProfileItem('Name', user.name)}
                    {renderProfileItem('Phone', user.mobile)}
                    {renderProfileItem('Email', user.email)}
                    {renderProfileItem('Address', user.address)}
                    {renderProfileItem('Education', user.qualification)}
                    {user.workStatus && renderProfileItem('Work Status', user.workStatus)}
                    {renderProfileItem('Resume', user.resume)}
                </div>
            )}

            <div className="student-profile-action-buttons">
                <p onClick={handleUpdateAccountClick} className="update-account-link">
                    <i>Update Account</i>
                </p>
            </div>

            <MyCourses />
            <LiveSessions />
        </div>
    );
}

export default StudentProfile;
