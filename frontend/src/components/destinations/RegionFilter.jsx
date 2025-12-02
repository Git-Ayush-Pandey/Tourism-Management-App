import React from "react";

const regions = ["All", "Jammu", "Kashmir", "Ladakh"];

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  return (
    <div className="flex gap-4 mb-8 flex-wrap justify-center">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onRegionChange(region)}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            selectedRegion === region
              ? "bg-primary-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default RegionFilter;
