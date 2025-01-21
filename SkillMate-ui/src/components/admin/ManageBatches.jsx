import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageBatches() {
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [courses, setCourses] = useState([]);

    const [newBatch, setNewBatch] = useState({
        trainerIds: [],
        courseIds: [],
        studentIds: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const batchResponse = await axios.get(`http://localhost:8080/batches/fetch`);
                const studentResponse = await axios.get(`http://localhost:8080/students/fetch`);
                const trainerResponse = await axios.get(`http://localhost:8080/trainers/fetch`);
                const courseResponse = await axios.get(`http://localhost:8080/courses/fetch`);

                setBatches(batchResponse.data);
                setStudents(studentResponse.data);
                setTrainers(trainerResponse.data);
                setCourses(courseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMultiSelectChange = (e) => {
        const { name } = e.target;
        const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));

        setNewBatch(prevData => ({
            ...prevData,
            [name]: selectedValues,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/batches/create`, {
                trainer: newBatch.trainerIds.map(id => ({ id })),
                students: newBatch.studentIds.map(id => ({ id })),
                courses: newBatch.courseIds.map(id => ({ id })),
            });

            alert('Batch created successfully!');
            navigate('/admin-dashboard');
        } catch (error) {
            console.error('Error creating batch:', error);
            alert('Failed to create batch.');
        }
    };

    return (
        <div className="admin__batch-management">
            <h2>Manage Batches</h2>
            <form onSubmit={handleSubmit}>
                {/* Select Multiple Trainers */}
                <label>Select Trainers:</label>
                <select multiple name="trainerIds" value={newBatch.trainerIds} onChange={handleMultiSelectChange}>
                    {trainers.map(trainer => (
                        <option key={trainer.id} value={trainer.id}>
                            {trainer.fullName} (ID: {trainer.id})
                        </option>
                    ))}
                </select>

                {/* Select Multiple Courses */}
                <label>Select Courses:</label>
                <select multiple name="courseIds" value={newBatch.courseIds} onChange={handleMultiSelectChange}>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.name} (ID: {course.id})
                        </option>
                    ))}
                </select>

                {/* Assign Multiple Students */}
                <label>Assign Students:</label>
                <select multiple name="studentIds" value={newBatch.studentIds} onChange={handleMultiSelectChange}>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.fullName} (ID: {student.id})
                        </option>
                    ))}
                </select>

                <button type="submit">Create Batch</button>
            </form>
        </div>
    );
}

export default ManageBatches;
