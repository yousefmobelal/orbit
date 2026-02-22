import axios from "axios";
import { logResponse, logError, unwrapData, handleError } from "./interceptors";
import { storage } from "../utils/storage";
import { storageKeys } from "../utils/storageKeys";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("VITE_API_URL is not defined");
}

export const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = storage.get(storageKeys.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

if (import.meta.env.DEV) {
  http.interceptors.response.use(logResponse, logError);
}

http.interceptors.response.use(unwrapData);
http.interceptors.response.use(undefined, handleError);

export function setAuthToken(token: string | null) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}
