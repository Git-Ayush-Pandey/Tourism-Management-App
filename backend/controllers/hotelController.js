import Destination from "../models/Destination.js";
import Hotel from "../models/Hotel.js";
import Review from "../models/Review.js";

export const getAllHotels = async (req, res) => {
  try {
    const { region, destination, minPrice, maxPrice, rating } = req.query;

    let filter = {};

    // REGION FILTER
    if (region) {
      const destIds = await Destination
        .find({ region })
        .distinct("_id");

      filter.destination = { $in: destIds };
    }

    // DESTINATION NAME SEARCH
    if (destination) {
      const destIds = await Destination.find({
        name: { $regex: destination, $options: "i" }
      }).distinct("_id");

      filter.destination = { $in: destIds };
    }

    // PRICE FILTER
    if (minPrice || maxPrice) {
      filter.price_per_night = {};
      if (minPrice) filter.price_per_night.$gte = Number(minPrice);
      if (maxPrice) filter.price_per_night.$lte = Number(maxPrice);
    }

    // RATING FILTER
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    const hotels = await Hotel.find(filter).populate("destination amenities");

    res.json(hotels);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate("destination amenities");

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Fetch reviews separately (safe way)
    const reviews = await Review.find({ hotel: req.params.id })
      .populate("user", "name email");

    // merge hotel + reviews
    const response = {
      ...hotel.toObject(),
      reviews: reviews || [],
    };

    res.json(response);

  } catch (err) {
    console.error("❌ ERROR IN getHotelById:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


import Amenity from "../models/Amenity.js";

export const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAmenity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existing = await Amenity.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Amenity already exists' });
    const amenity = new Amenity({ name, description });
    await amenity.save();
    res.status(201).json(amenity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignAmenitiesToHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { amenityIds } = req.body; // expect array of amenity _id strings
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    // ensure amenities exist
    const amenities = await Amenity.find({ _id: { $in: amenityIds } });
    hotel.amenities = Array.from(new Set([...(hotel.amenities||[]), ...amenities.map(a=>a._id.toString())]));
    await hotel.save();
    const populated = await Hotel.findById(hotelId).populate('destination amenities');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const setAmenitiesForHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { amenityIds } = req.body; // replace amenities
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    // validate amenity ids
    const amenities = await Amenity.find({ _id: { $in: amenityIds } });
    hotel.amenities = amenities.map(a => a._id);
    await hotel.save();
    const populated = await Hotel.findById(hotelId).populate('destination amenities');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeAmenityFromHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const amenityId = req.params.amenityId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    hotel.amenities = (hotel.amenities || []).filter(a => a.toString() !== amenityId.toString());
    await hotel.save();
    const populated = await Hotel.findById(hotelId).populate('destination amenities');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
