import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocsSliceTypes } from "./types";
import { DocsData } from "@/shared/api";
import { getDocs, createDocs } from "@/features";

const initialState: DocsSliceTypes = {
  docs: [],
  isLoading: false,
  error: "",
};

export const docsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    deleteDocsFromStore(state, action: PayloadAction<string>) {
      state.docs = state.docs.filter(
        (document) => document.id !== action.payload,
      );
    },
    addDocsInStore(state, action: PayloadAction<DocsData[]>) {
      state.docs = action.payload;
    },
    changeDocsInStore(state, action: PayloadAction<DocsData>) {
      state.docs = state.docs.map((document) =>
        document.id === action.payload.id ? action.payload : document,
      );
    },
    createDocsInStore(state, action: PayloadAction<DocsData>) {
      state.docs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getDocs.fulfilled,
        (state, action: PayloadAction<DocsData[]>) => {
          state.isLoading = false;
          state.error = "";
          state.docs = action.payload;
        },
      )
      .addCase(getDocs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default docsSlice.reducer;
