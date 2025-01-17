import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commentsReducer from "./posts/commentsSlice";
import flightsReducer from "./explore/flightsSlice";
import exploreReducer from "./explore/exploreSlice";
import { apiSlice } from "./api/apiSlice";
import tagsReducer from "./posts/tagsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  explore: exploreReducer,
  flights: flightsReducer,
  tags: tagsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  //profile: profileReducer,
});

export default rootReducer;
