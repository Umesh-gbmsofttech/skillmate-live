import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Ad_EditStudent.css';
import ManageBatches from '../admin/ManageBatches';

function EditStudents() {
    const [formData, setFormData] = useState({
        fullName: '',
        Technologies: '',
        attendanceByDays: '',
        attendanceAverage: '',
        remarkByTrainer: '',
    });
    const [batchIds, setBatchIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const { studentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/students/fetch/${studentId}`);

                setFormData({
                    fullName: response.data.fullName || '',
                    Technologies: response.data.Technologies || '',
                    attendanceByDays: response.data.attendanceByDays || '',
                    attendanceAverage: response.data.attendanceAverage || '',
                    remarkByTrainer: response.data.remarkByTrainer || '',
                });

                setBatchIds(response.data.batches ? response.data.batches.map(batch => batch.id) : []);
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
            await axios.put(
                `http://localhost:8080/students/update/${studentId}`,
                formData
            );
            alert('Student updated successfully!');
            navigate('/admin-profile/manage-students');
        } catch (error) {
            console.error('Error updating student data:', error);
            alert('An error occurred while updating the student.');
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

                    {/* Non-editable Batch IDs */}
                    <div className="ad__-student-details__item">
                        <label>Batch IDs:</label>
                        <input
                            type="text"
                            value={batchIds.join(', ')}
                            disabled
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
                    <button type="submit">Update Student</button>
                </div>
            </form>

            {/* <ManageBatches /> */}
        </div>
    );
}

export default EditStudents;
