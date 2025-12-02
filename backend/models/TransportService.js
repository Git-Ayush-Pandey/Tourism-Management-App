import mongoose from "mongoose";

const transportServiceSchema = new mongoose.Schema({
  transport_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transport",   // Foreign key
    required: true,
  },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
,

  from: { type: String, required: true },
  to: { type: String, required: true },

  departure_time: { type: Date, required: true },
  arrival_time: { type: Date, required: true },

  distance_km: { type: Number, required: true },
  duration: { type: String, required: true },

  available_seats: { type: Number, required: true },

  price_per_km: { type: Number, required: true },
  total_price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("TransportService", transportServiceSchema);
