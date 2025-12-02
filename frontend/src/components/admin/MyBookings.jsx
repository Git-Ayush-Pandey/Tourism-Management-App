import React, { useEffect, useState } from "react";
import adminService from "../../services/adminServices";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      await adminService.cancelBooking(id);
      alert("Booking cancelled");
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Bookings for my services</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-3 bg-white rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {b.user?.name ?? b.user?.email}
                </div>
                <div className="text-sm text-gray-600">
                  {b.hotel ? (
                    <>Hotel: {b.hotel.name}</>
                  ) : b.package ? (
                    <>Package: {b.package.title}</>
                  ) : b.transport ? (
                    <>
                      Transport: {b.transport.from} → {b.transport.to}
                    </>
                  ) : null}
                </div>
                <div className="text-xs text-gray-500">Status: {b.status}</div>
              </div>
              <div className="flex gap-2">
                {b.status !== "cancelled" && (
                  <button
                    className="btn-danger"
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
