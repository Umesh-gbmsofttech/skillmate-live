// Attendances.jsx
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
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Box,
    Grid,
    useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import baseUrl from "../urls/baseUrl";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[2],
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    overflowX: 'auto',
    boxShadow: theme.shadows[2],
    width: '100%',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontFamily: "var(--font-p2)",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        fontSize: '0.8rem',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        '& > *': {
            padding: theme.spacing(0.5),
        }
    },
}));

const Attendances = ({ batches }) => {
    const [selectedBatch, setSelectedBatch] = useState("");
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchAttendances = async () => {
            setLoading(true);
            setError(null);
            if (!selectedBatch) {
                setAttendances([]);
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(
                    `${baseUrl}attendances/batch/${selectedBatch}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAttendances(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendances();
    }, [selectedBatch, token]);

    const handleBatchChange = (event) => {
        setSelectedBatch(event.target.value);
    };

    const renderAttendanceTable = () => {
        if (loading) {
            return <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>;
        }
        if (error) {
            return <Typography color="error" align="center" sx={{ fontFamily: "var(--font-p1)", color: "var(--color-p2)" }}>Error: {error}</Typography>;
        }
        if (attendances.length === 0) {
            return <Typography align="center" sx={{ fontFamily: "var(--font-p1)", color: "var(--color-p2)" }}>No attendance records found for this batch.</Typography>;
        }

        return (
            <StyledTableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No.</StyledTableCell>
                            <StyledTableCell>Student Name</StyledTableCell>
                            <StyledTableCell>In Time</StyledTableCell>
                            <StyledTableCell>Remark</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendances.map((record, index) => (
                            <StyledTableRow key={record.id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{record.student.name}</StyledTableCell>
                                <StyledTableCell>{record.attendanceTimestamp}</StyledTableCell>
                                <StyledTableCell>{record.remark}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        );
    };

    return (
        <Box p={2}>
            <Grid container spacing={0} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "var(--font-p1)", color: "var(--color-p2)" }}>
                        Attendance Records
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <StyledFormControl>
                        <InputLabel id="batch-select-label" sx={{ fontFamily: "var(--font-p1)", color: "var(--color-p2)" }}>Select Batch</InputLabel>
                        <Select
                            labelId="batch-select-label"
                            id="batch-select"
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            fullWidth
                            label="Select Batch"
                        >
                            <MenuItem value="" >
                                <em>-- Select Batch --</em>
                            </MenuItem>
                            {batches.map((batchItem) => (
                                <MenuItem key={batchItem.id} value={batchItem.id} sx={{ fontFamily: "var(--font-p1)", color: "var(--color-p2)" }}>
                                    Batch {batchItem.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </StyledFormControl>
                </Grid>
                <Grid item xs={12}>
                    {renderAttendanceTable()}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Attendances;
