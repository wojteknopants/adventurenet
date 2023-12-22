import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface exploreParams {
  cities: any;
  status: "fulfilled" | "rejected" | "panding";
  selectedCity: any;
}

export const getCities = createAsyncThunk(
  "explore/getCities",
  async ({ city }: { city: string }) => {
    try {
      const url = `/city-search/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },

        params: { keyword: `${city}` },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        config
      );

      console.log(res.data.data);
      if (res.data.data === undefined) return [{ name: "Not found" }];
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getActivities = createAsyncThunk(
  "explore/getActivities",
  async ({ latitude, longitude }: { latitude: string; longitude: string }) => {
    try {
      const url = `/tours-activities-search/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },

        params: { latitude: `${latitude}`, longitude: `${longitude}` },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        config
      );

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFlights = createAsyncThunk(
  "explore/getActivities",
  async ({ cityFrom }: { cityFrom: string }) => {
    try {
      const url = `/tours-activities-search/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },

        params: { latitude: `${latitude}`, longitude: `${longitude}` },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        config
      );

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    cities: [{}],
    status: "fulfilled",
    selectedCity: {},
  } as exploreParams,
  reducers: {
    logOut(state) {
      state.status = "fulfilled";
    },
    selectCity(state, action) {
      state.selectedCity = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.cities = action.payload;
    });
    builder.addCase(getCities.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(getActivities.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getFlights.rejected, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(getFlights.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { selectCity } = exploreSlice.actions;

// export const getIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const searchedCities = (state: RootState) => {
  if (state.explore && state.explore.cities) {
    return state.explore.cities;
  }
  return [];
};

export default exploreSlice.reducer;
