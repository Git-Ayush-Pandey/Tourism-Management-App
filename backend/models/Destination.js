import mongoose from "mongoose";
const destinationSchema = new mongoose.Schema({
  name: String,
  region: String,
  description: String,
  latitude: Number,
  longitude: Number,
  best_season: String,
  image: String,
});
export default mongoose.model("Destination", destinationSchema);