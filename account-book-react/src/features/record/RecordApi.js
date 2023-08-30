import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getRecords = createAsyncThunk(
  "records/getRecords",
  ({ page = 0, size = 10, search }) => {
    let url = `/records?page=${page}&size=${size}`;
    if (search) {
      url += `&search=${search}`;
    }
    return api.get(url);
  },
);
