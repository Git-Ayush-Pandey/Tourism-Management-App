import Hotel from "../models/Hotel.js";

export const getMyHotels = async (req, res) => {
  const hotels = await Hotel.find({ admin: req.user.id });
  res.json(hotels);
};

export const addHotel = async (req, res) => {
  req.body.admin = req.user.id;
  const hotel = await Hotel.create(req.body);
  res.status(201).json(hotel);
};

export const updateHotel = async (req, res) => {
  const hotel = await Hotel.findOneAndUpdate(
    { _id: req.params.id, admin: req.user.id },
    req.body,
    { new: true }
  );

  if (!hotel) return res.status(404).json({ message: "Hotel not found" });

  res.json(hotel);
};

export const deleteHotel = async (req, res) => {
  const deleted = await Hotel.findOneAndDelete({
    _id: req.params.id,
    admin: req.user.id,
  });

  if (!deleted) return res.status(404).json({ message: "Hotel not found" });

  res.json({ message: "Hotel removed" });
};
