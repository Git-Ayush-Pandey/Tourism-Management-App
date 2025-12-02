import { post } from "./api";
import { setSession, clearSession, getFromStorage } from "../utils/helpers";
import { STORAGE_KEYS } from "../utils/constants";

const AUTH_BASE = "/auth";

export const authService = {
  async signup(payload) {
    const data = await post(`${AUTH_BASE}/signup`, payload);
    if (data?.token) setSession(data.token, data.user);
    return data;
  },

  async login(email, password) {
    const data = await post(`${AUTH_BASE}/login`, { email, password });
    if (data?.token) setSession(data.token, data.user);
    return data;
  },

  logout() {
    clearSession();
  },

  getCurrentUser() {
    return getFromStorage(STORAGE_KEYS.USER, null);
  },
};
