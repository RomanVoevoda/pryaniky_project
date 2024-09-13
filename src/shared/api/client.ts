import axios from "axios";
import { BASE_URL } from "./baseUrl";

const client = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

client.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default client;
