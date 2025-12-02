import React from "react";
import HotelCard from "./HotelCard";
import Loader from "../common/Loader";

const HotelList = ({ hotels, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container py-10">
      <h2 className="section-title text-center">Hotels & Lodging Options</h2>

      <div className="grid-responsive">
        {hotels?.length ? (
          hotels.map((h) => <HotelCard key={h._id} hotel={h} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hotels found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
