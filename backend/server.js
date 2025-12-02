// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

// Import routes
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

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // replaces body-parser.json()
app.use(express.urlencoded({ extended: true })); // replaces body-parser.urlencoded()

// ✅ Routes
app.use("/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/transport-services", transportServiceRoutes);
// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running 🚀" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
