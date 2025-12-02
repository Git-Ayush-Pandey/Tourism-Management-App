import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { destinationService } from "../services/destinationService";

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, [selectedRegion]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const region = selectedRegion === "All" ? null : selectedRegion;
      const data = await destinationService.getAll(region);
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError("Failed to load destinations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fallbackImage = "https://via.placeholder.com/600x400?text=No+Image";

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button onClick={fetchDestinations} className="btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Explore Destinations</h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        {["All", "Jammu", "Kashmir", "Ladakh"].map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedRegion === region
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {destinations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl">No destinations found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest._id || dest.dest_id}
              to={`/destinations/${dest._id || dest.dest_id}`}
              className="card overflow-hidden rounded-xl shadow hover:scale-[1.02] transition-transform bg-white"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={dest.image || fallbackImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{dest.region}</p>
                <p className="text-gray-600 mb-2">{dest.description}</p>

                {dest.best_season && (
                  <p className="text-sm text-primary-600 font-semibold">
                    Best Season: {dest.best_season}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
