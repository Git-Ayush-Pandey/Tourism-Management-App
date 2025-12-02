import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { get } from "../../services/api";
import Loader from "../common/Loader";
import Button from "../common/Button";

const TransportDetail = () => {
  const { id } = useParams();
  const {
    data: transport,
    loading,
    error,
  } = useFetch(() => get(`/transports/${id}`), [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;
  if (!transport)
    return (
      <p className="text-center text-gray-500 mt-10">Transport not found.</p>
    );

  return (
    <div className="container py-10">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {transport.vehicleType}
        </h1>
        <p className="text-gray-600 text-sm mb-2">
          Route: {transport.from} → {transport.to}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Departure: {new Date(transport.departureTime).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Available Seats: {transport.availableSeats || "N/A"}
        </p>

        <p className="text-primary-600 text-xl font-semibold mb-6">
          ₹{transport.totalPrice}
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => alert("Transport booking feature coming soon!")}
          >
            Book Transport
          </Button>
          <Link to="/transport">
            <Button variant="outline">Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransportDetail;
