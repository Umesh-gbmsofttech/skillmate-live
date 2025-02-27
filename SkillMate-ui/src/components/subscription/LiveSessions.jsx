import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from "@mui/material";
import axios from "axios"; // ✅ Import axios
import logo from "../../assets/skillmate.jpg";
import baseUrl from "../urls/baseUrl";

function LiveSessions({ myCourses, userData, token }) {
    const [isLoading, setIsLoading] = React.useState(false);

    console.log(myCourses, 'sdhfuhsdu')
    const handleJoinClick = (meeting) => {
        const currentTime = new Date().toISOString().slice(11, 19); // Extract "HH:mm:ss"

        console.log(meeting, 'joing', meeting.batch.id)
        // Create attendance record when joining
        createAttendance(meeting.id, meeting.batch.id);

        if (meeting?.meetingLink) {
            window.open(meeting.meetingLink, "_blank", "noopener,noreferrer");
        } else {
            console.log("Meeting link not available");
        }
    };

    // Function to create attendance record when the student joins
    const createAttendance = async (meetingId, batchId) => {
        console.log("Meeting ID:", meetingId);
        setIsLoading(true);
        try {
            // ✅ Ensure userData and token are valid
            if (!userData || !userData.id || !token) {
                console.error("Missing user data or token:", userData, token);
                alert("User data is missing. Please log in again.");
                return;
            }

            if (!meetingId) {
                console.error("Invalid meeting ID:", meetingId);
                alert("Meeting ID is missing. Please try again.");
                return;
            }

            const attendanceData = {
                attended: true,
                remark: `Joined meeting at ${new Date().toLocaleTimeString()}`,
                student: { id: userData.id },
                meeting: { id: meetingId },
                batch_id: batchId// i wanted to send the batch id aswell it should be a integer
            };

            console.log("Sending attendance request:", attendanceData);

            const response = await axios.post(`${baseUrl}attendances`, attendanceData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Attendance created:", response.data);
        } catch (error) {
            console.error("Error creating attendance record:", error.response ? error.response.data : error.message);
            alert("There was an error while marking your attendance. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box padding={4}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                Upcoming Live Sessions
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {myCourses.length > 0 && myCourses.some(course => course.meetings && course.meetings.length > 0) ? (
                    myCourses.flatMap((course) =>
                        (course.meetings || []).map((meeting, index) => (
                            <Grid item xs={12} sm={6} md={4} key={`${meeting.id}-${index}`}>
                                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                    <CardMedia
                                        component="img"
                                        alt={course.title}
                                        height="200"
                                        image={course.image ? `data:image/png;base64,${course.image}` : logo}
                                    />
                                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                        <Typography variant="h6">{course.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Start Time: {meeting.startTime || "TBA"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            End Time: {meeting.endTime || "TBA"}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginTop: 2, width: "80%" }}
                                            onClick={() => handleJoinClick(meeting)}  // Only pass `meeting`
                                            disabled={isLoading} // Disable when loading
                                        >
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Join Now"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )
                ) : (
                    <Typography variant="h6" color="textSecondary" align="center">
                        No live sessions available.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
}

export default LiveSessions;
