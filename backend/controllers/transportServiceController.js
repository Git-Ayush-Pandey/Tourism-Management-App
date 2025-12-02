import TransportService from "../models/TransportService.js";

export const getServices = async (req, res) => {
  try {
    const { from, to, vehicleType } = req.query;

    const filter = {};
    if (from) filter.from = from;
    if (to) filter.to = to;

    const services = await TransportService.find(filter).populate(
      "transport_id"
    );

    let results = services;
    if (vehicleType && vehicleType !== "All") {
      results = services.filter(
        (s) => s.transport_id.vehicle_type === vehicleType
      );
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await TransportService.findById(req.params.id).populate(
      "transport_id"
    );

    if (!service) return res.status(404).json({ message: "Not found" });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await TransportService.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
