import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import transportServiceRoutes from "./routes/transportServiceRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

connectDB();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100, 
});
app.use(limiter);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((u) => u.trim())
  : null;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (!allowedOrigins) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy: origin not allowed"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transport-services", transportServiceRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
