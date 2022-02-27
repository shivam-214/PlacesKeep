import { createSlice } from "@reduxjs/toolkit";

const intitalAuthState = {
  isLoggedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: intitalAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
