import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout } from "./UserApi";

const initialState = {
  loggedIn: false,
  name: undefined,
  error: undefined,
};

const handelAuthenticationResponse = (state, { payload }) => {
  if (payload.status !== 200 || payload?.data?.name === undefined) {
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
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, handelAuthenticationResponse)
      .addCase(getUser.rejected, () => initialState)
      .addCase(login.fulfilled, handelAuthenticationResponse)
      .addCase(login.rejected, (state) => {
        state.loggedIn = false;
        state.error = "main.invalidNamePass";
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState);
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
