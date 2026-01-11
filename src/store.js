import { configureStore } from "@reduxjs/toolkit";
import { baseQueryApi } from "./services/baseQueryApiSlice";

export const store = configureStore({
  reducer: {
    [baseQueryApi.reducerPath]: baseQueryApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseQueryApi.middleware),
  devTools: true,
});
