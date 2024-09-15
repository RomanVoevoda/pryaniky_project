import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocsSliceTypes } from "./types";
import { DocsData } from "@/shared/api";
import { getDocs, createDoc, deleteDoc, changeDoc } from "@/features";

const initialState: DocsSliceTypes = {
  docs: [],
  isLoading: false,
  error: "",
};

export const docsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
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
      })
      
      .addCase(
        createDoc.fulfilled,
        (state, action: PayloadAction<DocsData>) => {
          state.isLoading = false;
          state.error = "";
          state.docs.push(action.payload);
        },
      )
      .addCase(createDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        deleteDoc.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = "";
          state.docs = state.docs.filter(doc => doc.id !== action.payload);
        },
      )
      .addCase(deleteDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        changeDoc.fulfilled,
        (state, action: PayloadAction<DocsData>) => {
          state.isLoading = false;
          state.error = "";
          state.docs = state.docs.map((document) =>
            document.id === action.payload.id ? action.payload : document
      );
        },
      )
      .addCase(changeDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default docsSlice.reducer;
