import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/",
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          // console.log(post);
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Post", id })),
            ]
          : {},
    }),
    getProfilePostsById: builder.query({
      query: () => "/profiles/me/posts/",
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          // console.log(post);
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Profile", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Profile", id })),
            ]
          : {},
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
      invalidatesTags: [{ type: "Post", id: "LIST" }],
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
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    //   addReaction: builder.mutation({
    //     query: ({ postId, reactions }) => ({
    //       url: `posts/${postId}`,
    //       method: "PATCH",
    //       body: { reactions },
    //     }),
    //     async onQueryStarted(
    //       { postId, reactions },
    //       { dispatch, queryFulfilled }
    //     ) {
    //       const patchResult = dispatch(
    //         postsApiSlice.util.updateQueryData(
    //           "getPosts",
    //           undefined,
    //           (draft) => {
    //             const post = draft.entities[postId];
    //             if (post) post.reactions = reactions;
    //           }
    //         )
    //       );
    //       try {
    //         await queryFulfilled;
    //       } catch {
    //         patchResult.undo();
    //       }
    //     },
    //   }),
  }),
});

export const {
  useGetPostsQuery,
  useGetProfilePostsByIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  // useAddReactionMutation,
} = postsApiSlice;

export const selectPostsResult =
  postsApiSlice.endpoints.getPosts.select(undefined);

export const selectProfilePostsResult =
  postsApiSlice.endpoints.getProfilePostsById.select(undefined);

const selectProfilePostsData = createSelector(
  selectProfilePostsResult,
  (postsResult) => postsResult.data
);

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
  (state) => selectPostsData(state) ?? initialState
);

export const {
  selectAll: selectAllProfilePosts,
  selectById: selectProfilePostById,
  selectIds: selectProfilePostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectProfilePostsData(state) ?? initialState
);
