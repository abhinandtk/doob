import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./playGroundCart";
import productReducer from "./productDetail";
import storeCartCountReducer from "./cartsCount";
import groundCartCountReducer from './playgroundCartCount'
import apiReducer from "./apiSuccess";
import updateNavbarReducer from "./updateNavbar";

export const store = configureStore({
  reducer: {
    slot: slotReducer,
    product: productReducer,
    storeCartCount: storeCartCountReducer,
    groundCartCount: groundCartCountReducer,
    navbarUpdate: updateNavbarReducer,
    api: apiReducer,
  },
});
