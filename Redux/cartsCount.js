import { createSlice } from "@reduxjs/toolkit";



const storeCartCountSlice = createSlice({
    name: 'goundstore_cart_count',
    initialState: {
        storeCount:0,
    },
    reducers: {
        updateStoreCartCount: (state, action) => {
            state.storeCount = action.payload;
        },
    },
})

export const { updateStoreCartCount } = storeCartCountSlice.actions
export default storeCartCountSlice.reducer