import React from "react";
import Button from "../common/Button";

const RoomCard = ({ room, onBook }) => {
  if (!room) return null;

  return (
    <div className="card">
      <h4 className="font-bold text-lg mb-2">{room.type}</h4>
      <p className="text-gray-600 mb-2">👥 Capacity: {room.capacity}</p>
      <p className="text-2xl font-bold text-primary-600 mb-3">
        ₹{room.pricePerNight}
        <span className="text-sm text-gray-600"> / night</span>
      </p>
      <Button variant="primary" className="w-full" onClick={() => onBook(room)}>
        Book Room
      </Button>
    </div>
  );
};

export default RoomCard;
