import { DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDocs = createAsyncThunk("getDocs", async (_, thunkApi) => {
  try {
    const response = await DocsService.getDocs();

    return response.data.data;
  } catch (e) {
    if (e instanceof Error) {
      return thunkApi.rejectWithValue(e.message);
    }

    return thunkApi.rejectWithValue("Неизвестная ошибка");
  }
});
