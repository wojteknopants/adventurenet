import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const profilesAdapter = createEntityAdapter({});

const initialState = profilesAdapter.getInitialState();

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (user_id) => `/profiles/${user_id}/`,
      providesTags: (result, error, arg) =>
        result ? [{ type: "Profile" }] : [{ type: "Profile" }],
    }),

    updateProfile: builder.mutation({
      query: (initialProfile) => ({
        url: `/profiles/me/`,
        method: "PATCH",
        body: initialProfile,
      }),
      invalidatesTags: () => [{ type: "Profile" }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApiSlice;
