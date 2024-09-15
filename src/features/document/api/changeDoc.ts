import { DocsData, DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeDoc = createAsyncThunk(
  "changeDoc",
  async (document: DocsData, thunkApi) => {
    try {
      const response = await DocsService.changeDoc(document);

      return response.data.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
