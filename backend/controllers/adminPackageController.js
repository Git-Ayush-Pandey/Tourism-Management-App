// controllers/adminPackageController.js
import Package from "../models/Package.js";

export const getMyPackages = async (req, res) => {
  try {
    const packages = await Package.find({ admin: req.user.id });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addPackage = async (req, res) => {
  try {
    req.body.admin = req.user.id;

    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const updated = await Package.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Package not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findOneAndDelete({
      _id: req.params.id,
      admin: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Package not found" });

    res.json({ message: "Package removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
