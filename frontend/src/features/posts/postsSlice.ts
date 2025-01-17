import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";

const postsAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) => b.created_at.localeCompare(a.created_at),
});

export interface PostParams {
  id: number;
  user: number;
  title: string;
  content: string;
  user_pfp: any;
  images?: [{ image: string }];
  new_images?: any;
  comments_count: number;
  likes_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at?: string;
  new_tags: any;
  tags: any;
}

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/",
      transformResponse: (responseData: PostParams[]) => {
        const loadedPosts = responseData.map((post) => {
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
      query: (user_id: number) => `/profiles/${user_id}/posts/`,
      transformResponse: (responseData: PostParams[]) => {
        const loadedPosts = responseData.map((post) => {
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
              { type: "ProfilePost", id: "LIST" },
              ...result.ids.map((id: number) => ({ type: "ProfilePost", id })),
            ]
          : [{ type: "Post" }],
    }),
    getProfile: builder.query({
      query: (uid: number | "me") => `/profiles/${uid}/`,
      providesTags: (result, error, arg) =>
        result ? [{ type: "Profile" }] : [{ type: "Profile" }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts/",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [
        { type: "Post", id: "LIST" },
        { type: "ProfilePost", id: "LIST" },
        { type: "Bookmark", id: "LIST" },
      ],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}/`,
        method: "PATCH",
        body: initialPost.formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
        { type: "ProfilePost", id: arg.id },
        { type: "Bookmark", id: "LIST" },
      ],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
        { type: "ProfilePost", id: arg.id },

        { type: "Bookmark", id: "LIST" },
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

        { type: "Bookmark", id: "LIST" },
      ],
    }),
    deletePostLike: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/like/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result);
        return [
          { type: "Post", id: arg.id },
          { type: "ProfilePost", id: arg.id },
          { type: "Bookmark", id: "LIST" },
        ];
      },
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
  (state: RootState) => selectPostsData(state) ?? initialState
);

export const selectProfilePostsResult =
  postsApiSlice.endpoints.getProfilePostsById.select(undefined);

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
  (state: RootState) => selectProfilePostsData(state) ?? initialState
);

export const profilePostsSelector = postsAdapter.getSelectors((state: any) => {
  // console.log(state.api.provided.ProfilePost);
  // console.log(state.api.queries.getProfilePostsById);
  // console.log(state.api);
  return state.api ?? initialState;
});
