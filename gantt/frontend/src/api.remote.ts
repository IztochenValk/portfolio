import axios, { AxiosError } from "axios";
import apiDefault, * as api from "./api";
import { getToken, isGuest, logout } from "@utils/auth";

export const client = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE + ':' + import.meta.env.VITE_API_PORT),
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (!token || token === "guest") {
    if (config.headers) delete config.headers.Authorization;
    return config;
  }
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (r) => r,
  (err: AxiosError) => {
    const s = err?.response?.status;
    if (s === 401 || s === 403) {
      if (!isGuest()) {
        logout();
        if (window.location.pathname !== "/login") {
          window.location.assign("/login");
        }
      }
    }
    return Promise.reject(err);
  }
);
