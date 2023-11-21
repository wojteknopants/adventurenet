import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// interface PostsParams {
//   comments: any;
//   status: "idle" | "succeeded" | "failed";
//   error: string | undefined;
// }

interface AddCommentParams {
  postId: number;
  content: string;
}

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

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
  async ({ postId, content }: AddCommentParams) => {
    try {
      const url = `/posts/${postId}/comments/`;
      console.log(postId, content);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({ content: content });

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

export const addCommentLike = createAsyncThunk(
  "/posts/post_comment/addCommentLike",
  async ({ commentId }: any) => {
    try {
      const url = `/comments/${commentId}/like/`;
      console.log(commentId);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = {};

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        body,
        config
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCommentLike = createAsyncThunk(
  "/posts/post_comment/deleteCommentLike",
  async ({ commentId }: any) => {
    try {
      const url = `/comments/${commentId}/like/`;
      console.log(commentId);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        config
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const replaceObjectById = ({ id, newObject, arrayOfObjects }: any) => {
  const index = arrayOfObjects.findIndex((obj: any) => obj.id === id);
  if (index !== -1) {
    // Replace the object at the found index with the new object
    arrayOfObjects[index] = newObject;
    console.log(`Object with ID ${id} replaced successfully.`);
  } else {
    console.log(`Object with ID ${id} not found.`);
  }
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
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
      })
      .addCase(addCommentLike.fulfilled, (state, action) => {
        console.log(action.payload);
        replaceObjectById({
          id: action.payload.id,
          newObject: action.payload,
          arrayOfObjects: state.comments,
        });
        state.status = "success";
      })
      .addCase(addCommentLike.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteCommentLike.fulfilled, (state, action) => {
        console.log(action.payload);
        replaceObjectById({
          id: action.payload.id,
          newObject: action.payload,
          arrayOfObjects: state.comments,
        });
        state.status = "success";
      })
      .addCase(deleteCommentLike.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const selectComments = (state: any) => state.comments.comments;

export default commentsSlice.reducer;
