const { createSlice } = require("@reduxjs/toolkit");

const messagesCountSlice = createSlice({
    name: 'messages_count',
    initialState: {
        chatNotification: 0,
    },
    reducers: {
        updateMessageCount: (state, action) => {
            state.chatNotification = action.payload;
        },
    },
})

export const { updateMessageCount } = messagesCountSlice.actions
export default messagesCountSlice.reducer