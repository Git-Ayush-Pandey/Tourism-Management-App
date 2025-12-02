import express from "express";
import {
  getServices,
  getServiceById,
  createService,
} from "../controllers/transportServiceController.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", createService);

export default router;
