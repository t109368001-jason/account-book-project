import api from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "user/login",
  ({ username = String, password = String }) => {
    return api.post(
      "/login",
      { username, password },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
  },
);

export const logout = createAsyncThunk("user/logout", () => {
  return api.get(`/logout`);
});

export const getUser = createAsyncThunk("user/getUser", () => {
  return api.get(`/users`);
});
