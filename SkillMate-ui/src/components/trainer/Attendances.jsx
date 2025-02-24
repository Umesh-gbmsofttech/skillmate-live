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
    Button,
    Typography,
    TextField
} from "@mui/material";
import Loading from "../../Loading";
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import baseUrl from "../urls/baseUrl";

function Attendances({ batch }) {
    const [attendances, setAttendances] = useState([]);
    const [editedAttendance, setEditedAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchLatestAttendances = async () => {
            setLoading(true);
            if (!batch) {
                setLoading(false);
                return;
            } else {
                try {
                    const response = await axios.get(
                        `${baseUrl}attendances/batch/${batch}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setAttendances(response.data);
                } catch (error) {
                    showErrorToast(`Error fetching latest attendances: ${error}`);
                } finally {
                    setLoading(false);
                }
            }
            setLoading(false);
        };
        fetchLatestAttendances();
    }, [batch, token]);

    const updateAttendance = async (recordId) => {
        if (!editedAttendance[recordId]) return;
        setLoading(true);
        try {
            const updatedRecord = editedAttendance[recordId];
            await axios.put(
                `${baseUrl}attendances/${recordId}`,
                updatedRecord,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            showSuccessToast("Attendance updated successfully");
            setEditedAttendance((prev) => {
                const updatedState = { ...prev };
                delete updatedState[recordId];
                return updatedState;
            });

            const response = await axios.get(
                `${baseUrl}attendances/batch/${batch}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAttendances(response.data);
        } catch (error) {
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

    const formatDateTime = (timestamp) => {
        if (!timestamp) return "N/A";
        const [date, time] = timestamp.split(" ");
        return `${date} ${time}`;
    };

    return (
        <div style={{ padding: "10px", maxWidth: "100%" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Attendance Records
            </Typography>
            {loading ? (
                <Loading />
            ) : (
                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell><b>Sr. No.</b></TableCell>
                                <TableCell><b>Student Name</b></TableCell>
                                {/* <TableCell><b>Course Name</b></TableCell> */}
                                <TableCell><b>In Time</b></TableCell>
                                <TableCell><b>Remark</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendances.length > 0 ? (
                                attendances.map((record, index) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{record.student.name}</TableCell>
                                        {/* <TableCell>
                                            {record.student.qualification || "N/A"}
                                        </TableCell> */}
                                        <TableCell>{formatDateTime(record.attendanceTimestamp)}</TableCell>
                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                fullWidth
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
                                                size="small"
                                                onClick={() => updateAttendance(record.id)}
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No attendance records found
                                    </TableCell>
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
