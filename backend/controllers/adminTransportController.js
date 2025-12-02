import Transport from "../models/Transport.js";

export const getMyTransports = async (req, res) => {
  try {
    const transports = await Transport.find({ admin: req.user.id });
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTransport = async (req, res) => {
  try {
    req.body.admin = req.user.id;
    const vehicle = await Transport.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransport = async (req, res) => {
  try {
    const updated = await Transport.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Transport not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransport = async (req, res) => {
  try {
    const deleted = await Transport.findOneAndDelete({
      _id: req.params.id,
      admin: req.user.id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Transport not found" });

    res.json({ message: "Transport removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
