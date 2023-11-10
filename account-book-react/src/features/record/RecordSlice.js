import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  page: 0,
  size: 10,
  orderBy: "id",
  direction: "desc",
  search: null,
  data: { content: [], totalElements: 0 },
};
export const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    reset: () => initialState,
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.page = 0;
      state.size = action.payload;
    },
    setPagination: (state, action) => {
      state.page = action.payload.page;
      state.size = action.payload.size;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setSort: (state, action) => {
      state.orderBy = action.payload.orderBy;
      state.direction = action.payload.direction;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 0;
    },
    setData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const {
  reset,
  setPage,
  setSize,
  setPagination,
  setOrderBy,
  setDirection,
  setSort,
  setSearch,
  setData,
} = recordSlice.actions;

export const selectRecords = (state) => state.records;

export default recordSlice.reducer;
