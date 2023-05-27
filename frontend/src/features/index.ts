import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import profileReducer from "./profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
