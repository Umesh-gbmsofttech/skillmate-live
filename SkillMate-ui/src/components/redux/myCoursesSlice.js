import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../urls/baseUrl";

// const fetchCoursesAndBatches = createAsyncThunk(
//     "myCourses/fetchCoursesAndBatches",
//     async (userId, { getState, rejectWithValue }) => {
//         const token = getState().auth.token;

//         try {
//             if (!token) return rejectWithValue("No token provided");

//             // Fetch enrolled courses
//             const coursesResponse = await axios.get(`${baseUrl}enrollments/enrolled/${userId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             let courses = coursesResponse.data;
//             // Fetch batches for the student
//             const batchResponse = await axios.get(`${baseUrl}batches/student/${userId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const batches = batchResponse.data;


//             // Fetch meetings for each batch and course
//             const updatedCourses = await Promise.all(
//                 courses.map(async (course) => {
//                     let meetings = [];
//                     await Promise.all(
//                         batches.map(async (batch) => {
//                             if (batch.course.id === course.id) {
//                                 try {
//                                     const meetingResponse = await axios.get(
//                                         `${baseUrl}meetings/student/${batch.id}/${course.id}`,
//                                         {
//                                             headers: { Authorization: `Bearer ${token}` },
//                                         }
//                                     );
//                                     if (Array.isArray(meetingResponse.data)) {
//                                         meetings = [...meetings, ...meetingResponse.data];
//                                     } else if (meetingResponse.data) {
//                                         meetings.push(meetingResponse.data);
//                                     }
//                                 } catch (err) {
//                                     console.error(`Error fetching meetings for batch ${batch.id}:`, err);
//                                 }
//                             }
//                         })
//                     );
//                     return { ...course, meetings };
//                 })
//             );

//             return { courses: updatedCourses, batches }; // Return both courses and batches
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch courses and batches");
//         }
//     }
// );
const fetchCoursesAndBatches = createAsyncThunk(
    "myCourses/fetchCoursesAndBatches",
    async (userId, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            if (!token) return rejectWithValue("No token provided");

            // Fetch enrolled courses
            const coursesResponse = await axios.get(`${baseUrl}enrollments/enrolled/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const courses = coursesResponse.data;

            // Fetch batches for the student.  Handle empty batches case.
            let batches = [];
            try {
                const batchResponse = await axios.get(`${baseUrl}batches/student/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                batches = batchResponse.data;
            } catch (batchError) {
                console.warn("No batches found for student:", batchError); // Log warning, but don't reject
            }

            // Fetch meetings only if batches exist
            const updatedCourses = await Promise.all(
                courses.map(async (course) => {
                    const courseMeetings = [];
                    if (batches.length > 0) {
                        await Promise.all(
                            batches.map(async (batch) => {
                                if (batch.course.id === course.id) {
                                    try {
                                        const meetingResponse = await axios.get(
                                            `${baseUrl}meetings/student/${batch.id}/${course.id}`,
                                            { headers: { Authorization: `Bearer ${token}` } }
                                        );
                                        if (meetingResponse.data) {
                                            courseMeetings.push(...(Array.isArray(meetingResponse.data) ? meetingResponse.data : [ meetingResponse.data ]));
                                        }
                                    } catch (meetingError) {
                                        console.error(`Error fetching meetings for batch ${batch.id}:`, meetingError);
                                    }
                                }
                            })
                        );
                    }
                    return { ...course, meetings: courseMeetings };
                })
            );

            return { courses: updatedCourses, batches };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch courses and batches");
        }
    }
);
const fetchEnrolledCoursesOnly = createAsyncThunk(
    "myCourses/fetchEnrolledCoursesOnly",
    async (userId, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            if (!token) return rejectWithValue("No token provided");

            const coursesResponse = await axios.get(`${baseUrl}enrollments/enrolled/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return coursesResponse.data; // Return only the courses
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch courses");
        }
    }
);

const myCoursesSlice = createSlice({
    name: "myCourses",
    initialState: {
        courses: [],
        batches: [],
        enrolledCoursesOnly: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoursesAndBatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoursesAndBatches.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload.courses;
                state.batches = action.payload.batches;
            })
            .addCase(fetchCoursesAndBatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnrolledCoursesOnly.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEnrolledCoursesOnly.fulfilled, (state, action) => {
                state.loading = false;
                state.enrolledCoursesOnly = action.payload;
            })
            .addCase(fetchEnrolledCoursesOnly.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default myCoursesSlice.reducer;
export { fetchCoursesAndBatches, fetchEnrolledCoursesOnly };