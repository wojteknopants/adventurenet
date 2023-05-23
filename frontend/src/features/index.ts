import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
