import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { packageService } from "../services/packageService";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    region: "All",
    maxDuration: 15,
    maxPrice: 50000,
  });

  useEffect(() => {
    fetchPackages();
  }, [filters.region]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const region = filters.region === "All" ? null : filters.region;
      const data = await packageService.getAll(region);
      setPackages(data);
      setError(null);
    } catch (err) {
      setError("Failed to load packages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    if (pkg.duration_days > filters.maxDuration) return false;
    if (pkg.price > filters.maxPrice) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tour Packages</h1>

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
              <label className="block font-semibold mb-2">
                Max Duration: {filters.maxDuration} days
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={filters.maxDuration}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxDuration: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Max Price: ₹{filters.maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="10000"
                max="50000"
                step="5000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-gray-600 mb-4">
            {filteredPackages.length} packages found
          </p>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No packages found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPackages.map((pkg) => (
                <Link
                  key={pkg.package_id}
                  to={`/packages/${pkg.package_id}`}
                  className="card overflow-hidden hover:scale-[1.02] transition-transform"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/fallback.jpg";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      📍{pkg.destination?.region}

                    </p>
                    <p className="text-gray-600 mb-3">{pkg.description}</p>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm font-semibold text-gray-700">
                        ⏱️ {pkg.duration_days} Days
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <button className="btn-primary">View Details</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;