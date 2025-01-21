import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Attendances({ batch }) {
    const [students, setStudents] = useState([]);
    const [attendances, setAttendances] = useState({});
    const [editedAttendance, setEditedAttendance] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    // Fetch students when batch is selected
    useEffect(() => {
        const fetchStudents = async () => {
            if (!batch) return;

            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/students/batch/${batch}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (batch) fetchStudents();
    }, [batch, token]);

    // Fetch attendances for students when students list is populated
    useEffect(() => {
        const fetchAttendances = async () => {
            if (!students.length) return;

            const updatedAttendances = {};
            try {
                for (const student of students) {
                    const response = await axios.get(
                        `http://localhost:8080/attendances/student/${student.id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    updatedAttendances[student.id] = response.data;
                }
                setAttendances(updatedAttendances);
            } catch (error) {
                console.error("Error fetching attendances:", error);
            }
        };

        if (students.length) fetchAttendances();
    }, [students, token]);

    // Update attendance when button is clicked
    const updateStudentDetails = async (studentId, recordId) => {
        if (!editedAttendance[recordId]) return;

        try {
            const updatedRecord = editedAttendance[recordId];
            await axios.put(
                `http://localhost:8080/attendances/update/${recordId}`,
                updatedRecord,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Attendance updated successfully');
            setEditedAttendance((prev) => {
                const updatedState = { ...prev };
                delete updatedState[recordId];
                return updatedState;
            });

            // Optionally, re-fetch attendances after update to reflect changes
            const response = await axios.get(
                `http://localhost:8080/attendances/student/${studentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAttendances((prev) => ({
                ...prev,
                [studentId]: response.data,
            }));
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    const handleInputChange = (studentId, recordId, field, value) => {
        setEditedAttendance((prev) => ({
            ...prev,
            [recordId]: { ...prev[recordId], [field]: value },
        }));
    };

    return (
        <div className="attendance-list">
            {isLoading ? (
                <p>Loading students...</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No.</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Course Name</TableCell>
                                <TableCell>In Time</TableCell>
                                <TableCell>Out Time</TableCell>
                                <TableCell>Total Attendance</TableCell>
                                <TableCell>Remark</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.length > 0 ? (
                                students.map((student, index) => {
                                    const attendanceRecords = attendances[student.id] || [];

                                    return attendanceRecords.length > 0 ? (
                                        attendanceRecords.map((record) => (
                                            <TableRow key={`${student.id}-${record.id}`}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{student.fullName}</TableCell>
                                                <TableCell>
                                                    {student.courses?.map(course => course.courseName).join(", ") || "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="time"
                                                        value={editedAttendance[record.id]?.inTime || record.inTime || ""}
                                                        onChange={(e) => handleInputChange(student.id, record.id, 'inTime', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="time"
                                                        value={editedAttendance[record.id]?.outTime || record.outTime || ""}
                                                        onChange={(e) => handleInputChange(student.id, record.id, 'outTime', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>{record.totalAttendance || "N/A"}</TableCell>
                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        value={editedAttendance[record.id]?.remark || record.remark || ""}
                                                        onChange={(e) => handleInputChange(student.id, record.id, 'remark', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <button onClick={() => updateStudentDetails(student.id, record.id)}>
                                                        Update Attendance
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow key={student.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{student.fullName}</TableCell>
                                            <TableCell>{student.courses?.map(course => course.courseName).join(", ") || "N/A"}</TableCell>
                                            <TableCell colSpan={5}>No attendance records found</TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8}>No students available for this batch</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default Attendances;
