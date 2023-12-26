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
        currency: res.data.currency.code,
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

      console.log(res.data.places);
      return res.data.places;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFlights = createAsyncThunk(
  "explore/getFlights",
  async ({ entityId }: { entityId: string }, { getState }) => {
    try {
      const flightCultureData = {
        ...(getState() as RootState).explore.flightCultureData,
      };
      console.log(flightCultureData);
      const originPlace = entityId;
      const year = 2023; // hardcoded for now
      const month = 12; // hardcoded for now

      const url = `/flight-offers/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
        params: {
          originPlace,
          year,
          month,
          locale: flightCultureData.locale, // From the Culture API
          market: flightCultureData.market,
          currency: flightCultureData.currency,
        },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        config
      );

      console.log(res);
      // if (res.data.data === undefined) return [{ name: "Not found" }];
      return res.data;
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
  countriesToFlight: any;
}

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    citiesForPOI: null,
    status: "fulfilled",
    selectedCity: {},
    citiesForFlights: null,
    flightCultureData: [],
    countriesToFlight: null,
  } as exploreParams,
  reducers: {
    logOut(state) {
      state.status = "fulfilled";
    },
    selectCity(state, action) {
      state.selectedCity = action.payload;
      state.citiesForFlights = null;
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
    builder.addCase(getFlights.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.countriesToFlight = action.payload;
    });
    builder.addCase(getFlights.rejected, (state, action) => {
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
      state.citiesForFlights = action.payload;
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

export const countriesToFlight = (state: RootState) => {
  if (state.explore && state.explore.countriesToFlight) {
    return state.explore.countriesToFlight;
  }
  return [];
};

export const getCultureData = (state: RootState) => {
  if (state.explore && state.explore.flightCultureData) {
    return state.explore.flightCultureData;
  }
  return [];
};

export default exploreSlice.reducer;
