import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, apiSlice, extraOptions) => {
  //const baseUrl = (apiSlice.getState() as any).configuration.baseUrl;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API_URL}/`,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
  console.log();
  return rawBaseQuery(args, apiSlice, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Post", "ProfilePost", "Profile", "Comments", "Bookmark"],
  endpoints: (builder) => ({}),
});
