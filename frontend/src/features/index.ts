import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";
//import profileReducer from "./profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  //profile: profileReducer,
});

export default rootReducer;
