import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

import {
  getMyHotels,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/adminHotelCOntroller.js";

import {
  getMyTransports,
  addTransport,
  updateTransport,
  deleteTransport,
} from "../controllers/adminTransportController.js";

import {
  getMyTransportServices,
  addTransportService,
  updateTransportService,
  deleteTransportService,
} from "../controllers/adminTransportServiceController.js";

import {
  getMyPackages,
  addPackage,
  updatePackage,
  deletePackage,
} from "../controllers/adminPackageController.js";

import {
  getMyBookings,
  cancelBookingByAdmin,
} from "../controllers/adminBookingController.js";

const router = express.Router();

router.get("/hotels", authMiddleware, adminOnly, getMyHotels);
router.post("/hotels", authMiddleware, adminOnly, addHotel);
router.put("/hotels/:id", authMiddleware, adminOnly, updateHotel);
router.delete("/hotels/:id", authMiddleware, adminOnly, deleteHotel);

router.get("/transports", authMiddleware, adminOnly, getMyTransports);
router.post("/transports", authMiddleware, adminOnly, addTransport);
router.put("/transports/:id", authMiddleware, adminOnly, updateTransport);
router.delete("/transports/:id", authMiddleware, adminOnly, deleteTransport);

router.get(
  "/transport-services",
  authMiddleware,
  adminOnly,
  getMyTransportServices
);
router.post(
  "/transport-services",
  authMiddleware,
  adminOnly,
  addTransportService
);
router.put(
  "/transport-services/:id",
  authMiddleware,
  adminOnly,
  updateTransportService
);
router.delete(
  "/transport-services/:id",
  authMiddleware,
  adminOnly,
  deleteTransportService
);

router.get("/packages", authMiddleware, adminOnly, getMyPackages);
router.post("/packages", authMiddleware, adminOnly, addPackage);
router.put("/packages/:id", authMiddleware, adminOnly, updatePackage);
router.delete("/packages/:id", authMiddleware, adminOnly, deletePackage);

router.get("/bookings", authMiddleware, adminOnly, getMyBookings);
router.put(
  "/bookings/:id/cancel",
  authMiddleware,
  adminOnly,
  cancelBookingByAdmin
);

export default router;
