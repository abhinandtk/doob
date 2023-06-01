import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'api',
  initialState: true,
  reducers: {
    apiCallSuccess: (state) => {
      return !state;
    },
  },
});

export const { apiCallSuccess } = apiSlice.actions;

export default apiSlice.reducer;