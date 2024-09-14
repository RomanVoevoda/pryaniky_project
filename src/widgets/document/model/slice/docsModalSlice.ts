import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { docsModalSliceTypes } from "./types";
import { initialDocumentState } from "../../consts/initialDocumentState";

const initialState: docsModalSliceTypes = {
  open: false,
  formType: "create",
  currentDocument: initialDocumentState,
};

const docsModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Omit<docsModalSliceTypes, "open">>,
    ) => {
      state.open = true;
      state.formType = action.payload.formType;
      state.currentDocument =
        action.payload.currentDocument || initialDocumentState;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = docsModalSlice.actions;

export default docsModalSlice.reducer;
