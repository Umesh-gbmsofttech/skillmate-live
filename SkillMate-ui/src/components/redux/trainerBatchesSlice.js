import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../urls/baseUrl';

export const fetchTrainerBatches = createAsyncThunk(
    'trainerBatches/fetchTrainerBatches',
    async (trainerId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}batches/trainer/${trainerId}`);
            console.log('trainer id:', trainerId)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const trainerBatchesSlice = createSlice({
    name: 'trainerBatches',
    initialState: {
        batches: [],
        batchIds: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainerBatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainerBatches.fulfilled, (state, action) => {
                state.loading = false;
                state.batches = action.payload;
                state.batchIds = action.payload.map((batch) => batch.id);
            })
            .addCase(fetchTrainerBatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default trainerBatchesSlice.reducer;
