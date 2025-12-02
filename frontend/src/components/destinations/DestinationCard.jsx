import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

const DestinationCard = ({ destination }) => {
  if (!destination) return null;

  return (
    <Link
      to={`/destinations/${destination._id}`}
      className="block transform transition-transform hover:scale-[1.03]"
    >
      <Card hoverable className="overflow-hidden">
        <img
          src={destination.image || "/images/default-destination.jpg"}
          alt={destination.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{destination.region}</p>
        <p className="text-gray-600 text-sm line-clamp-3">
          {destination.description || "No description available."}
        </p>
      </Card>
    </Link>
  );
};

export default DestinationCard;
