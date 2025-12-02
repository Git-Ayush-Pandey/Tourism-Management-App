import React from "react";
import TransportCard from "./TransportCard";
import Loader from "../common/Loader";

const TransportList = ({ transports, loading, error, onBook }) => {
  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container py-10">
      <h2 className="section-title text-center">Available Transport Options</h2>

      <div className="grid-responsive">
        {transports?.length ? (
          transports.map((t) => (
            <TransportCard key={t._id} transport={t} onBook={onBook} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No transport options available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransportList;
