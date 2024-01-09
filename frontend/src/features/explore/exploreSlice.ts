import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import toast from "react-hot-toast";

export const getSuggestionsForTours = createAsyncThunk(
  "explore/getSuggestionsForTours",
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

export const getSuggestionsForItineraries = createAsyncThunk(
  "explore/getSuggestionsForItineraries",
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
  "explore/getPOI",
  async ({ latitude, longitude }: { latitude: string; longitude: string }) => {
    try {
      const url = `/poi-search/`;

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
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
);

export const generateItineraries = createAsyncThunk(
  "explore/generateItineraries",
  async ({
    latitude,
    longitude,
    amountOfDays,
    intensiveness,
  }: {
    latitude: string;
    longitude: string;
    amountOfDays: number | null;
    intensiveness: "hard" | "easy" | null;
  }) => {
    try {
      const url = `/generate-itinerary/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = {
        latitude: `${latitude}`,
        longitude: `${longitude}`,
        number_of_days: amountOfDays || 1,
        intensiveness: intensiveness?.toLowerCase() || "easy",
      };

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        body,
        config
      );

      console.log(res.data);
      if (res.data) {
        toast.success("Itinerary generated!");
        return res.data;
      }
      toast.error("Probably this city is not supported now!");
    } catch (error) {
      console.log(error);
      toast.error("Probably this city is not supported now!");
    }
  }
);

export const saveItinerary = createAsyncThunk(
  "explore/saveItinerary",
  async ({ itinerary }: { itinerary: string }, { getState, dispatch }) => {
    try {
      console.log("Save itineraries!");
      const url = `/itineraries/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = {
        content: itinerary,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
        body,
        config
      );

      dispatch(getItineraries);
      toast.success("Itinerary saved!");
      console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  }
);

export const getItineraries = createAsyncThunk(
  "explore/getItineraries",
  async () => {
    try {
      console.log("Get itineraries!");
      const url = `/itineraries/`;

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

      console.log(res.data);
      if (res.data) {
        const reversRes = res.data.slice().reverse();
        console.log("REVERSED", reversRes);
        return reversRes;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

interface exploreParams {
  suggestionsForTours: any;
  status: "fulfilled" | "rejected" | "pending";
  activitiesStatus: "fulfilled" | "rejected" | "pending";
  generateStatus: "fulfilled" | "rejected" | "pending";
  selectedCity: any;
  suggestionsForItineraries: any;
  generatedItinerary: any;
  activities: any;
  itineraries: any;
}

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    suggestionsForTours: null,
    suggestionsForItineraries: null,
    status: "fulfilled",
    selectedCity: {},
    generatedItinerary: null,
    activitiesStatus: "fulfilled",
    generateStatus: "fulfilled",
    activities: [],
    itineraries: [],
  } as exploreParams,
  reducers: {
    logOut(state) {
      state.status = "fulfilled";
    },
    selectCityForTours(state, action) {
      state.selectedCity = action.payload;
      state.suggestionsForTours = null;
    },
    selectCityForItineraries(state, action) {
      state.selectedCity = action.payload;
      state.suggestionsForItineraries = null;
    },
    deleteGeneratedItinerary(state, action) {
      state.generatedItinerary = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSuggestionsForTours.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.suggestionsForTours = action.payload;
    });
    builder.addCase(getSuggestionsForTours.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.activitiesStatus = "fulfilled";
      state.activities = action.payload;
    });
    builder.addCase(getActivities.pending, (state, action) => {
      state.activitiesStatus = "pending";
    });
    builder.addCase(getActivities.rejected, (state, action) => {
      state.activitiesStatus = "rejected";
    });
    builder.addCase(generateItineraries.fulfilled, (state, action) => {
      state.generateStatus = "fulfilled";
      state.generatedItinerary = action.payload;
    });
    builder.addCase(generateItineraries.pending, (state, action) => {
      state.generateStatus = "pending";
    });
    builder.addCase(generateItineraries.rejected, (state, action) => {
      state.generateStatus = "rejected";
    });
    builder.addCase(getSuggestionsForItineraries.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.suggestionsForItineraries = action.payload;
    });
    builder.addCase(getSuggestionsForItineraries.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(getItineraries.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.itineraries = action.payload;
    });
    builder.addCase(getItineraries.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(saveItinerary.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.generatedItinerary = null;
    });
    builder.addCase(saveItinerary.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { selectCityForTours } = exploreSlice.actions;
export const { selectCityForItineraries } = exploreSlice.actions;
export const { deleteGeneratedItinerary } = exploreSlice.actions;

export const selectSuggestionsForTours = (state: RootState) => {
  if (state.explore && state.explore.suggestionsForTours) {
    return state.explore.suggestionsForTours;
  }
  return [];
};

export const selectSuggestionsForItineraries = (state: RootState) => {
  if (state.explore && state.explore.suggestionsForItineraries) {
    return state.explore.suggestionsForItineraries;
  }
  return [];
};

export const selectItineraries = (state: RootState) => {
  if (state.explore && state.explore.itineraries) {
    return state.explore.itineraries;
  }
  return [];
};

export const selectGeneratedItinerary = (state: RootState) => {
  if (state.explore && state.explore.generatedItinerary) {
    return state.explore.generatedItinerary;
  }
  return null;
};

export const selectGenerateStatus = (state: RootState) => {
  return state.explore.generateStatus;
};

export const selectActivities = (state: RootState) => {
  if (state.explore && state.explore.activities) {
    return state.explore.activities;
  }
  return [];
};

export const selectActivitiesStatus = (state: RootState) => {
  return state.explore.activitiesStatus;
};

export default exploreSlice.reducer;
