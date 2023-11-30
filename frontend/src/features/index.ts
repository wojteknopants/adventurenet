import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commentsReducer from "./posts/commentsSlice";
import { apiSlice } from "./api/apiSlice";
//import profileReducer from "./profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  //profile: profileReducer,
});

export default rootReducer;
