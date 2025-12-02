// controllers/adminTransportServiceController.js
import TransportService from "../models/TransportService.js";

export const getMyTransportServices = async (req, res) => {
  try {
    const services = await TransportService.find({ admin: req.user.id })
      .populate("transport_id");

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTransportService = async (req, res) => {
  try {
    req.body.admin = req.user.id;

    const service = await TransportService.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransportService = async (req, res) => {
  try {
    const updated = await TransportService.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Transport service not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransportService = async (req, res) => {
  try {
    const deleted = await TransportService.findOneAndDelete({
      _id: req.params.id,
      admin: req.user.id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Transport service not found" });

    res.json({ message: "Transport service removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
