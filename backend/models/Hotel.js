import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
  address: String,
  price_per_night: Number,
  available_rooms: Number,
  rating: { type: Number, default: 0 },
  image: String,
  amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],

  // ➕ Add this:
  description: { type: String, default: "" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

export default mongoose.model("Hotel", hotelSchema);
