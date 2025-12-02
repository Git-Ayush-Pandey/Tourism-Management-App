import React from "react";
import Button from "../common/Button";
import Card from "../common/Card";

const TransportCard = ({ transport, onBook }) => {
  if (!transport) return null;

  return (
    <Card hoverable className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            {transport.vehicleType}
          </h3>
          <p className="text-gray-600 text-sm">
            {transport.from} → {transport.to}
          </p>
          <p className="text-sm text-gray-500">
            Seats Available: {transport.availableSeats || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            Departure: {new Date(transport.departureTime).toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            ₹{transport.totalPrice}
          </p>
          <Button
            variant="primary"
            className="mt-2"
            onClick={() => onBook(transport)}
          >
            Book
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TransportCard;
