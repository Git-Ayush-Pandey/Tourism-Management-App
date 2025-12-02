import React from "react";
import Card from "../common/Card";

const BookingCard = ({ booking }) => {
  if (!booking) return null;

  return (
    <Card className="p-4">
      <h3 className="font-bold text-lg mb-2">
        {booking.package?.name || booking.hotel?.name || "Booking"}
      </h3>

      <p>
        Check-in:{" "}
        {booking.check_in
          ? new Date(booking.check_in).toLocaleDateString()
          : "—"}
      </p>
      <p>
        Check-out:{" "}
        {booking.check_out
          ? new Date(booking.check_out).toLocaleDateString()
          : "—"}
      </p>

      <p className="font-bold text-primary-600 mt-2">₹{booking.total_price}</p>
    </Card>
  );
};

export default BookingCard;
