import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Amenity", amenitySchema);
