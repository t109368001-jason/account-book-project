import { createSlice } from "@reduxjs/toolkit";
import { getRecords } from "./RecordApi";

const initialState = {
  page: 0,
  size: 10,
  search: null,
  data: {},
  loading: false,
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
  extraReducers: {
    [getRecords.pending]: (state) => {
      state.loading = true;
    },
    [getRecords.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    },
    [getRecords.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setPage, setSize, setSearch } = recordSlice.actions;

export const selectRecords = (state) => state.records;

export default recordSlice.reducer;
