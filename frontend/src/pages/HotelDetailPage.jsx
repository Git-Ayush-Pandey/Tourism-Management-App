// src/pages/HotelDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { hotelService } from "../services/hotelService";
import { bookingService } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

const HotelDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [bookingLoading, setBookingLoading] = useState(false);

  // ---------------------------
  // FETCH HOTEL DETAILS
  // ---------------------------
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getById(id);
        setHotel(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load hotel");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <div className="container mx-auto py-10 text-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-600">{error}</p>
        <button className="btn-primary mt-4" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );

  if (!hotel)
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Hotel not found.</p>
      </div>
    );

  // ---------------------------
  // DERIVED FIELDS
  // ---------------------------
  const imageSrc =
    hotel.image?.startsWith("http")
      ? hotel.image
      : "/images/default-hotel.jpg";

  const location =
    hotel.destination?.name && hotel.destination?.region
      ? `${hotel.destination.name}, ${hotel.destination.region}`
      : hotel.address ?? "Location unavailable";

  // Basic rooms list (can expand later)
  const rooms = [
    {
      id: "default",
      type: "Standard Room",
      capacity: 2,
      pricePerNight: hotel.price_per_night,
      available: hotel.available_rooms,
    },
  ];

  // ---------------------------
  // CALCULATE TOTAL PRICE
  // ---------------------------
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return selectedRoom?.pricePerNight || 0;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const nights =
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) || 1;

    return nights * (selectedRoom?.pricePerNight || 0);
  };

  // ---------------------------
  // HANDLE BOOKING
  // ---------------------------
  const handleBooking = async () => {

    if (!isAuthenticated()) {
      return navigate("/login");
    }

    if (!selectedRoom) return alert("Select a room first.");
    if (!checkIn || !checkOut)
      return alert("Please select check-in and check-out dates.");

    const payload = {
      hotel: hotel._id,
      room_type: selectedRoom.type,
      check_in: checkIn,
      check_out: checkOut,
      total_price: calculateTotalPrice(),
    };

    try {
      setBookingLoading(true);

      console.log("Booking payload:", payload);

      const res = await bookingService.create(payload);

      console.log("Booking response:", res);

      alert("Hotel booked successfully!");
      navigate("/bookings");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book hotel. Check console for details.");
    } finally {
      setBookingLoading(false);
    }
  };

  // ---------------------------
  // UI RENDER
  // ---------------------------
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to="/">Home</Link> / <Link to="/hotels">Hotels</Link> /{" "}
        {hotel.name}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT: DETAILS */}
        <div className="lg:col-span-2">
          <img
            src={imageSrc}
            alt={hotel.name}
            className="w-full h-72 object-cover rounded-lg mb-6"
          />

          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <p className="text-gray-600 mb-3">📍 {location}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: Math.floor(hotel.rating || 0) }).map(
              (_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              )
            )}
            <span className="text-gray-600">
              ({(hotel.rating || 0).toFixed(1)})
            </span>
          </div>

          <p className="text-gray-700 mb-6">
            {hotel.description || "No description available."}
          </p>

          {/* Amenities */}
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {hotel.amenities?.length ? (
              hotel.amenities.map((a) => (
                <span
                  key={a._id}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {a.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No amenities listed</span>
            )}
          </div>
        </div>

        {/* RIGHT: BOOKING SIDEBAR */}
        <aside className="card p-4 border rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-primary-600 mb-4">
            ₹{hotel.price_per_night}{" "}
            <span className="text-sm text-gray-600">/ night</span>
          </div>

          {/* Check-in */}
          <label className="block font-semibold mb-1">Check-in</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded mb-4"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

          {/* Check-out */}
          <label className="block font-semibold mb-1">Check-out</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded mb-4"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
          />

          {/* Select Room */}
          <label className="block font-semibold mb-1">Select Room</label>
          <select
            className="w-full px-3 py-2 border rounded mb-4"
            onChange={(e) => setSelectedRoom(rooms[e.target.value])}
          >
            <option>Select Room</option>
            {rooms.map((r, i) => (
              <option key={i} value={i}>
                {r.type} — ₹{r.pricePerNight}/night
              </option>
            ))}
          </select>

          {/* Book Now */}
          <button
            className="btn-primary w-full"
            onClick={handleBooking}
            disabled={bookingLoading}
          >
            {bookingLoading ? "Booking..." : "Book Now"}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetailPage;
