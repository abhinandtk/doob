import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    proVarient: null,
    proPrimaryVarient: null,
    proPrimaryVarientId: null,
    proSecondaryVarientId: null,
  },
  reducers: {
    setProVarient: (state, action) => {
      state.proVarient = action.payload
    },
    setProPrimaryVarient: (state, action) => {
      state.proPrimaryVarient = action.payload
    },
    setProPrimaryVarientId: (state, action) => {
      state.proPrimaryVarientId = action.payload
    },
    setProSecondaryVarientId: (state, action) => {
      state.proSecondaryVarientId = action.payload
    },
  },
})

export const {
  setProVarient,
  setProPrimaryVarient,
  setProPrimaryVarientId,
  setProSecondaryVarientId,
} = productSlice.actions

export default productSlice.reducer