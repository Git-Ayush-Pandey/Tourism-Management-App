import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

import Transport from "../models/Transport.js";
import Destination from "../models/Destination.js";
import TransportService from "../models/TransportService.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomTime = () => {
  const hour = randInt(5, 20);
  const min = rand([0, 15, 30, 45]);
  return { hour, min };
};

const createService = (vehicle, from, to) => {
  const distance = randInt(20, 450);

  const { hour, min } = randomTime();
  const departure_time = new Date();
  departure_time.setHours(hour, min, 0);

  const travelHours = randInt(1, 12);
  const arrival_time = new Date(
    departure_time.getTime() + travelHours * 3600 * 1000
  );

  const total_price = Math.round(vehicle.price_per_km * distance);

  return {
    transport_id: vehicle._id,
    from,
    to,
    departure_time,
    arrival_time,
    distance_km: distance,
    duration: `${travelHours} hours`,
    available_seats: randInt(1, vehicle.capacity || 20),
    price_per_km: vehicle.price_per_km,
    total_price,
  };
};

const seedTransportServices = async () => {
  try {
    console.log("MONGO URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const vehicles = await Transport.find();
    if (!vehicles.length) {
      console.error("❌ No transport vehicles found! Seed vehicles first.");
      process.exit(0);
    }
    console.log(`Loaded ${vehicles.length} vehicles.`);

    const destinations = await Destination.find({}, "name");
    if (!destinations.length) {
      console.error("❌ No destinations found! Seed destinations first.");
      process.exit(0);
    }

    const DEST_LIST = destinations.map((d) => d.name);

    console.log(`Loaded ${DEST_LIST.length} destinations.`);

    await TransportService.deleteMany();
    console.log("Old Transport Services cleared.");

    let services = [];

    console.log("Generating guaranteed FROM → TO routes...");

    for (let from of DEST_LIST) {
      for (let to of DEST_LIST) {
        if (from === to) continue;

        const vehicle = rand(vehicles);

        services.push(createService(vehicle, from, to));
      }
    }

    console.log(`Created ${services.length} mandatory routes.`);

    const EXTRA = 500;
    console.log(`Generating ${EXTRA} extra random routes...`);

    for (let i = 0; i < EXTRA; i++) {
      const vehicle = rand(vehicles);

      let from = rand(DEST_LIST);
      let to = rand(DEST_LIST);

      while (from === to) to = rand(DEST_LIST);

      services.push(createService(vehicle, from, to));
    }

    console.log(`Total routes to insert: ${services.length}`);

    await TransportService.insertMany(services);

    console.log(`🎉 SUCCESS: Inserted ${services.length} transport services.`);

    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
};

seedTransportServices();
