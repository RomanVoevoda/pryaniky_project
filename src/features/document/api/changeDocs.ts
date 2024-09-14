import { DocsData, DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface changeDocsParams {
  id: string;
  document: DocsData;
}

export const changeDocs = createAsyncThunk(
  "getDocs",
  async ({ id, document }: changeDocsParams, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const response = await DocsService.changeDocs(id, document);

      dispatch({ type: "documents/changeDocsInStore", payload: document });
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
