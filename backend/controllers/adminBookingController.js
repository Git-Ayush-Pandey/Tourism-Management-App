import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Package from "../models/Package.js";
import Transport from "../models/Transport.js";
import TransportService from "../models/TransportService.js";

export const getMyBookings = async (req, res) => {
  try {
    const adminId = req.user.id;

    const myHotels = await Hotel.find({ admin: adminId }).select("_id");
    const myPackages = await Package.find({ admin: adminId }).select("_id");
    const myTransports = await Transport.find({ admin: adminId }).select("_id");
    const myTransportServices = await TransportService.find({
      admin: adminId,
    }).select("_id");

    const bookings = await Booking.find({
      $or: [
        { hotel: { $in: myHotels } },
        { package: { $in: myPackages } },
        { transport: { $in: myTransports } },
        { transport_service: { $in: myTransportServices } },
      ],
    })
      .populate("user")
      .populate("hotel")
      .populate("package")
      .populate("transport")
      .populate("destination")
      .populate("transport_service")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load admin bookings" });
  }
};

export const cancelBookingByAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId)
      .populate("hotel")
      .populate("package")
      .populate("transport")
      .populate("transport_service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const ownsService =
      (booking.hotel && booking.hotel.admin == adminId) ||
      (booking.package && booking.package.admin == adminId) ||
      (booking.transport && booking.transport.admin == adminId) ||
      (booking.transport_service && booking.transport_service.admin == adminId);

    if (!ownsService) {
      return res
        .status(403)
        .json({
          message: "Unauthorized — Booking does not belong to your services.",
        });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully by admin", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};
