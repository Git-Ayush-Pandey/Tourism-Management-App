import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);