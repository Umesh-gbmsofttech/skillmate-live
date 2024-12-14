import React from 'react';
import './ManageStudentsList.css'; // CSS file for ManageStudentsList component
import Search from '../Search';
import editIcon from '../../assets/editIcon.png';
import profileImage from '../../assets/profilePic.jpg';
import { useNavigate } from 'react-router-dom';

function ManageStudentsList() {
    const navigate = useNavigate();
    const handleCourseEditClick = () => {
        navigate('/admin-profile/edit-courses', { state: { courseId: '123' } });
    }
    const handleCourseAddClick = () => {
        navigate('/admin-profile/edit-courses', { state: { courseId: '123' } });
    }
    const students = [
        { name: 'Student 1', TechnologiesLearning: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', batch_No: '45', attendanceByDays: '180 days - 170 days', attendanceAverage: '(95%)', remarkByTrainer: 'Good', profileImage },
        { name: 'Student 2', TechnologiesLearning: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', batch_No: '45', attendanceByDays: '180 days - 170 days', attendanceAverage: '(95%)', remarkByTrainer: 'Good', profileImage },
        { name: 'Student 3', TechnologiesLearning: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', batch_No: '45', attendanceByDays: '180 days - 170 days', attendanceAverage: '(95%)', remarkByTrainer: 'Good', profileImage },
        { name: 'Student 4', TechnologiesLearning: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', batch_No: '45', attendanceByDays: '180 days - 170 days', attendanceAverage: '(95%)', remarkByTrainer: 'Good', profileImage },
        { name: 'Student 5', TechnologiesLearning: 'React.js, React-Native, Spring-Boot, Micro-Services, MySql', batch_No: '45', attendanceByDays: '180 days - 170 days', attendanceAverage: '(95%)', remarkByTrainer: 'Good', profileImage },
    ];

    return (
        <div className='admin-dashboard-manage-students-container'>
            <div className="admin-welcome">
                <h1>Hello, Admin!</h1>
                <p>Student's List</p>
            </div>

            <Search />
            <button onClick={handleCourseAddClick} className='add__new-student-btn'>Add New Student</button>

            <div className="ad__students-list">
                {students.map((student, index) => (
                    <div key={index} className="ad__students-list-card">
                        <img className="student-profile" src={student.profileImage} alt={`${student.name} profile`} />
                        <div className="students-details-data">
                            <h3>{student.name}</h3>
                            <p>Technologies: {student.TechnologiesLearning}</p>
                            <p>Batch No: {student.batch_No}</p>
                            <p>Average Attendance: {student.attendanceByDays} {student.attendanceAverage}</p>
                            <p>Remark By Trainer: {student.remarkByTrainer}</p>
                        </div>
                        <button onClick={handleCourseEditClick} className="ad_edit_st-btn">
                            <img src={editIcon} alt="edit" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageStudentsList;
