import React, { useState, useEffect } from "react";
import { transportRouteService } from "../services/transportRouteService";
import { bookingService } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { get } from "../services/api"; // small helper to call /api/* via your api wrapper

const Transport = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [destinations, setDestinations] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [metaLoading, setMetaLoading] = useState(true); // loading for destinations + vehicle types
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    vehicleType: "All",
  });

  // load destinations and vehicle types once
  useEffect(() => {
    const loadMeta = async () => {
      setMetaLoading(true);
      try {
        // Try to load via your api wrapper (this respects baseURL and token if needed)
        // Destinations endpoint (adjust if your backend path differs)
        const dests = await get("/destinations"); // expects array of { _id, name, ... }
        if (Array.isArray(dests) && dests.length) {
          setDestinations(dests.map((d) => d.name));
        } else {
          console.warn("No destinations returned from /destinations", dests);
          setDestinations([]);
        }

        // Load transports to get unique vehicle type names
        const transports = await get("/transports"); // expects array of transport docs
        if (Array.isArray(transports) && transports.length) {
          const types = Array.from(
            new Set(transports.map((t) => (t.vehicle_type || t.vehicleType || "").trim()).filter(Boolean))
          );
          setVehicleTypes(types);
        } else {
          console.warn("No transports returned from /transports", transports);
          setVehicleTypes([]);
        }
      } catch (err) {
        console.error("Failed to load meta data (destinations/vehicle types)", err);
        // fallback to minimal defaults so UI still works
        setDestinations([]);
        setVehicleTypes(["Bus", "Taxi", "Jeep"]);
      } finally {
        setMetaLoading(false);
      }
    };

    loadMeta();
  }, []);

  // SEARCH transport services
  const handleSearch = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const data = await transportRouteService.search(searchParams);
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transport options");
    }

    setLoading(false);
  };

  // BOOK TRANSPORT
  const handleBook = async (s) => {
    if (!isAuthenticated()) return navigate("/login");

    const payload = {
      transport_service: s._id,
      travel_date: searchParams.date,
      travelers: 1,
      total_price: s.total_price ?? s.totalPrice ?? s.total_price,
    };

    try {
      await bookingService.create(payload);
      alert("Transport booked successfully!");
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  // UI helpers
  const minDate = new Date().toISOString().split("T")[0];

  if (metaLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Transport Booking</h1>

      {/* SEARCH BOX */}
      <div className="card p-6 mb-8">
        <div className="grid md:grid-cols-5 gap-4">
          {/* FROM */}
          <div>
            <label className="block font-semibold mb-1">From</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={searchParams.from}
              onChange={(e) =>
                setSearchParams({ ...searchParams, from: e.target.value })
              }
            >
              <option value="">Select</option>
              {destinations.length === 0 ? (
                <option value="">No destinations</option>
              ) : (
                destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* TO */}
          <div>
            <label className="block font-semibold mb-1">To</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={searchParams.to}
              onChange={(e) =>
                setSearchParams({ ...searchParams, to: e.target.value })
              }
            >
              <option value="">Select</option>
              {destinations.length === 0 ? (
                <option value="">No destinations</option>
              ) : (
                destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={searchParams.date}
              min={minDate}
              onChange={(e) =>
                setSearchParams({ ...searchParams, date: e.target.value })
              }
            />
          </div>

          {/* VEHICLE TYPE (dynamic) */}
          <div>
            <label className="block font-semibold mb-1">Vehicle</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={searchParams.vehicleType}
              onChange={(e) =>
                setSearchParams({ ...searchParams, vehicleType: e.target.value })
              }
            >
              <option value="All">All</option>
              {vehicleTypes.length === 0 ? (
                <>
                  <option value="Bus">Bus</option>
                  <option value="Taxi">Taxi</option>
                  <option value="Jeep">Jeep</option>
                </>
              ) : (
                vehicleTypes.map((vt) => (
                  <option key={vt} value={vt}>
                    {vt}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex items-end">
            <button className="btn-primary w-full" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {loading ? (
        <Loader />
      ) : results.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No results. Try searching above.</p>
      ) : (
        <div className="space-y-4">
          {results.map((s) => (
            <div key={s._id} className="card p-5 flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{s.transport_id?.vehicle_type ?? s.transport?.vehicle_type}</h2>
                <p>{s.from} → {s.to}</p>
                <p className="text-sm text-gray-600">
                  Departure: {new Date(s.departure_time ?? s.departureTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Seats: {s.available_seats}</p>
                <p className="text-sm text-gray-600">Driver: {s.transport_id?.driver_name}</p>
              </div>

              <div className="text-right">
                <p className="text-2xl text-primary-600 font-bold">
                  ₹{s.total_price ?? s.totalPrice}
                </p>
                <button className="btn-primary mt-3" onClick={() => handleBook(s)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transport;
