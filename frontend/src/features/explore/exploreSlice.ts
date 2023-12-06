import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getSomething = createAsyncThunk("explore/getSomething", async () => {
  return "";
});

const exploreSlice = createSlice({
  name: "explore",
  initialState: {},
  reducers: {
    logOut(state) {
      state = "succeeded";
    },
  },
  extraReducers(builder) {
    builder.addCase(getSomething.fulfilled, (state, action) => {
      state = "succeeded";
    });
  },
});

// export const { logOut } = exploreSlice.actions;

// export const getIsAuthenticated = (state: any) => state.auth.isAuthenticated;
// export const getStatus = (state: any) => state.auth.status;

export default exploreSlice.reducer;
