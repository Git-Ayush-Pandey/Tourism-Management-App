import Destination from "../models/Destination.js";

export const getAllDestinations = async (req, res) => {
  try {
    const region = req.query.region;
    const filter = region ? { region } : {};
    const destinations = await Destination.find(filter);
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
