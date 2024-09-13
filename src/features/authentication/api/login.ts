import AuthService from "@/shared/api/service/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginParams {
  login: string;
  password: string;
}

export const login = createAsyncThunk(
  "login",
  async ({ login, password }: LoginParams, thunkApi) => {
    try {
      const response = await AuthService.login(login, password);

      localStorage.setItem("token", response.data.data.token + login);

      return true;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }

      return thunkApi.rejectWithValue("Неизвестная ошибка");
    }
  },
);
