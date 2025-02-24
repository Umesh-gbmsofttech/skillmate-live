import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../urls/baseUrl";

// Async thunk to fetch enrolled courses and meetings
export const fetchCourses = createAsyncThunk(
    "myCourses/fetchCourses",
    async (userId, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            if (!token) return rejectWithValue("No token provided");

            // Fetch batches for the student
            const batchResponse = await axios.get(`${baseUrl}batches/student/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const batches = batchResponse.data;

            // Fetch enrolled courses
            const coursesResponse = await axios.get(`${baseUrl}enrollments/enrolled/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            let courses = coursesResponse.data;

            // Fetch meetings for each batch and course
            const updatedCourses = await Promise.all(
                courses.map(async (course) => {
                    let meetings = [];

                    await Promise.all(
                        batches.map(async (batch) => {
                            if (batch.course.id === course.id) {
                                try {
                                    const meetingResponse = await axios.get(
                                        `${baseUrl}meetings/student/${batch.id}/${course.id}`,
                                        {
                                            headers: { Authorization: `Bearer ${token}` },
                                        }
                                    );

                                    if (Array.isArray(meetingResponse.data)) {
                                        meetings = [...meetings, ...meetingResponse.data];
                                    } else if (meetingResponse.data) {
                                        meetings.push(meetingResponse.data);
                                    }
                                } catch (err) {
                                    console.error(`Error fetching meetings for batch ${batch.id}:`, err);
                                }
                            }
                        })
                    );

                    return { ...course, meetings };
                })
            );

            return updatedCourses;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch courses");
        }
    }
);

const myCoursesSlice = createSlice({
    name: "myCourses",
    initialState: {
        courses: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default myCoursesSlice.reducer;
