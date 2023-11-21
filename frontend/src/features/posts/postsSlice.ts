import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const postsAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) => b.created_at.localeCompare(a.created_at),
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/",
      transformResponse: (responseData: any) => {
        const loadedPosts = responseData.map((post: any) => {
          // console.log(post);
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (
        result: any,
        error: FetchBaseQueryError | undefined,
        arg: any
      ) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.ids.map((id: number) => ({ type: "Post", id })),
            ]
          : [{ type: "Post" }],
    }),
    getProfilePostsById: builder.query({
      query: (user_id: any) => `/profiles/${user_id}/posts/`,
      transformResponse: (responseData: any) => {
        const loadedPosts = responseData.map((post: any) => {
          return post;
        });
        console.log(loadedPosts);
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (
        result: any,
        error: FetchBaseQueryError | undefined,
        arg: any
      ) =>
        result
          ? [
              { type: "ProfilePost", id: "LIST" },
              ...result.ids.map((id: number) => ({ type: "ProfilePost", id })),
            ]
          : [{ type: "Post" }],
    }),
    getCommentsByPostId: builder.query({
      query: (post_id: any) => `/posts/${post_id}/comments/`,

      providesTags: (
        result: any,
        error: FetchBaseQueryError | undefined,
        arg: any
      ) =>
        result
          ? [
              { type: "Comments", id: "LIST" },
              ...result.ids.map((id: number) => ({ type: "Comments", id })),
            ]
          : [{ type: "Comments" }],
    }),
    getProfile: builder.query({
      query: (uid: any) => `/profiles/${uid}/`,
      providesTags: (result, error, arg) =>
        result ? [{ type: "Profile" }] : [{ type: "Profile" }],
    }),
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
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts/",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [
        { type: "Post", id: "LIST" },
        { type: "ProfilePost", id: "LIST" },
      ],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}/`,
        method: "PATCH",
        body: {
          title: initialPost.title,
          content: initialPost.content,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
        { type: "ProfilePost", id: arg.id },
      ],
    }),
    addPostLike: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/like/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
        { type: "ProfilePost", id: arg.id },
      ],
    }),
    deletePostLike: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/like/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
        { type: "ProfilePost", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetProfilePostsByIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useAddPostLikeMutation,
  useDeletePostLikeMutation,
  useUpdatePostMutation,
  useGetCommentsByPostIdQuery,
} = postsApiSlice;

export const selectPostsResult =
  postsApiSlice.endpoints.getPosts.select(undefined);

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state: any) => selectPostsData(state) ?? initialState
);

export const selectProfilePostsResult =
  postsApiSlice.endpoints.getProfilePostsById.select(undefined);

// export const selectProfilePostsById = (user_id: any) =>
//   createSelector(
//     (state: any) => state.api,
//     () => {
//       // Check if the api slice and the getProfilePostsById query exist
//       if (
//         postsApiSlice &&
//         postsApiSlice.endpoints &&
//         postsApiSlice.endpoints.getProfilePostsById
//       ) {
//         // Select the data from the cache using the user_id
//         console.log(postsApiSlice);
//         const postsResult =
//           postsApiSlice.endpoints.getProfilePostsById.select(user_id)(
//             postsApiSlice
//           );
//         return postsResult?.data ?? [];
//       }
//       return [];
//     }
//   );

const selectProfilePostsData = createSelector(
  selectProfilePostsResult,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllProfilePosts,
  selectById: selectProfilePostById,
  selectIds: selectProfilePostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state: any) => selectProfilePostsData(state) ?? initialState
);

export const profilePostsSelector = postsAdapter.getSelectors((state: any) => {
  console.log(state.api.provided.ProfilePost);
  console.log(state.api.queries.getProfilePostsById);
  console.log(state.api);
  return state.api ?? initialState;
});
