import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
