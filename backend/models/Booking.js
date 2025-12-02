import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  transport: { type: mongoose.Schema.Types.ObjectId, ref: "Transport" },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },

  check_in: Date,
  check_out: Date,
  travel_date: Date,   // For transport bookings
  travelers: Number,

  total_price: Number,

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },

  // The admin who OWNS the service (hotel/transport/package)
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Booking", bookingSchema);
