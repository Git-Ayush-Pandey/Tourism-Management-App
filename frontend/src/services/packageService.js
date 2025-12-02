import { get, post, put, del } from "./api";

const BASE = "/packages";

export const packageService = {
  getAll: (region = null) => get(BASE, { params: region ? { region } : {} }),
  getById: (id) => get(`${BASE}/${id}`),
  create: (payload) => post(BASE, payload),
  update: (id, payload) => put(`${BASE}/${id}`, payload),
  delete: (id) => del(`${BASE}/${id}`),
};

export default packageService;
