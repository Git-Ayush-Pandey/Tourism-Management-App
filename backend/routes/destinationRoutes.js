import express from "express";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", authMiddleware, createDestination);
router.put("/:id", authMiddleware, updateDestination);
router.delete("/:id", authMiddleware, deleteDestination);

export default router;
