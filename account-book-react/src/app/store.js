import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "../features/record/RecordSlice";
import userSlice from "../features/user/UserSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    records: recordSlice,
  },
});

export default store;
