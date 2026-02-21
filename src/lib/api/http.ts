import axios from "axios";
import { logResponse, logError } from "./interceptors";
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

if (import.meta.env.DEV) {
  http.interceptors.response.use(logResponse, logError);
}

const token = storage.get(storageKeys.AUTH_TOKEN);
if (token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function setAuthToken(token: string | null) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}
