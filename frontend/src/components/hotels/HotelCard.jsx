import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

const HotelCard = ({ hotel }) => {
  if (!hotel) return null;

  const imageSrc =
    hotel.image && hotel.image.startsWith("https")
      ? hotel.image
      : "/images/default-hotel.jpg";
  const location = hotel.destination
    ? `${hotel.destination.name}, ${hotel.destination.region}`
    : hotel.address || "Location unavailable";

  const price =
    hotel.pricePerNight ?? hotel.price_per_night ?? hotel.price ?? 0;

  return (
    <Link
      to={`/hotels/${hotel._id}`}
      className="block transform transition-transform hover:scale-[1.02]"
    >
      <Card hoverable className="overflow-hidden">
        <img
          src={imageSrc}
          alt={hotel.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />

        <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>

        <div className="flex items-center gap-1 mb-1">
          {[...Array(Math.floor(hotel.rating || 0))].map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
          {[...Array(5 - Math.floor(hotel.rating || 0))].map((_, i) => (
            <span key={i} className="text-gray-300">
              ★
            </span>
          ))}
          <span className="text-sm text-gray-600 ml-2">
            ({hotel.rating?.toFixed(1) || "N/A"})
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-2">{location}</p>

        <p className="text-2xl font-bold text-primary-600">
          ₹{price}
          <span className="text-sm text-gray-600"> / night</span>
        </p>
      </Card>
    </Link>
  );
};

export default HotelCard;
