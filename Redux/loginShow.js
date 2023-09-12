import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    activeModal: null,
}

const activeModalSlice = createSlice({
    name: 'active_modal',
    initialState: INITIAL_STATE,
    reducers: {
        activeModalShow: (state, action) => {
            state.activeModal = action.payload;
        }
    }
})

export const { activeModalShow } = activeModalSlice.actions;
export default activeModalSlice.reducer;