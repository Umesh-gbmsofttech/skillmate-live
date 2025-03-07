import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Avatar, Card, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Divider } from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { fetchTrainerCourses } from "../redux/trainerCoursesSlice";
import { fetchTrainerBatches } from "../redux/trainerBatchesSlice";
import defaultProfilePic from "../../assets/skillmate.jpg";
import MyMeetings from "../trainer/MyMeetings";
import Meetings from "../trainer/Meetings";
import Attendances from "../trainer/Attendances";
import CustomButton from "../utility/CustomButton";
import { fetchTrainerMeetings } from "../redux/meetingsSlice";
import { useNavigate } from "react-router-dom";

const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TrainerProfile = () => {
    const [ tilt, setTilt ] = useState({ x: 0, y: 0 });
    const [ openDialog, setOpenDialog ] = useState(null);
    const [ resumeOpen, setResumeOpen ] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const trainerId = userData?.id;
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);



    const { courses } = useSelector((state) => state.trainerCourses);
    const { batches } = useSelector((state) => state.trainerBatches);
    const { meetings } = useSelector((state) => state.meetings);

    const handleUpdateAccountClick = () => {
        navigate(`/trainer-profile-update/${userData.id}`);
    };

    useEffect(() => {
        if (trainerId && Array.isArray(courses) && courses.length > 0) {
            const courseIds = courses.map(courseObj => courseObj.course?.id).filter(id => id);
            dispatch(fetchTrainerMeetings({ trainerId, courses: courseIds }));
        }

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * -20;
            setTilt({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup event listener when component is unmounted
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [ trainerId, courses, dispatch ]);


    const handleCloseDialog = () => {
        setOpenDialog(null);
        setResumeOpen(false);
    };

    useEffect(() => {
        if (trainerId) {
            dispatch(fetchTrainerCourses(trainerId));
            dispatch(fetchTrainerBatches(trainerId));
        }
    }, [ trainerId, dispatch ]);

    const handleOpenResume = () => {
        setResumeOpen(true);
    };

    if (!isAuthenticated) {
        return;
    }
    return (
        <Box sx={ { marginBottom: { sx: 10, md: 20 }, marginTop: { sx: 5, md: 10 } } }>
            <Box sx={ { display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", p: 2 } }>
                <motion.div style={ { perspective: "1000px" } }>
                    <motion.div
                        style={ {
                            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                            transition: "transform 0.1s ease-out",
                        } }
                    >
                        <Card
                            component={ motion.div }
                            initial="hidden"
                            animate="visible"
                            variants={ containerVariants }
                            sx={ { width: 370, textAlign: 'center', p: 4, borderRadius: 4, boxShadow: 6 } }
                        >
                            <Avatar
                                src={ userData?.image ? `data:image/jpeg;base64,${userData.image}` : defaultProfilePic }
                                alt="Profile"
                                sx={ { width: 100, height: 100, cursor: "pointer", boxShadow: 4, m: "0 auto", transition: "0.3s", "&:hover": { transform: "scale(1.1)" }, objectFit: "cover", objectPosition: "top" } }
                                onClick={ () => setOpenDialog("details") }
                            />
                            <Typography variant="h5" fontWeight="bold" mt={ 2 }>
                                { userData?.name || "Trainer" }
                                <IconButton onClick={ handleUpdateAccountClick } color="secondary" sx={ {
                                    '&:focus': {
                                        outline: 'none',
                                        border: 'none',
                                    },
                                } }>                                    <Edit />
                                </IconButton>
                            </Typography>
                            <Typography variant="subtitle2">{ userData?.email }</Typography>

                            <Box sx={ { display: "flex", justifyContent: "center", mt: 3 } }>
                                { [ { label: "Courses", value: courses?.length || 0 }, { label: "Batches", value: batches?.length || 0 }, { label: "Meetings", value: meetings?.length || 0 } ].map((item, index) => (
                                    <Box key={ index } sx={ { textAlign: "center", mx: 1 } }>
                                        <Typography variant="h6">{ item.value }</Typography>
                                        <CustomButton text={ `${item.label}` } onClick={ () => setOpenDialog(item.label.toLowerCase()) } />
                                    </Box>
                                )) }
                            </Box>
                        </Card>
                    </motion.div>
                </motion.div>
            </Box>

            <Dialog open={ openDialog === "details" } onClose={ handleCloseDialog } maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" textAlign="center">My Details</Typography>
                    <IconButton onClick={ () => setOpenDialog(null) } sx={ { position: "absolute", right: 8, top: 8 } }>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    { [ { label: "Mobile", key: "mobileNumber" }, { label: "Address", key: "address" }, { label: "Experience", key: "experience" }, { label: "Technologies", key: "technologies" }, { label: "Status", key: "workingStatus" } ].map(({ label, key }, index) => (
                        <Box key={ index } sx={ { boxShadow: 2, borderRadius: 1, p: 1, mb: 1, ":hover": { boxShadow: 5 }, fontFamily: "var(--font-p1)", } }>
                            <Typography variant="body1" fontWeight="bold">{ label }:</Typography>
                            <Typography variant="body2">{ Array.isArray(userData?.[ key ]) ? userData[ key ].join(", ") : userData?.[ key ] || "N/A" }</Typography>
                        </Box>
                    )) }
                    <Divider sx={ { mt: 2, mb: 2 } } />
                    { userData?.resume && (
                        <Box sx={ { display: "flex", justifyContent: "center", mt: 3 } }>
                            <CustomButton variant="outlined" onClick={ handleOpenResume } text={ 'My Resume' }></CustomButton>
                        </Box>
                    ) }
                </DialogContent>
            </Dialog>

            <Dialog open={ resumeOpen } onClose={ handleCloseDialog } maxWidth="lg" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" textAlign="center" >My Resume</Typography>
                    <IconButton onClick={ handleCloseDialog } sx={ { position: "absolute", right: 8, top: 8 } }>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    { userData?.resume ? (
                        <iframe src={ `data:application/pdf;base64,${userData.resume}` } width="100%" height="600px" title="Resume" />
                    ) : (
                        <Typography>No resume uploaded.</Typography>
                    ) }
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleCloseDialog }>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={ openDialog === "meetings" } onClose={ handleCloseDialog } maxWidth="md" fullWidth>
                <DialogTitle>
                    <IconButton onClick={ handleCloseDialog } sx={ { position: "absolute", right: 8, top: 8 } }>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={ { padding: 0 } }>
                    <Meetings userData={ userData } trainerId={ trainerId } />
                </DialogContent>
            </Dialog>

            { openDialog === "batches" && <Attendances batches={ batches } /> }
            { !openDialog && <MyMeetings trainerId={ userData?.id } courses={ courses } /> }
        </Box>
    );
};

export default TrainerProfile;

