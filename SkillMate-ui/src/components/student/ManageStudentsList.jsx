import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Grid, Typography, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import defaultProfileImage from '../../assets/profilePic.jpg';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import Search from '../Search';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import baseUrl from '../urls/baseUrl'


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
                const response = await axios.get(`${baseUrl}students`);
                setStudents(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                showErrorToast('Error fetching students!');
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDeleteStudent = (studId) => {
        setStudentToDelete(studId);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (studentToDelete) {
            try {
                const response = await axios.delete(`${baseUrl}students/${studentToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Student deleted successfully!');
                    setStudents((prev) => prev.filter((student) => student.id !== studentToDelete));
                } else {
                    showErrorToast('Failed to delete the student. Please try again.');
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                showErrorToast('An error occurred while trying to delete the student.');
            }
        }
        setIsConfirmDialogOpen(false);
    };

    const handleCancel = () => {
        setIsConfirmDialogOpen(false);
        setStudentToDelete(null);
    };

    const handleCourseEditClick = (studentId) => {
        navigate(`/student-profile-update/${studentId}`);
    };

    if (loading) {
        return <Loading />;
    }

    const fuse = new Fuse(students, {
        keys: ['name', 'technologies', 'experience'],
        threshold: 0.3,
    });

    const filteredStudents = searchQuery ? fuse.search(searchQuery).map(result => result.item) : students;

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" color='#3caacb'>
                    Student&apos;s List
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Search onSearch={setSearchQuery} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="body1" align="center" color='#3caacb'>
                    Number of Results: {filteredStudents.length}
                </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
                <Button variant="contained" color="primary" onClick={handleCourseAddClick}>
                    Add New Student
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={3}>
                    {filteredStudents.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" color="textSecondary">
                                No Students available.
                            </Typography>
                        </Grid>
                    ) : (
                        filteredStudents.map((student) => (
                            <Grid key={student.id} item xs={12} sm={6} md={4} lg={2}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="210"

                                        image={student.image ? `data:image/jpeg;base64,${student.image}` : defaultProfileImage}
                                        alt={`${student.name} profile`}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }} style={{ padding: "8px" }}>
                                        <Typography variant="h6" gutterBottom>
                                            {student.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ fontSize: "13px" }}>
                                            Average Attendance: {student.attendanceByDays || 'N/A'} {student.attendanceAverage || ''}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ fontSize: "13px" }}>
                                            Batches: {Array.isArray(student.batches) ? student.batches.map(batch => batch.id).join(', ') : 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ fontSize: "13px" }}>
                                            Remark By Trainer: {student.remarkByTrainer || 'N/A'}
                                        </Typography>
                                    </CardContent>
                                    <Grid container justifyContent="space-around" sx={{ marginBottom: '8px' }} spacing={1}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleCourseEditClick(student.id)}
                                            >
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteStudent(student.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>

            <ConfirmationDialog
                open={isConfirmDialogOpen}
                onClose={handleCancel}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this student?"
            />
        </Grid>
    );
}

export default ManageStudentsList;
