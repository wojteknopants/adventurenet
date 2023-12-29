import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";

const bookmarksAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) => b.created_at.localeCompare(a.created_at),
});

const initialState = bookmarksAdapter.getInitialState();

export const bookmarksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query({
      query: () => "/profiles/me/saved-items/",
      transformResponse: (responseData: any) => {
        const loadedBookmarks = responseData.map((bookmark: any) => {
          return bookmark;
        });
        return bookmarksAdapter.setAll(initialState, loadedBookmarks);
      },
      providesTags: (
        result: any,
        error: FetchBaseQueryError | undefined,
        arg: any
      ) =>
        result
          ? [
              { type: "Bookmarks", id: "LIST" },
              ...result.ids.map((id: number) => ({ type: "Bookmark", id })),
            ]
          : [{ type: "Bookmarks" }],
    }),
    // updatePost: builder.mutation({
    //   query: (initialPost) => ({
    //     url: `/posts/${initialPost.id}/`,
    //     method: "PATCH",
    //     body: initialPost.formData,
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Post", id: arg.id },
    //     { type: "ProfilePost", id: arg.id },
    //   ],
    // }),
    // deletePost: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/posts/${id}/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Post", id: arg.id },
    //     { type: "ProfilePost", id: arg.id },
    //   ],
    // }),
  }),
});

export const {
  useGetBookmarksQuery,
  //   useGetProfilePostsByIdQuery,
  //   useAddNewPostMutation,
  //   useDeletePostMutation,
  //   useAddPostLikeMutation,
  //   useDeletePostLikeMutation,
  //   useUpdatePostMutation,
  //   useGetCommentsByPostIdQuery,
} = bookmarksApiSlice;

export const selectPostsResult =
  bookmarksApiSlice.endpoints.getBookmarks.select(undefined);

const selectBookmarksData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllBookmarks,
  selectById: selectBookmarksById,
  selectIds: selectBookmarksIds,
  // Pass in a selector that returns the posts slice of state
} = bookmarksAdapter.getSelectors(
  (state: RootState) => selectBookmarksData(state) ?? initialState
);
