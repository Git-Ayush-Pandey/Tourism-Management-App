import Package from "../models/Package.js";

export const getAllPackages = async (req, res) => {
  try {
    const { region } = req.query;

    let query = {};

    // If region filter applied, filter by destination.region later
    const packages = await Package.find(query)
      .populate("destination")  // IMPORTANT for REGION
      .lean();

    // Filter using destination.region
    const filtered = packages.filter(p => {
      if (region && p.destination?.region !== region) return false;

      return true;
    });

    // Format response
    const formatted = filtered.map(p => ({
      package_id: p._id,
      title: p.title,
      description: p.description,
      region: p.destination?.region,  // REGION FROM DESTINATION
      duration_days: p.duration_days,
      price: p.price,
      image: p.image,
      destination: {
        name: p.destination?.name,
        region: p.destination?.region,
        description: p.destination?.description,
      },
      included: p.included,
      excluded: p.excluded,
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).populate("destination");
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
