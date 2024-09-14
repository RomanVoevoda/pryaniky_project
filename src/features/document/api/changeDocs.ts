import { DocsData, DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeDocs = createAsyncThunk(
  "changeDocs",
  async (document: DocsData, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const response = await DocsService.changeDocs(document);

      dispatch({ type: "documents/changeDocsInStore", payload: document });
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
