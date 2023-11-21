import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API_URL}/`,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  }),
  tagTypes: ["Post", "ProfilePost", "Profile", "Comments"],
  endpoints: (builder) => ({}),
});
