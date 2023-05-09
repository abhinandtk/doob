import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    selectedSlots: [],
}

const slotSelectSlice = createSlice({
    name: 'gound_cart',
    initialState: INITIAL_STATE,
    reducers: {
        selectSlots: (state, action) => {
            const { slotId } = action.payload
            if (state.selectedSlots.includes(slotId)) {
                state.selectedSlots = state.selectedSlots.filter(id => id !== slotId)
            } else {
                state.selectedSlots = [...state.selectedSlots, slotId]
            }

        }
    }
})

export const {selectSlots} = slotSelectSlice.actions;
export default  slotSelectSlice.reducer