import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import Loading from "../../Loading";
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function Attendances({ batch }) {
    const [students, setStudents] = useState([]);
    const [attendances, setAttendances] = useState({});
    const [editedAttendance, setEditedAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchStudents = async () => {
            if (!batch) return;
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/students/batch/${batch}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setStudents(response.data);
            } catch (error) {
                // console.error("Error fetching students:", error);
                showErrorToast(`Error fetching students: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [batch, token]);

    useEffect(() => {
        const fetchLatestAttendances = async () => {
            if (!students.length) return;
            const updatedAttendances = {};
            setLoading(true);
            try {
                for (const student of students) {
                    const response = await axios.get(
                        `http://localhost:8080/attendances/student/${student.id}/latest`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    updatedAttendances[student.id] = [response.data]; // Store as an array
                }
                setAttendances(updatedAttendances);
            } catch (error) {
                // console.error("Error fetching latest attendances:", error);
                showErrorToast(`Error fetching latest attendances: ${error}`);
            }
            setLoading(false);
        };

        fetchLatestAttendances();
    }, [students, token]);

    const fetchAllAttendances = async (studentId) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/attendances/student/${studentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAttendances((prev) => ({
                ...prev,
                [studentId]: response.data,
            }));
        } catch (error) {
            // console.error("Error fetching all attendances:", error);
            showErrorToast(`Error fetching all attendances: ${error}`);
        }
        setLoading(false);
    };

    const updateAttendance = async (studentId, recordId) => {
        if (!editedAttendance[recordId]) return;
        setLoading(true);
        try {
            const updatedRecord = editedAttendance[recordId];
            await axios.put(
                `http://localhost:8080/attendances/update/${recordId}`,
                updatedRecord,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            showSuccessToast("Attendance updated successfully");
            setEditedAttendance((prev) => {
                const updatedState = { ...prev };
                delete updatedState[recordId];
                return updatedState;
            });

            // Refresh attendance records
            const response = await axios.get(
                `http://localhost:8080/attendances/student/${studentId}/latest`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAttendances((prev) => ({
                ...prev,
                [studentId]: [response.data],
            }));
        } catch (error) {
            // console.error("Error updating attendance:", error);
            showErrorToast(`Error updating attendance: ${error}`);
        }
        setLoading(false);
    };

    const handleInputChange = (recordId, field, value) => {
        setEditedAttendance((prev) => ({
            ...prev,
            [recordId]: { ...prev[recordId], [field]: value },
        }));
    };

    return (
        <div style={{ padding: '0px 120px 10px 120px' }}>
            {loading ? (
                <Loading />
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
                                <TableCell>View All</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.length > 0 ? (
                                students.map((student, index) => {
                                    const attendanceRecords = attendances[student.id] || [];

                                    return (
                                        <React.Fragment key={student.id}>
                                            {attendanceRecords.length > 0 ? (
                                                attendanceRecords.map((record) => (
                                                    <TableRow key={`${student.id}-${record.id}`}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{student.name}</TableCell>
                                                        <TableCell>
                                                            {student.courses?.map((course) => course.courseName).join(", ") || "N/A"}
                                                        </TableCell>
                                                        <TableCell>
                                                            <input
                                                                type="time"
                                                                value={editedAttendance[record.id]?.inTime || record.inTime || ""}
                                                                onChange={(e) =>
                                                                    handleInputChange(record.id, "inTime", e.target.value)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <input
                                                                type="time"
                                                                value={editedAttendance[record.id]?.outTime || record.outTime || ""}
                                                                onChange={(e) =>
                                                                    handleInputChange(record.id, "outTime", e.target.value)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>{record.totalAttendance || "N/A"}</TableCell>
                                                        <TableCell>
                                                            <input
                                                                type="text"
                                                                value={editedAttendance[record.id]?.remark || record.remark || ""}
                                                                onChange={(e) =>
                                                                    handleInputChange(record.id, "remark", e.target.value)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => updateAttendance(student.id, record.id)}
                                                            >
                                                                Update
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            {attendanceRecords.length === 1 && (
                                                                <Button
                                                                    variant="outlined"
                                                                    color="secondary"
                                                                    onClick={() => fetchAllAttendances(student.id)}
                                                                >
                                                                    View All
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow key={student.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell>
                                                        {student.courses?.map((course) => course.courseName).join(", ") || "N/A"}
                                                    </TableCell>
                                                    <TableCell colSpan={5}>No attendance records found</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            onClick={() => fetchAllAttendances(student.id)}
                                                        >
                                                            View All
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9}>No students available for this batch</TableCell>
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
