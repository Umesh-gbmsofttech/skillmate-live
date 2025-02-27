import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../urls/baseUrl';
import { showErrorToast } from '../utility/ToastService';

// Async thunk to fetch meetings by trainer ID and course ID
export const fetchTrainerMeetings = createAsyncThunk(
    "meetings/fetchTrainerMeetings",
    async ({ trainerId, courses }, { rejectWithValue }) => {
        try {
            if (!Array.isArray(courses) || courses.length === 0) {
                return [];
            }

            const allMeetings = [];
            for (const courseId of courses) {
                const response = await axios.get(
                    `${baseUrl}meetings/trainer/${trainerId}/${courseId}`
                );
                allMeetings.push(...response.data);
            }
            return allMeetings;
        } catch (error) {
            showErrorToast(`Error fetching meetings: ${error.message}`);
            return rejectWithValue(error.response?.data || error.message);
        }
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
