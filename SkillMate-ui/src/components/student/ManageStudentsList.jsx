
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageStudentsList.css';
import Search from '../Search';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteIcon.png';
import defaultProfileImage from '../../assets/profilePic.jpg';
import { useNavigate } from 'react-router-dom';

function ManageStudentsList() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCourseAddClick = () => {
        navigate('/admin-profile/edit-courses', { state: { courseId: '123' } });
    }

    // Fetch students from the backend
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/students/fetch');
                setStudents(response.data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching students:', error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Filter students based on search query
    const filteredStudents = students.filter(student =>
        student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.technologies?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.experience?.toString().includes(searchQuery)
    );

    const handleDeleteCourse = async (studId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/students/delete/${studId}`);
            if (response.status === 200) {
                alert('Student deleted successfully!');
                setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studId));
            } else {
                alert('Failed to delete the student. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting the student:', error);
            alert('An error occurred while trying to delete the student.');
        }
    };

    const handleCourseEditClick = (studentId) => {
        navigate(`/admin-profile/edit-stude/${studentId}`); // Pass the studentId to the edit page
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // console.log(students[0].batches[0].id)
    // console.log(students[0].batches[1].id)
    return (
        <div className='admin-dashboard-manage-students-container'>
            <div className="admin-welcome">
                <h1>Hello, Admin!</h1>
                <p>Student's List</p>
            </div>

            <Search onSearch={setSearchQuery} />

            <button onClick={handleCourseAddClick} className='add__new-student-btn'>Add New Student</button>

            <div className="ad__students-list">
                {students.length === 0 ? (
                    <p>No Students available.</p>
                ) : (
                    filteredStudents?.map((student, index) => (
                        <div key={index} className="ad__students-list-card">
                            <img
                                className="student-profile"
                                src={student.profileImage || defaultProfileImage}
                                alt={`${student.fullName} profile`}
                            />
                            <div className="students-details-data">
                                <h3>{student.fullName}</h3>
                                {/* Ensure proper handling of properties like 'Technologies', 'attendance' */}
                                <p>Technologies: {student.Technologies ? JSON.stringify(student.Technologies) : 'N/A'}</p>
                                <p>Average Attendance: {student.attendanceByDays || 'N/A'} {student.attendanceAverage || ''}</p>
                                <p>Batches: {student.batches ? (Array.isArray(student.batches) ? student.batches.map(batch => batch.id).join(', ') : student.batches) : 'N/A'}</p>
                                <p>Remark By Trainer: {student.remarkByTrainer ? student.remarkByTrainer : 'N/A'}</p>
                            </div>
                            <button onClick={() => handleCourseEditClick(student.id)} className="ad_edit_st-btn">
                                <img src={editIcon} alt="edit" />
                            </button>
                            <button onClick={() => handleDeleteCourse(student.id)} className="ad_delete_course-btn">
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default ManageStudentsList;
