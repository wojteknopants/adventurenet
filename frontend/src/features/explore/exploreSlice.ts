import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginParams {
  email: string;
  password: string;
}

interface AuthParams {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  user: object;
  status: "idle" | "succeeded" | "failed";
  error: string | undefined;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParams, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: false,
    user: {},
    status: "idle",
    error: "",
  } as AuthParams,
  reducers: {
    logOut(state) {
      state.status = "succeeded";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

// export const { logOut } = authSlice.actions;

// export const getIsAuthenticated = (state: any) => state.auth.isAuthenticated;
// export const getStatus = (state: any) => state.auth.status;

export default authSlice.reducer;
