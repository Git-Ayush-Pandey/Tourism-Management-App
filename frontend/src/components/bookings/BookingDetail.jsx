import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { get } from "../../services/api";
import Loader from "../common/Loader";

const BookingDetail = () => {
  const { id } = useParams();
  const { data: booking, loading, error } = useFetch(() => get(`/bookings/${id}`), [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Booking Details</h1>

      <div className="card p-6">
        <p><strong>ID:</strong> {booking._id}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Total Price:</strong> ₹{booking.total_price}</p>
        <p><strong>Check In:</strong> {booking.check_in ? new Date(booking.check_in).toLocaleDateString() : "—"}</p>
        <p><strong>Check Out:</strong> {booking.check_out ? new Date(booking.check_out).toLocaleDateString() : "—"}</p>
      </div>

      <Link to="/bookings" className="btn-primary mt-4 inline-block">
        Back to Bookings
      </Link>
    </div>
  );
};

export default BookingDetail;
