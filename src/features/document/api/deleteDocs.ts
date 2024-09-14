import { DocsService } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteDocs = createAsyncThunk(
  "getDocs",
  async (id: string, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const response = await DocsService.deleteDocs(id);

      dispatch({ type: "documents/deleteDocsFromStore", payload: id });
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
