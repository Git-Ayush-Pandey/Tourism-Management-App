import { get, post, put, del } from "./api";

const BASE = "/destinations";

export const destinationService = {
  getAll: (region = null) => get(BASE, { params: region ? { region } : {} }),

  getById: (id) => get(`${BASE}/${id}`),

  create: (payload) => post(BASE, payload),
  update: (id, payload) => put(`${BASE}/${id}`, payload),
  delete: (id) => del(`${BASE}/${id}`),
};
