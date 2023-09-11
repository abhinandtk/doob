import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./playGroundCart";
import productReducer from "./productDetail";
import storeCartCountReducer from "./cartsCount";
import groundCartCountReducer from './playgroundCartCount'
import apiReducer from "./apiSuccess";
import updateNavbarReducer from "./updateNavbar";
import notificationReducer from './notificationCount';
import messagesReducer from './messagesCount';
import chatUpdateReducer from "./chatRefresh"
import activeModalReducer from "./loginShow"
export const store = configureStore({
  reducer: {
    slot: slotReducer,
    product: productReducer,
    storeCartCount: storeCartCountReducer,
    groundCartCount: groundCartCountReducer,
    navbarUpdate: updateNavbarReducer,
    api: apiReducer,
    notificationCount: notificationReducer,
    chatCount: messagesReducer,
    chatUsers: chatUpdateReducer,
    activeShow: activeModalReducer,
  },
});
