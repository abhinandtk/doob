import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    chatUpdate: false
}

const chatUpdateSlice = createSlice({
    name: 'chat_refresh',
    initialState: INITIAL_STATE,
    reducers: {
        toggleChat: (state) => {
            return {
                ...state,
                chatUpdate: !state.chatUpdate
            };
        }
    }
})

export const { toggleChat } = chatUpdateSlice.actions;
export default chatUpdateSlice.reducer;