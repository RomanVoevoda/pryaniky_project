import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice/authSlice";
import doxsSliceReducer from "./docsSlice/docsSlice";

export const rootReducer = combineReducers({
  auth: authSliceReducer,
  docs: doxsSliceReducer,
});
