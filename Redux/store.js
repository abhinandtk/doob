import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./playGroundCart";
import productReducer from "./productDetail";
import storeCartCountReducer from "./cartsCount";
import apiReducer from "./apiSuccess";

export const store = configureStore({
  reducer: {
    slot: slotReducer,
    product: productReducer,
    storeCartCount: storeCartCountReducer,
    api: apiReducer,
  },
});
