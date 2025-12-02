import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }) => {
  if (!pkg) return null;

  return (
    <div className="card overflow-hidden hover:scale-[1.02] transition-transform">
      <Link to={`/packages/${pkg.package_id}`} className="block">
        <img
          src={pkg.image || "/fallback.jpg"}
          alt={pkg.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />

        <h3 className="text-xl font-bold text-gray-800 mb-1">{pkg.title}</h3>

        <p className="text-sm text-gray-600 mb-2">
          {pkg.description?.slice(0, 80)}...
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-700 text-sm">
            ⏱ {pkg.duration_days} days
          </span>
          <span className="text-primary-600 font-semibold">
            ₹{pkg.price}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PackageCard;
