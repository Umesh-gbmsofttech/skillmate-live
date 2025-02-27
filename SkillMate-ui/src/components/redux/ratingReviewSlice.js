// src/redux/ratingReviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../urls/baseUrl';

// Fetch reviews based on course, trainer, or all
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async ({ courseId, trainerId, token }, { rejectWithValue }) => {
        try {
            let url = `${baseUrl}ratings-reviews`;
            if (trainerId) url = `${baseUrl}ratings-reviews/trainer/${trainerId}`;
            else if (courseId) url = `${baseUrl}ratings-reviews/course/${courseId}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }

            let data = await response.json();

            // Flatten array if it's an array of arrays
            if (Array.isArray(data) && Array.isArray(data[0])) {
                data = data.flat();
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ratingReviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(fetchReviews.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.reviews = action.payload;
            // })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                // Merge new reviews while preventing duplicates
                const newReviews = action.payload.filter(
                    (newReview) => !state.reviews.some((existing) => existing.id === newReview.id)
                );
                state.reviews = [...state.reviews, ...newReviews];
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ratingReviewSlice.reducer;
