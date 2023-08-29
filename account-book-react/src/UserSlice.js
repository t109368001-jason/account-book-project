import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    name: 0,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
