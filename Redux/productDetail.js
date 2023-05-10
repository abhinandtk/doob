import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  proPrimaryVarientId: null,
  proVarient: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: INITIAL_STATE,
  reducers: {
    setProPrimaryVarientId(state, action) {
      state.proPrimaryVarientId = action.payload;
    },
    setProVarient(state, action) {
      state.proVarient = action.payload;
    },
  },
});

export const {setProPrimaryVarientId,setProVarient} = productDetailSlice.actions
export default productDetailSlice.reducer
