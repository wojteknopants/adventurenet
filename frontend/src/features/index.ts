import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commentsReducer from "./posts/commentsSlice";
import exploreReducer from "./explore/exploreSlice";
import { apiSlice } from "./api/apiSlice";
import tagsReducer from "./posts/tagsSlice";
//import profileReducer from "./profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  explore: exploreReducer,
  tags: tagsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  //profile: profileReducer,
});

export default rootReducer;
