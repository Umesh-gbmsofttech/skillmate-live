import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../urls/baseUrl';
import { showErrorToast } from '../utility/ToastService';

// Async thunk to fetch meetings by trainer ID and course ID
export const fetchTrainerMeetings = createAsyncThunk(
    "meetings/fetchTrainerMeetings",
    async ({ trainerId, courses }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        if (!Array.isArray(courses) || courses.length === 0) {
            return [];
        }

        const allMeetings = [];

        for (const courseId of courses) {
            try {
                console.log(`Fetching meetings for trainer ${trainerId} and course ${courseId}`);

                const response = await axios.get(
                    `${baseUrl}meetings/trainer/${trainerId}/${courseId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("API response:", response.data);

                // Ensure response.data is an array before spreading
                if (Array.isArray(response.data)) {
                    allMeetings.push(...response.data);
                } else if (response.data) {
                    allMeetings.push(response.data); // Push as single object
                }

            } catch (error) {
                console.error(`Error fetching meetings for course ${courseId}:`, error);
                showErrorToast(`Error fetching meetings for course ${courseId}: ${error.message}`);
            }
        }

        return allMeetings;
    }
);


const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: {
        meetings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainerMeetings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainerMeetings.fulfilled, (state, action) => {
                state.loading = false;
                state.meetings = action.payload;
            })
            .addCase(fetchTrainerMeetings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default meetingsSlice.reducer;
