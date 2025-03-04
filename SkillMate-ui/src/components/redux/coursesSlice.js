import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../components/urls/baseUrl';
import { showSuccessToast, showErrorToast } from '../../components/utility/ToastService';


export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}courses`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch courses.');
    }
});

export const addCourse = createAsyncThunk('courses/addCourse', async (courseData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}courses`, courseData, {
            headers: { 'Content-Type': 'application/json' },
        });
        showSuccessToast('Course added successfully!');
        return response.data;
    } catch (error) {
        showErrorToast('Failed to add course.');
        return rejectWithValue(error.response?.data || 'Failed to add course.');
    }
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async (updatedCourse, { rejectWithValue }) => {
    try {
        const courseId = Number(updatedCourse.id); // Ensure ID is a number
        if (isNaN(courseId)) {
            throw new Error("Invalid course ID");
        }

        const response = await axios.put(`${baseUrl}courses/${courseId}`, updatedCourse, {
            headers: { 'Content-Type': 'application/json' },
        });

        showSuccessToast('Course updated successfully!');
        return response.data;
    } catch (error) {
        showErrorToast('Failed to update course.');
        return rejectWithValue(error.response?.data || 'Failed to update course.');
    }
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.delete(`${baseUrl}courses/${courseId}`, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            showSuccessToast('Course deleted successfully!');
            dispatch(fetchCourses()); // Refresh the course list
            return courseId;
        } else {
            return rejectWithValue('Failed to delete course.');
        }
    } catch (error) {
        showErrorToast('Failed to delete course.');
        return rejectWithValue(error.response?.data || 'Failed to delete course.');
    }
});


const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        myCourses: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        addToMyCourses: (state, action) => {
            state.myCourses.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch courses';
            })
            .addCase(addCourse.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses.push(action.payload);
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateCourse.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.courses.findIndex((course) => course.id === action.payload.id); // Use id, not _id
                if (index !== -1) {
                    state.courses[ index ] = action.payload;
                }
            })

            .addCase(updateCourse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter((course) => course._id !== action.payload);
            });
    },
});
export const { addToMyCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
