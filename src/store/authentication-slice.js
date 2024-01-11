import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggenIn: false,
  userData: undefined,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggenIn = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.isLoggenIn = false;
    },
  },
});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
