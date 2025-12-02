import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hotelService } from "../services/hotelService";
import HotelCard from "../components/hotels/HotelCard";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    region: "All",
    minRating: 0,
    maxPrice: 15000,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await hotelService.getAll();
      setHotels(data);

      setError(null);
    } catch (err) {
      setError("Failed to load hotels");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    // REGION FILTER FIX
    if (
      filters.region !== "All" &&
      hotel.destination?.region !== filters.region
    )
      return false;

    // RATING
    if (hotel.rating < filters.minRating) return false;

    return true;
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            ★
          </span>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Hotels & Accommodations</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Region</label>
              <select
                value={filters.region}
                onChange={(e) =>
                  setFilters({ ...filters, region: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="All">All Regions</option>
                <option value="Jammu">Jammu</option>
                <option value="Kashmir">Kashmir</option>
                <option value="Ladakh">Ladakh</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Minimum Rating</label>
              <select
                value={filters.minRating}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minRating: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="0">All Ratings</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-gray-600 mb-4">
            {filteredHotels.length} hotels found
          </p>

          {filteredHotels.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No hotels found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
