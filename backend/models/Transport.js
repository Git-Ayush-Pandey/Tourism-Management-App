import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
  vehicle_type: { type: String, required: true },
  capacity: Number,
  price_per_km: Number,
  availability: { type: Boolean, default: true },
  driver_name: String,
  contact: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

export default mongoose.model("Transport", transportSchema);
