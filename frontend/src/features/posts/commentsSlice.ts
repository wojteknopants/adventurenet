import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";

// interface PostsParams {
//   comments: any;
//   status: "idle" | "succeeded" | "failed";
//   error: string | undefined;
// }

export const fetchComments = createAsyncThunk(
  "/posts/post_id/comments/",
  async ({ postId }: any) => {
    try {
      const url = `/posts/${postId}/comments/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        config
      );

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "/posts/post_comment",
  async ({ postId }: any) => {
    try {
      const url = `/posts/${postId}/comments/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({ content: "sasat pisun" });

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        body,
        config
      );
    } catch (error) {
      console.log(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: "",
  } as any,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const getComments = (state: any) => state.comments.comments;

export default commentsSlice.reducer;
