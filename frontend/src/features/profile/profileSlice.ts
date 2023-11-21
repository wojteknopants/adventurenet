import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const profilesAdapter = createEntityAdapter({});

const initialState = profilesAdapter.getInitialState();

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProfiles: builder.query({
    //   query: () => "/profiles/",
    //   transformResponse: (responseData: any) => {
    //     const loadedProfiles = responseData.map((profile: any) => {
    //       console.log(profile);
    //       return profile;
    //     });
    //     return profilesAdapter.setAll(initialState, loadedProfiles);
    //   },
    //   providesTags: (result, error, arg) =>
    //     result ? [{ type: "Profile", id: "LIST" }] : [{ type: "Profile" }],
    // }),
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
      invalidatesTags: (result, error, arg) => [{ type: "Profile" }],
    }),
    // getPosts: builder.query({
    //   query: () => "/posts/",
    //   transformResponse: (responseData) => {
    //     const loadedPosts = responseData.map((post) => {
    //       // console.log(post);
    //       return post;
    //     });
    //     return postsAdapter.setAll(initialState, loadedPosts);
    //   },
    //   providesTags: (result, error, arg) =>
    //     result
    //       ? [
    //           { type: "Post", id: "LIST" },
    //           ...result.ids.map((id) => ({ type: "Post", id })),
    //         ]
    //       : {},
    // }),
    // getPostsByUserId: builder.query({
    //   query: (id) => `/posts/?userId=${id}`,
    //   transformResponse: (responseData) => {
    //     const loadedPosts = responseData.map((post) => {
    //       return post;
    //     });
    //     return postsAdapter.setAll(initialState, loadedPosts);
    //   },
    //   providesTags: (result, error, arg) => {
    //     console.log(result);
    //     return [...result.ids.map((id) => ({ type: "Post", id }))];
    //   },
    // }),
    // addNewPost: builder.mutation({
    //   query: (initialPost) => ({
    //     url: "/posts/",
    //     method: "POST",
    //     body: initialPost,
    //   }),
    //   invalidatesTags: [{ type: "Post", id: "LIST" }],
    // }),
    // deletePost: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/posts/${id}/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    // }),
  }),
});

export const {
  // useGetProfilesQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  //   useAddNewPostMutation,
  //   useDeletePostMutation,
  //   useUpdatePostMutation,
  // useAddReactionMutation,
} = profileApiSlice;

// export const selectProfilesResult =
//   profileApiSlice.endpoints.getProfiles.select(undefined);

// const selectProfilesData = createSelector(
//   selectProfilesResult,
//   (profilesResult) => profilesResult.data
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllProfiles,
//   selectById: selectProfileById,
//   selectIds: selectProfileIds,
//   // Pass in a selector that returns the posts slice of state
// } = profilesAdapter.getSelectors(
//   (state: any) => selectProfilesData(state) ?? initialState
// );
