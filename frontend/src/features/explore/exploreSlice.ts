import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getCitiesForPOI = createAsyncThunk(
  "explore/getCitiesForPOI",
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
      if (res.data.data) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCitiesForFlights = createAsyncThunk(
  "explore/getCitiesForFlights",
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

export const getFlightCultureData = createAsyncThunk(
  "explore/getFlightCultureData",
  async () => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      if (!ipResponse.ok) {
        throw new Error("Failed to fetch IP address");
      }
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      const url = `/flight-culture-data/?ipAddress=${ipAddress}`;

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

      // console.log(res.data);

      const payload = {
        locale: res.data.locale.code,
        market: res.data.market.code,
        searchTerm: "",
      };
      // console.log(payload);

      return payload;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getFlightsSearchSuggestions = createAsyncThunk(
  "explore/getFlightsSearchSuggestions",
  async ({ searchedCity }: { searchedCity: string }, { getState }) => {
    try {
      const flightCultureData = {
        ...(getState() as RootState).explore.flightCultureData,
      };
      flightCultureData.searchTerm = searchedCity;
      console.log(flightCultureData);

      const url = "/flight-search-suggest/";

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = flightCultureData;

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        body,
        config
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
);

interface exploreParams {
  citiesForPOI: any;
  citiesForFlights: any;
  status: "fulfilled" | "rejected" | "pending";
  selectedCity: any;
  flightCultureData: any;
}

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    citiesForPOI: null,
    status: "fulfilled",
    selectedCity: {},
    citiesForFlights: null,
    flightCultureData: [],
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
    builder.addCase(getCitiesForPOI.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.citiesForPOI = action.payload;
    });
    builder.addCase(getCitiesForPOI.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(getActivities.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getCitiesForFlights.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.citiesForFlights = action.payload;
    });
    builder.addCase(getCitiesForFlights.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getFlightCultureData.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.flightCultureData = action.payload;
    });
    builder.addCase(getFlightCultureData.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getFlightsSearchSuggestions.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(getFlightsSearchSuggestions.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { selectCity } = exploreSlice.actions;

// export const getIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const searchedCitiesForPOI = (state: RootState) => {
  if (state.explore && state.explore.citiesForPOI) {
    return state.explore.citiesForPOI;
  }
  return [];
};
export const searchedCitiesForFlights = (state: RootState) => {
  if (state.explore && state.explore.citiesForFlights) {
    return state.explore.citiesForFlights;
  }
  return [];
};

export default exploreSlice.reducer;
