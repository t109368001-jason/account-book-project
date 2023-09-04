import { createSlice } from "@reduxjs/toolkit";
import { getRecords } from "./RecordApi";

const initialState = {
  page: 0,
  size: 10,
  search: null,
  data: {},
};
export const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.page = 0;
      state.size = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.fulfilled, (state, { payload }) => {
        state.data = payload.data;
      })
      .addCase(getRecords.rejected, (state) => {
        state.data = {};
      });
  },
});

export const { setPage, setSize, setSearch } = recordSlice.actions;

export const selectRecords = (state) => state.records;

export default recordSlice.reducer;
