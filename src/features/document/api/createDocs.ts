import { DocsData, DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createDocs = createAsyncThunk(
  "getDocs",
  async (document: DocsData, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const response = await DocsService.createDocs(document);

      dispatch({ type: "documents/createDocsInStore", payload: document });
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
