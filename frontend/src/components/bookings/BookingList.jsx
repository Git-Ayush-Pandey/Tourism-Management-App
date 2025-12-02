import React from "react";
import BookingCard from "./BookingCard";
import Loader from "../common/Loader";
import { del } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";

const BookingList = () => {
  const { user } = useAuth();
  const {
    data: bookings,
    loading,
    error,
    refetch,
  } = useFetch(() => (user ? `/bookings/user/${user._id}` : null), [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    await del(`/bookings/${id}`);
    refetch();
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container py-10">
      <h2 className="section-title text-center">My Bookings</h2>

      <div className="grid gap-6 mt-6">
        {bookings?.length ? (
          bookings.map((b) => (
            <BookingCard key={b._id} booking={b} onCancel={handleCancel} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">
            You have no bookings yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingList;
