import { get, post } from "./api";

const BASE = "/transport-services";

export const transportRouteService = {
  search: (params) => {
    const query = new URLSearchParams(params).toString();
    return get(`${BASE}?${query}`);
  },

  getAll: () => get(BASE),

  getById: (id) => get(`${BASE}/${id}`),

  create: (payload) => post(BASE, payload), // admin
};