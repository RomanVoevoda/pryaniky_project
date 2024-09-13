import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice/authSlice";

export const rootReducer = combineReducers({
  auth: authSliceReducer,
});
