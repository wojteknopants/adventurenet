import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import toast from "react-hot-toast";

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
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    // console.log(localStorage.getItem("access"));
    await dispatch(loadUser());

    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    { email, password, re_password }: RegisterParams,
    { rejectWithValue }
  ) => {
    try {
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
      toast.success("Activation link has been send!");
      return res.data;
    } catch (error: any) {
      const firstError = <any>Object.values(error.response.data)[0];
      toast.error(firstError[0]);
      return rejectWithValue(firstError[0]);
    }
  }
);

export const checkIsAuthenticated = createAsyncThunk(
  "auth/checkIsAuthenticated",
  async (_, { dispatch }) => {
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
      // console.log(localStorage.getItem("access"));
      await dispatch(loadUser());
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }
);

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
  async (_, { rejectWithValue }) => {
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
      return rejectWithValue("cum");
    }
  }
);
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ current_password }: { current_password?: string }) => {
    const url = "/auth/users/me/";

    const data = { current_password };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },

      data,
    };

    const res = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
      config
    );
    console.log(res.data);
    return res.data;
  }
);

interface AuthParams {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | undefined;
  user: object;
  status: "idle" | "succeeded" | "failed";
  error: string | undefined;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: true,
    user: {},
    status: "idle",
    error: "",
  } as AuthParams,
  reducers: {
    logOut(state) {
      state.status = "succeeded";
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = {};
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
        state.error = "";
        toast.success("Successful login!");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
        toast.error("Wrong email or password!");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      })

      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(checkIsAuthenticated.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = action.payload;
      })
      .addCase(checkIsAuthenticated.rejected, (state, action) => {
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
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        toast.success("Account deleted!");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        toast.error("Something went wrong!");
      });
  },
});

export const { logOut } = authSlice.actions;

export const getIsAuthenticated = (state: RootState) => {
  // console.log(state.auth.isAuthenticated);
  return state.auth.isAuthenticated;
};
export const getStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
