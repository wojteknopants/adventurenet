import { EntityId, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface fetchTagsParams {
  query: string;
}

export const fetchTags = createAsyncThunk(
  "/posts/fetchTags",
  async ({ query }: fetchTagsParams) => {
    try {
      const url = `/mapbox/search-suggest/?query=${query}`;

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

      return res.data.suggestions;
    } catch (error) {
      console.log(error);
    }
  }
);

interface initialStateParams {
  selectedTag: any;
  tagsSuggestions: any;
  status: any;
}

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    selectedTag: null,
    tagsSuggestions: null,
    status: "succeeded",
  } as initialStateParams,
  reducers: {
    selectTag(state, action) {
      state.selectedTag = action.payload;
      state.tagsSuggestions = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tagsSuggestions = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { selectTag } = tagsSlice.actions;

export const selectTagSuggestions = (state: RootState) => {
  if (state.tags && state.tags.tagsSuggestions) {
    return state.tags.tagsSuggestions;
  }
  return [];
};

export default tagsSlice.reducer;
