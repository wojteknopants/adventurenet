import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commentsReducer from "./posts/commentsSlice";
import exploreReducer from "./explore/exploreSlice";
import { apiSlice } from "./api/apiSlice";
//import profileReducer from "./profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  explore: exploreReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  //profile: profileReducer,
});

export default rootReducer;
