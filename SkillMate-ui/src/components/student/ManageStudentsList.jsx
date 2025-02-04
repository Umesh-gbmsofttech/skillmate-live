import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import '../admin/AdminWelcome.css';
import Search from '../Search';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import defaultProfileImage from '../../assets/profilePic.jpg';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function ManageStudentsList() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const handleCourseAddClick = () => {
        navigate('/student-signup');
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/students/fetch');
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                // console.error('Error fetching students:', error);
                showErrorToast('Error fetching students!');
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDeleteStudent = (studId) => {
        // Set the student to be deleted and open the confirmation dialog
        setStudentToDelete(studId);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (studentToDelete) {
            try {
                const response = await axios.delete(`http://localhost:8080/students/delete/${studentToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Student deleted successfully!');
                    setStudents((prev) => prev.filter((student) => student.id !== studentToDelete));
                } else {
                    showErrorToast('Failed to delete the student. Please try again.');
                }
            } catch (error) {
                // console.error('Error deleting the student:', error);
                showErrorToast('An error occurred while trying to delete the student.');
            }
        }
        setIsConfirmDialogOpen(false); // Close the confirmation dialog
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false); // Close the confirmation dialog without deleting
        setStudentToDelete(null); // Reset the student ID
    };

    const handleCourseEditClick = (studentId) => {
        navigate(`/student-profile-update/${studentId}`);
    };

    if (loading) {
        return <Loading />;
    }

    // Fuse.js search options
    const fuse = new Fuse(students, {
        keys: ['fullName', 'technologies', 'experience'],
        threshold: 0.3,
    });

    const filteredStudents = searchQuery ? fuse.search(searchQuery).map(result => result.item) : students;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="admin-welcome">
                        <h1>Hello, Admin!</h1>
                        <p>Student's List</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <Search onSearch={setSearchQuery} />
                </div>
                <p className="col-12">Number of Results: {filteredStudents.length}</p>
            </div>

            <div className="row">
                <div className="col-12">
                    <button onClick={handleCourseAddClick} className="btn btn-success mb-5">Add New Student</button>
                </div>
            </div>

            <div className="row">
                {filteredStudents.length === 0 ? (
                    <div className="col-12">
                        <p>No Students available.</p>
                    </div>
                ) : (
                    filteredStudents.map((student, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="card">
                                <img
                                    className="card-img-top"
                                    src={student.profileImage || defaultProfileImage}
                                    alt={`${student.fullName} profile`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{student.fullName}</h5>
                                    <p className="card-text">Technologies: {student.technologies || 'N/A'}</p>
                                    <p className="card-text">Average Attendance: {student.attendanceByDays || 'N/A'} {student.attendanceAverage || ''}</p>
                                    <p className="card-text">Batches: {Array.isArray(student.batches) ? student.batches.map(batch => batch.id).join(', ') : 'N/A'}</p>
                                    <p className="card-text">Remark By Trainer: {student.remarkByTrainer || 'N/A'}</p>
                                    <button onClick={() => handleCourseEditClick(student.id)} className="btn btn-primary mr-2">Edit</button>
                                    <button onClick={() => handleDeleteStudent(student.id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmationDialog
                open={isConfirmDialogOpen}
                onClose={handleCancel}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this student?"
            />
        </div>
    );
}

export default ManageStudentsList;
