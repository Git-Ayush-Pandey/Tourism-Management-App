import express from "express";
import { signup, login } from "../controllers/authController.js";
import { becomeAdmin } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/become-admin", authMiddleware, becomeAdmin);
export default router;
