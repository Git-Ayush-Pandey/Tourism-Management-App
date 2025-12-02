// src/services/bookingService.js
import { get, post, put, del } from "./api";

const BASE = "/bookings";

export const bookingService = {
  // backend endpoints
  getAll: () => get(BASE),
  getById: (id) => get(`${BASE}/${id}`),
  create: (payload) => post(BASE, payload),
  update: (id, payload) => put(`${BASE}/${id}`, payload),
  delete: (id) => del(`${BASE}/${id}`),

  // helper names used by Bookings.jsx
  getUserBookings: () => get(BASE), // backend returns bookings for auth user
  cancel: (id) => del(`${BASE}/${id}`),
};

export default bookingService;
