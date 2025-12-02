import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  duration_days: Number,
  price: Number,
  description: String,
  included: [String],
  excluded: [String],
  image: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Package", packageSchema);
