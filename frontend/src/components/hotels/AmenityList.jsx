import React from "react";

const AmenityList = ({ amenities = [] }) => {
  if (!amenities.length)
    return <p className="text-gray-500 text-sm">No amenities listed.</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {amenities.map((amenity, idx) => (
        <span
          key={idx}
          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
        >
          {amenity}
        </span>
      ))}
    </div>
  );
};

export default AmenityList;
