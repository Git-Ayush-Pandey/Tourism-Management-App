import React from "react";
import DestinationCard from "./DestinationCard";
import Loader from "../common/Loader";

const DestinationList = ({ destinations, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container py-10">
      <h2 className="section-title text-center">Top Destinations in J&K</h2>

      <div className="grid-responsive">
        {destinations?.length ? (
          destinations.map((dest) => (
            <DestinationCard key={dest._id} destination={dest} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No destinations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DestinationList;
