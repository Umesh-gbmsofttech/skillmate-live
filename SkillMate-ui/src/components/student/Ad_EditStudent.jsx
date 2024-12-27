import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Ad_EditStudent.css';

function EditStudents() {
    const [student, setStudent] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        Technologies: '',
        attendanceByDays: '',
        attendanceAverage: '',
        remarkByTrainer: ''
    });
    const [loading, setLoading] = useState(true);

    const { studentId } = useParams();  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/students/fetch/${studentId}`);
                setStudent(response.data); 
                setFormData({
                    fullName: response.data.fullName,
                    Technologies: response.data.Technologies,
                    attendanceByDays: response.data.attendanceByDays,
                    attendanceAverage: response.data.attendanceAverage,
                    remarkByTrainer: response.data.remarkByTrainer
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setLoading(false);
            }
        };

        if (studentId) {
            fetchStudentData();
        } else {
            navigate('/admin-dashboard');
        }
    }, [studentId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/students/update/${studentId}`, formData);
            if (response.status === 200) {
                alert('Student updated successfully!');
                navigate('/admin-profile/manage-students'); // Redirect to the dashboard after successful update
            } else {
                alert('Failed to update student data. Please try again.');
            }
        } catch (error) {
            console.error('Error updating student data:', error);
            alert('An error occurred while updating the student data.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin__edit-student-container">
            <h2>Edit Student Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="ad__-student-details">
                    <div className="ad__-student-details__item">
                        <label>Full Name:</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            placeholder="Enter full name"
                        />
                    </div>
                    <div className="ad__-student-details__item">
                        <label>Technologies:</label>
                        <input 
                            type="text" 
                            name="Technologies" 
                            value={formData.Technologies} 
                            onChange={handleChange} 
                            placeholder="Enter technologies"
                        />
                    </div>
                    <div className="ad__-student-details__item">
                        <label>Attendance (Days):</label>
                        <input 
                            type="text" 
                            name="attendanceByDays" 
                            value={formData.attendanceByDays} 
                            onChange={handleChange} 
                            placeholder="Enter attendance days"
                        />
                    </div>
                    <div className="ad__-student-details__item">
                        <label>Attendance Average:</label>
                        <input 
                            type="text" 
                            name="attendanceAverage" 
                            value={formData.attendanceAverage} 
                            onChange={handleChange} 
                            placeholder="Enter attendance average"
                        />
                    </div>
                    <div className="ad__-student-details__item">
                        <label>Remark by Trainer:</label>
                        <input 
                            type="text" 
                            name="remarkByTrainer" 
                            value={formData.remarkByTrainer} 
                            onChange={handleChange} 
                            placeholder="Enter remark by trainer"
                        />
                    </div>
                </div>
                <div className="ad__-student-actions">
                    <button className="ad__-student-actions__submit" type="submit">Update Student</button>
                </div>
            </form>
        </div>
    );
}

export default EditStudents;
