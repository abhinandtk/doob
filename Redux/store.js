import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./playGroundCart";

export const store = configureStore({
    reducer: {
        slot: slotReducer,
    }
})