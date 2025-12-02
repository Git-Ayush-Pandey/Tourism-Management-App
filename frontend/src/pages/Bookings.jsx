import React, { useEffect, useState } from "react";
import bookingService from "../services/bookingService";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getUserBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await bookingService.cancel(id);
      loadBookings();
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  const getType = (b) => {
    if (b.hotel) return "Hotel";
    if (b.package) return "Package";
    if (b.transport) return "Transport";
    return "Booking";
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN") : "—");

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-10 w-10 border-b-2 border-primary mx-auto"></div>
      </div>
    );

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          You have no bookings yet.
        </p>
      )}

      <div className="space-y-5">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded-lg p-5 shadow-sm flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {getType(b)} Booking
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    b.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : b.status === "confirmed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {b.status}
                </span>
              </h2>

              <div className="text-gray-600 mt-2 space-y-1">
                {b.hotel && (
                  <p>
                    🏨 <strong>{b.hotel.name}</strong>
                  </p>
                )}
                {b.package && (
                  <p>
                    🎒 <strong>{b.package.title}</strong>
                  </p>
                )}
                {b.transport && (
                  <p>
                    🚗 {b.transport.from} → {b.transport.to}
                  </p>
                )}

                <p>
                  📅 {formatDate(b.check_in)} — {formatDate(b.check_out)}
                </p>

                <p className="text-primary-600 font-bold">
                  💰 ₹{b.total_price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => cancelBooking(b._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
