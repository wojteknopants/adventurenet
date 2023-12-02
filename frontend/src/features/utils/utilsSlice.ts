import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "auth",
  initialState: {
    url: "me",
  },
  reducers: {
    // url(state, action) {
    //   state.url = action;
    // },
  },
});

export default utilsSlice.reducer;
