import { get, post, put, del } from "./api";

const BASE = "/hotels";

export const hotelService = {
  getAll: (params = {}) => get(BASE, { params }),
  getById: (id) => get(`${BASE}/${id}`),
  create: (payload) => post(BASE, payload),
  update: (id, payload) => put(`${BASE}/${id}`, payload),
  delete: (id) => del(`${BASE}/${id}`),
};

export default hotelService;
