// src/services/adminService.js
import { get, post, put, del } from "./api";

const base = "/admin";

const adminService = {
  // HOTELS
  getHotels: () => get(`${base}/hotels`),
  createHotel: (d) => post(`${base}/hotels`, d),
  updateHotel: (id, d) => put(`${base}/hotels/${id}`, d),
  deleteHotel: (id) => del(`${base}/hotels/${id}`),

  // PACKAGES
  getPackages: () => get(`${base}/packages`),
  createPackage: (d) => post(`${base}/packages`, d),
  updatePackage: (id, d) => put(`${base}/packages/${id}`, d),
  deletePackage: (id) => del(`${base}/packages/${id}`),

  // VEHICLES
  getTransports: () => get(`${base}/transports`),
  createTransport: (d) => post(`${base}/transports`, d),
  updateTransport: (id, d) => put(`${base}/transports/${id}`, d),
  deleteTransport: (id) => del(`${base}/transports/${id}`),

  // ROUTES / SERVICES
  getTransportServices: () => get(`${base}/transport-services`),
  createTransportService: (d) => post(`${base}/transport-services`, d),
  updateTransportService: (id, d) => put(`${base}/transport-services/${id}`, d),
  deleteTransportService: (id) => del(`${base}/transport-services/${id}`),

  // BOOKINGS OF MY SERVICES
  getBookings: () => get(`${base}/bookings`),
  cancelBooking: (id) => put(`${base}/bookings/${id}`, { status: "cancelled" }),
};

export default adminService;
