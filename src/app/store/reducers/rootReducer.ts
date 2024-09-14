import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice/authSlice";
import docsSliceReducer from "./docsSlice/docsSlice";
import { docsModalSlice } from "@/widgets";

export const rootReducer = combineReducers({
  auth: authSliceReducer,
  docs: docsSliceReducer,
  modal: docsModalSlice,
});
