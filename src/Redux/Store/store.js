import { configureStore } from "@reduxjs/toolkit";
import { courseAPISlice } from "../API/courseAPI";
import { userApiSlice } from "../API/userAPI";

export const store = configureStore({
  reducer: {
    [courseAPISlice.reducerPath]: courseAPISlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courseAPISlice.middleware)
      .concat(userApiSlice.middleware),
});
