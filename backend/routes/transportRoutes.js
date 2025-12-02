import express from "express";
import {
  getAllTransports,
  getTransportById,
  createTransport,
  updateTransport,
  deleteTransport,
} from "../controllers/transportController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTransports);
router.get("/:id", getTransportById);
router.post("/", authMiddleware, createTransport);
router.put("/:id", authMiddleware, updateTransport);
router.delete("/:id", authMiddleware, deleteTransport);

export default router;
