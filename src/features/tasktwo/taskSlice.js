import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    loading: false,
    error: null
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        taskStart: (state) => {
            state.loading = true;
        },
        taskSuccess: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null
        },
        taskFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        taskAdd: (state, action) => {
            state.tasks.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        taskUpdate: (state, action) => {
            const index = state.tasks.findIndex(item => item._id === action.payload._id);
            state.tasks.splice(index ,1, action.payload);
            state.loading = false;
            state.error = null;
        }
    }
});

export const { taskStart, taskSuccess, taskFailure, taskAdd, taskUpdate } = taskSlice.actions;


export default taskSlice.reducer;