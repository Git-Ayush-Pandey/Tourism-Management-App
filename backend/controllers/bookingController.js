// controllers/bookingController.js
import Booking from "../models/Booking.js"; // adjust path if needed
import Hotel from "../models/Hotel.js";
import PackageModel from "../models/Package.js";
import TransportService from "../models/TransportService.js";
// get all bookings for the logged-in user
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("user")
      .populate("hotel")
      .populate("package")
      .populate("transport")
      .populate("destination")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id })
      .populate("user")
      .populate("hotel")
      .populate("package")
      .populate("transport")
      .populate("destination");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      user: req.user.id,
      status: req.body.status || "pending",
    };

    let adminId = null;

    // If booking a hotel
    if (payload.hotel) {
      const hotel = await Hotel.findById(payload.hotel);
      if (hotel) adminId = hotel.admin;
    }

    // If booking a package
    if (payload.package) {
      const pkg = await PackageModel.findById(payload.package);
      if (pkg) adminId = pkg.admin;
    }

    // If booking a transport service
    if (payload.transport) {
      const ts = await TransportService.findById(payload.transport);
      if (ts) adminId = ts.admin;
    }

    // Assign admin to the booking
    payload.admin = adminId || null;

    const booking = await Booking.create(payload);

    const populated = await Booking.findById(booking._id)
      .populate("user")
      .populate("hotel")
      .populate("package")
      .populate("transport")
      .populate("destination")
      .populate("admin");

    res.status(201).json(populated);
  } catch (err) {
    console.error("createBooking error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
