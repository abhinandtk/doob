const { createSlice } = require("@reduxjs/toolkit");

const notificationCountSlice = createSlice({
    name: 'notification_count',
    initialState: {
        notification: 0,
    },
    reducers: {
        updateNotificationCount: (state, action) => {
            state.notification = action.payload;
        },
    },
})

export const {updateNotificationCount} =notificationCountSlice.actions
export default notificationCountSlice.reducer