import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;