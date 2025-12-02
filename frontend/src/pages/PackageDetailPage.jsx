import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { get } from "../services/api";
import { bookingService } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch from backend
  const { data: pkg, loading, error } = useFetch(
    () => get(`/packages/${id}`),
    [id]
  );

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-12 w-12 mx-auto border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Loading package details...</p>
      </div>
    );

  if (error || !pkg)
    return (
      <div className="text-center py-20 text-gray-600">
        Failed to load package.
      </div>
    );

  // 🟩 CALCULATE PRICE
  const totalAmount = pkg.price * travelers;

  // 🟦 REAL BACKEND BOOKING FUNCTION
  const handleBooking = async () => {
    console.log("HANDLE PACKAGE BOOKING");

    if (!isAuthenticated()) {
      return navigate("/login");
    }

    if (!travelDate) {
      alert("Please select a travel date.");
      return;
    }

    const payload = {
      package: pkg._id,
      travel_date: travelDate,
      travelers,
      total_price: totalAmount,
    };

    try {
      setBookingLoading(true);
      console.log("Sending booking payload:", payload);

      const res = await bookingService.create(payload);
      console.log("Package booking response:", res);

      alert("Package booked successfully!");
      navigate("/bookings");
    } catch (err) {
      console.error("Package booking failed:", err);
      alert("Failed to book package.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-primary-600">Home</Link> /
        <Link to="/packages" className="hover:text-primary-600"> Packages</Link> /
        <span className="text-gray-900"> {pkg.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card p-6">
            <img
              src={pkg.image || "/fallback.jpg"}
              alt={pkg.title}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-2">{pkg.title}</h1>

            <div className="flex items-center gap-6 text-gray-600 mb-4">
              <span>📍 {pkg.region || "Unknown"}</span>
              <span>⏱️ {pkg.duration_days} Days</span>
            </div>

            <p className="text-gray-700 text-lg">{pkg.description}</p>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 text-green-600">✓ Inclusions</h2>
              <ul className="space-y-2">
                {pkg.included?.length ? (
                  pkg.included.map((item, idx) => (
                    <li key={idx} className="text-gray-700">• {item}</li>
                  ))
                ) : (
                  <p className="text-gray-500">No inclusions provided.</p>
                )}
              </ul>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 text-red-600">✗ Exclusions</h2>
              <ul className="space-y-2">
                {pkg.excluded?.length ? (
                  pkg.excluded.map((item, idx) => (
                    <li key={idx} className="text-gray-700">• {item}</li>
                  ))
                ) : (
                  <p className="text-gray-500">No exclusions provided.</p>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div className="card p-6 sticky top-20">
            <div className="text-center mb-6">
              <p className="text-gray-600">Starting from</p>
              <p className="text-4xl font-bold text-primary-600">₹{pkg.price?.toLocaleString()}</p>
              <p className="text-sm text-gray-600">per person</p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Travelers */}
              <div>
                <label className="block font-semibold mb-2">Number of Travelers</label>
                <input
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Travel Date */}
              <div>
                <label className="block font-semibold mb-2">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base Price</span>
                <span className="font-semibold">₹{pkg.price?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Travelers</span>
                <span className="font-semibold">× {travelers}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-primary-600">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* BOOK NOW */}
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="btn-primary w-full text-lg"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By booking, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
