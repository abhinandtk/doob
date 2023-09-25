const { createSlice } = require("@reduxjs/toolkit")


const INITIAL_STATE = {
    isMobileHidden: false,
}

const chatMobileViewSlice = createSlice({
    name: 'chatMobile',
    initialState: INITIAL_STATE,
    reducers: {
        chatMobileHidden: (state, action) => {
            return {
                isMobileHidden: action.payload
            }
        },
    },

})
export const { chatMobileHidden } = chatMobileViewSlice.actions;
export default chatMobileViewSlice.reducer;