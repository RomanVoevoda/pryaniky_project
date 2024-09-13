import axios from "axios";
import { BASE_URL } from "./baseUrl";

const client = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers['x-auth'] = token;
  }
  return config;
});

export default client;
