import { DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteDoc = createAsyncThunk(
  "deleteDoc",
  async (id: string, thunkApi) => {
    try {
      await DocsService.deleteDoc(id);

      return id;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
