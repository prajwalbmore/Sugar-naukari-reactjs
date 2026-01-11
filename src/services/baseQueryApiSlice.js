/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../constants/app.constant";

const baseQuery = fetchBaseQuery({
  baseUrl: BASEURL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryApi = createApi({
  reducerPath: "clientApi",
  baseQuery: baseQuery,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
