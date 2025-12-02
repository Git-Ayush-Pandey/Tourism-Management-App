import { get, post, put, del } from "./api";

const BASE = "/transports";

export const transportService = {
  getAll: () => get(BASE),
  getById: (id) => get(`${BASE}/${id}`),
  create: (payload) => post(BASE, payload),
  update: (id, payload) => put(`${BASE}/${id}`, payload),
  delete: (id) => del(`${BASE}/${id}`),
};

export default transportService;
