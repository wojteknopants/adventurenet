import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginParams {
  email: string;
  password: string;
}

interface ActivateParams {
  uid: string;
  token: string;
}

interface RegisterParams {
  email: string;
  password: string;
  re_password: string;
}

interface AuthParams {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  user: any;
  status: "idle" | "succeeded" | "failed";
  error: string | undefined | null;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParams) => {
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
    loadUser;
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, re_password }: RegisterParams) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
      re_password,
    });

    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );

    return res.data;
  }
);

export const isAuth = createAsyncThunk("auth/isAuth", async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/verify/`,
      body,
      config
    );

    if (res.data.code !== "token_not_valid") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
});

export const activation = createAsyncThunk(
  "auth/activation",
  async ({ uid, token }: ActivateParams) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token });

    await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async ({}, { rejectWithValue }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/me/`,
        config
      );
      return res.data;
    } else {
      return rejectWithValue("rejected!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
  } as AuthParams,
  reducers: {
    logOut(state, action) {
      state.status = "succeeded";
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = action.payload;
      })
      .addCase(isAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
      })
      .addCase(activation.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(activation.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = authSlice.actions;

export const getIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const getStatus = (state: any) => state.auth.status;

export default authSlice.reducer;
