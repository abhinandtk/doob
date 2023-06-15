import { createSlice } from "@reduxjs/toolkit";



const groundCartCountSlice = createSlice({
    name: 'gound_cart_count',
    initialState: {
        groundCount:0,
    },
    reducers: {
        updateGroundCartCount: (state, action) => {
            state.groundCount = action.payload;
        },
    },
})

export const { updateGroundCartCount } = groundCartCountSlice.actions
export default groundCartCountSlice.reducer