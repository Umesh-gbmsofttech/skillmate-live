// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import baseUrl from '../urls/baseUrl';

// export const fetchTrainerCourses = createAsyncThunk(
//     'trainerCourses/fetchTrainerCourses',
//     async (trainerId, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${baseUrl}trainer-courses/courses/${trainerId}`);
//             console.log('trainer id:', trainerId)
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// const trainerCoursesSlice = createSlice({
//     name: 'trainerCourses',
//     initialState: {
//         courses: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchTrainerCourses.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchTrainerCourses.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.courses = Array.isArray(action.payload) ? action.payload : [];
//             })
//             .addCase(fetchTrainerCourses.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });


// export default trainerCoursesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../urls/baseUrl';

export const fetchTrainerCourses = createAsyncThunk(
    'trainerCourses/fetchTrainerCourses',
    async (trainerId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}trainer-courses/courses/${trainerId}`);
            console.log('trainer id:', trainerId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const trainerCoursesSlice = createSlice({
    name: 'trainerCourses',
    initialState: {
        courses: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCourses: (state) => {
            state.courses = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainerCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainerCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchTrainerCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCourses } = trainerCoursesSlice.actions;
export default trainerCoursesSlice.reducer;
