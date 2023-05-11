import { configureStore } from "@reduxjs/toolkit";
// import productDetailReducer from "./redux/productDetail";
import slotReducer from "./playGroundCart";
import productReducer from "./productDetail"
export const store = configureStore({
  reducer: {
    slot: slotReducer,
    product: productReducer,
  },
});
