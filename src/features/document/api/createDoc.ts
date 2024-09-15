import { DocsData, DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createDoc = createAsyncThunk(
  "createDoc",
  async (document: DocsData, thunkApi) => {
    try {
      const response = await DocsService.createDoc(document);
      console.log(response.data.data)
      return response.data.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
