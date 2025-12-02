import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "../utils/constants";
import { clearSession } from "../utils/helpers";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      clearSession();

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const get = async (url, config) => (await api.get(url, config)).data;
export const post = async (url, body, config) =>
  (await api.post(url, body, config)).data;
export const put = async (url, body, config) =>
  (await api.put(url, body, config)).data;
export const del = async (url, config) => (await api.delete(url, config)).data;
