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
              { type: "Bookmark", id: "LIST" },
              ...result.ids.map((id: number) => ({ type: "Bookmark", id })),
            ]
          : [{ type: "Bookmark" }],
    }),
    addBookmark: builder.mutation({
      query: (data) => ({
        url: `/saved-items/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        { type: "ProfilePost", id: "LIST" },
        { type: "Bookmark", id: arg.id },
      ],
    }),
    deleteBookmark: builder.mutation({
      query: ({ id }) => ({
        url: `/saved-items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Post", id: "LIST" },
          { type: "ProfilePost", id: "LIST" },
          { type: "Bookmark", id: arg.id },
        ];
      },
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarksApiSlice;

export const selectBookmarksResult =
  bookmarksApiSlice.endpoints.getBookmarks.select(undefined);

const selectBookmarksData = createSelector(
  selectBookmarksResult,
  (bookmarksResult) => bookmarksResult.data
);

export const {
  selectAll: selectAllBookmarks,
  selectById: selectBookmarksById,
  selectIds: selectBookmarksIds,
} = bookmarksAdapter.getSelectors(
  (state: RootState) => selectBookmarksData(state) ?? initialState
);
