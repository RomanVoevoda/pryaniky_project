import { AxiosResponse } from "axios";
import client from "../../client";
import { AuthResponseTypes } from "./types";

export default class AuthService {
  static async login(
    login: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponseTypes>> {
    return client.post<AuthResponseTypes>(
      "/ru/data/v3/testmethods/docs/login",
      { login, password },
    );
  }
}
