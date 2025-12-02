import { get, post, put, del } from "./api";

const BASE = "/reviews";

export const reviewService = {
  getAll: (params = {}) => get(BASE, { params }),
  create: (payload) => post(BASE, payload),
  update: (id, payload) => put(`${BASE}/${id}`, payload),
  delete: (id) => del(`${BASE}/${id}`),
};

export default reviewService;
