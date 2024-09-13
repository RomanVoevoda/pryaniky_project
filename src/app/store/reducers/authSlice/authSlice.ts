import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceTypes } from "./types";
import { login } from "@/features";

const initialState: AuthSliceTypes = {
  isAuth: false,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.isAuth = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
