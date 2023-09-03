import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout } from "./UserApi";

const initialState = {
  loggedIn: false,
  name: undefined,
  error: undefined,
};

const handelAuthenticationResponse = (state, { payload }) => {
  console.log("handelAuthenticationResponse", { payload });
  if (payload.status !== 200) {
    state.loggedIn = false;
    return;
  }
  state.loggedIn = true;
  state.name = payload.data.name;
  state.error = undefined;
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getUser.fulfilled]: handelAuthenticationResponse,
    [getUser.rejected]: () => initialState,
    [login.fulfilled]: handelAuthenticationResponse,
    [login.rejected]: (state) => {
      state.loggedIn = false;
      state.error = "main.invalidNamePass";
    },
    [logout.fulfilled]: () => initialState,
    [logout.rejected]: () => initialState,
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
