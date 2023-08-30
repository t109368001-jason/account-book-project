import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    name: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
