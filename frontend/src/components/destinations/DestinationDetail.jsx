import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { get } from "../../services/api";
import Loader from "../common/Loader";
import Button from "../common/Button";
import ReviewList from "../reviews/ReviewList";
import ReviewForm from "../reviews/ReviewForm";

const DestinationDetail = () => {
  const { id } = useParams();
  const {
    data: destination,
    loading,
    error,
  } = useFetch(() => get(`/destinations/${id}`), [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;
  if (!destination)
    return (
      <p className="text-center text-gray-500 mt-10">Destination not found.</p>
    );

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={destination.image || "/images/default-destination.jpg"}
          alt={destination.name}
          className="rounded-lg shadow-md w-full h-80 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
          <p className="text-gray-600 mb-4">{destination.description}</p>
          <p className="text-gray-500 mb-6">
            <strong>Region:</strong> {destination.region}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={() => alert("Booking feature coming soon!")}
            >
              Explore Packages
            </Button>
            <Link to="/destinations">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewList entityId={destination._id} entityType="destination" />
      <ReviewForm
        entityId={destination._id}
        entityType="destination"
        onSuccess={() => {}}
      />
    </div>
  );
};

export default DestinationDetail;
