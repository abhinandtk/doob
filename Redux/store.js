import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "./redux/productDetail";
import slotReducer from "./playGroundCart";

export const store = configureStore({
  reducer: {
    slot: slotReducer,
    product: productDetailReducer,
  },
});
