import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getFlightCultureData = createAsyncThunk(
  "flights/getFlightCultureData",
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
  "flights/getFlightsSearchSuggestions",
  async ({ searchedCity }: { searchedCity: string }, { getState }) => {
    try {
      const flightCultureData = {
        ...(getState() as RootState).flights.flightCultureData,
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
  "flights/getFlights",
  async (
    {
      entityId,
      year,
      month,
    }: { entityId: string; year?: number | null; month?: number | null },
    { getState }
  ) => {
    try {
      const flightCultureData = {
        ...(getState() as RootState).flights.flightCultureData,
      };
      console.log(flightCultureData);

      const currentDate = new Date();

      const originPlace = entityId;
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const url = `/flight-offers/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
        params: {
          originPlace,
          year: year || currentYear,
          month: month || currentMonth,
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

interface flightsParams {
  citiesForFlights: any;
  status: "fulfilled" | "rejected" | "pending";
  selectedCity: any;
  flightCultureData: any;
  countriesToFlight: any;
}

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    status: "fulfilled",
    selectedCity: {},
    citiesForFlights: null,
    flightCultureData: [],
    countriesToFlight: null,
  } as flightsParams,
  reducers: {
    selectCity(state, action) {
      state.selectedCity = action.payload;
      state.citiesForFlights = null;
    },
  },
  extraReducers(builder) {
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

export const { selectCity } = flightsSlice.actions;

export const searchedCitiesForFlights = (state: RootState) => {
  if (state.flights && state.flights.citiesForFlights) {
    return state.flights.citiesForFlights;
  }
  return [];
};

export const countriesToFlight = (state: RootState) => {
  if (state.flights && state.flights.countriesToFlight) {
    return state.flights.countriesToFlight;
  }
  return null;
};

export const getCultureData = (state: RootState) => {
  if (state.flights && state.flights.flightCultureData) {
    return state.flights.flightCultureData;
  }
  return [];
};

export const selectSelectedCity = (state: RootState) => {
  if (state.flights && state.flights.selectedCity) {
    return state.flights.selectedCity;
  }
  return "";
};

export default flightsSlice.reducer;
