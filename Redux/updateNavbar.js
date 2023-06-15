import { createSlice } from '@reduxjs/toolkit';

const updateSlice = createSlice({
    name: 'update',
    initialState: {
        update: false,
    },
    reducers: {
        toggle: (state) => {
            return !state.update;
        },
    },
});

export const { toggle } = updateSlice.actions;
export default updateSlice.reducer;
