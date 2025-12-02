import Transport from "../models/Transport.js";

export const getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport)
      return res.status(404).json({ message: "Transport not found" });
    res.json(transport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTransport = async (req, res) => {
  try {
    const transport = await Transport.create(req.body);
    res.status(201).json(transport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransport = async (req, res) => {
  try {
    const updated = await Transport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransport = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.json({ message: "Transport deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
