import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication-slice";

const store = configureStore({
  reducer: {
    authenticationSlice,
  },
});
export default store;
