import express from "express";
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllAmenities,
  createAmenity,
  assignAmenitiesToHotel,
  setAmenitiesForHotel,
  removeAmenityFromHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.post("/", authMiddleware, createHotel);
router.put("/:id", authMiddleware, updateHotel);
router.delete("/:id", authMiddleware, deleteHotel);

router.get("/amenities", getAllAmenities);
router.post("/amenities", authMiddleware, createAmenity);

router.put("/:id/amenities", authMiddleware, setAmenitiesForHotel); // replace amenities array
router.post("/:id/amenities", authMiddleware, assignAmenitiesToHotel); // add amenities
router.delete(
  "/:id/amenities/:amenityId",
  authMiddleware,
  removeAmenityFromHotel
);

export default router;
