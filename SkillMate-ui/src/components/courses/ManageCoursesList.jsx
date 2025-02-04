import React, { useEffect, useState } from 'react';
import '../admin/AdminWelcome.css';
import courseCoverImage from '../../assets/skillmate.jpg';
import Search from '../Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../redux/courseActions';
import Loading from '../../Loading';
import Fuse from 'fuse.js';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function ManageCoursesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const courses = useSelector((state) => state.courses.courses);
    const [searchQuery, setSearchQuery] = useState('');
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/courses/fetch', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setCourses(response.data));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch courses.');
                showErrorToast('Failed to fetch courses.');
                setLoading(false);
            }
        };

        if (token) {
            fetchCourses();
        } else {
            setError('Authorization token is missing or invalid.');
            showWarningToast('Authorization token is missing or invalid.');
            setLoading(false);
        }
    }, [token, dispatch]);

    // Configure Fuse.js for fuzzy search
    const fuse = new Fuse(courses, {
        keys: ['courseName', 'description', 'price', 'days'],
        threshold: 0.3, // Adjust for strictness (lower means stricter matching)
    });

    const filteredCourses = searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : courses;

    const handleCourseEditClick = (course) => {
        navigate('/admin-profile/edit-courses', { state: { course } });
    };

    const handleCourseAddClick = () => {
        navigate('/admin-profile/edit-course', { state: { course: null } });
    };

    const handleDeleteCourse = (courseId) => {
        setCourseToDelete(courseId);
        setIsConfirmDialogOpen(true); // Open the confirmation dialog
    };

    const handleConfirmDelete = async () => {
        if (courseToDelete) {
            try {
                const response = await axios.delete(`http://localhost:8080/courses/delete/${courseToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.statusCode === 200) {
                    showSuccessToast('Course deleted successfully!');
                    const updatedCourses = courses.filter((course) => course.id !== courseToDelete);
                    dispatch(setCourses(updatedCourses)); // Update the course list in the Redux store

                } else {
                    showInfoToast('Failed to delete the course. Please try again.');
                }
            } catch (error) {
                setError('Failed to delete the course. Please try again.');
                showErrorToast('Failed to delete the course. Please try again.');
            }
        }
        setIsConfirmDialogOpen(false); // Close the dialog after confirming deletion
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false); // Close the dialog without deleting
        setCourseToDelete(null); // Clear the course to delete
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="admin-welcome">
                        <h1>Hello, Admin!</h1>
                        <p>Courses List</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Search onSearch={setSearchQuery} />
                </div>
                <p className='col-12'>Number of Results: {filteredCourses.length}</p>
            </div>

            <div className="row">
                <div className="col-12">
                    <button onClick={handleCourseAddClick} className="btn btn-primary add__new-course-btn mb-5">Add New Course</button>
                </div>
            </div>

            <div className="row ad__courses-list">
                {filteredCourses.length === 0 ? (
                    <div className="col-12">
                        <p>No courses available.</p>
                    </div>
                ) : (
                    filteredCourses.map((course, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="card">
                                <img className="card-img-top" src={`data:image/jpeg;base64,${course.coverImage}` || courseCoverImage} alt={`${course.courseName} cover`} />
                                <div className="card-body">
                                    <h3 className="card-title">{course.courseName}</h3>
                                    <p className="card-text">Duration: {course.days}</p>
                                    <p className="card-text">Time: {course.time}</p>
                                    <p className="card-text">Price: {course.price}</p>
                                    <p className="card-text">Description: {course.description}</p>
                                    <button onClick={() => handleCourseEditClick(course)} className="btn btn-primary mr-2">Edit</button>
                                    <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-danger ">Delete</button>
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
                message="Are you sure you want to delete this course?"
            />
        </div>
    );
}

export default ManageCoursesList;
