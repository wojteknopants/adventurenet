import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProfileParams {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileParams = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/`
    );
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data: { email: string; password: string }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/`,
      config
    );
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {})
      .addCase(fetchProfile.rejected, (state, action) => {})
      .addCase(updateProfile.fulfilled, (state, action) => {})
      .addCase(updateProfile.rejected, (state, action) => {});
  },
});

export const {} = profileSlice.actions;

export const getIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const getStatus = (state: any) => state.auth.status;

export default profileSlice.reducer;
