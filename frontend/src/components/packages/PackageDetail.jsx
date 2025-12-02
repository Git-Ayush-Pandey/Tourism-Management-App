import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { get } from "../../services/api";
import Loader from "../common/Loader";
import Button from "../common/Button";

const PackageDetail = () => {
  const { id } = useParams();
  const {
    data: pkg,
    loading,
    error,
  } = useFetch(() => get(`/packages/${id}`), [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  if (!pkg)
    return (
      <p className="text-center mt-10 text-gray-500">Package not found.</p>
    );

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={pkg.image || "/images/default-package.jpg"}
          alt={pkg.name}
          className="rounded-lg shadow-md w-full h-80 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{pkg.name}</h1>
          <p className="text-gray-600 mb-4">{pkg.description}</p>

          <ul className="space-y-2 mb-6">
            <li>
              <strong>Duration:</strong> {pkg.duration} days
            </li>
            <li>
              <strong>Price:</strong> ₹{pkg.price}
            </li>
            <li>
              <strong>Region:</strong> {pkg.region}
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={() => alert("Booking feature coming soon!")}
            >
              Book Now
            </Button>
            <Link to="/packages">
              <Button variant="outline">Back to Packages</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
