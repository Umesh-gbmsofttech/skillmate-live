import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trainer: null,
    student: null,
    trainers: [],
    students: [],
};

const communityDataSlice = createSlice({
    name: 'communityData',
    initialState,
    reducers: {
        setTrainers: (state, action) => {
            state.trainer = action.payload;  // Store the array communitys trainers
        },
        setStudents: (state, action) => {
            state.student = action.payload;  // Store the array communitys student
        },

        setTrainer: (state, action) => {
            state.trainer = action.payload;  // Store the single selected trainer
        },
        setStudent: (state, action) => {
            state.student = action.payload;  // Store the single selected student
        },
        clearCommunityData: (state) => {
            state.trainer = null;  // Clear selected trainer
            state.student = null;  // Clear selected student
        },
    },
});

export const { setTrainers, setStudents, setTrainer, setStudent, clearCommunityData } = communityDataSlice.actions;

export default communityDataSlice.reducer;
