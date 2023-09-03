import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "../features/record/RecordSlice";
import userSlice from "../features/user/UserSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    records: recordSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
