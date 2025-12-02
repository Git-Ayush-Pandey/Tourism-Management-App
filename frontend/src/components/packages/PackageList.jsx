import React from "react";
import PackageCard from "./PackageCard";
import Loader from "../common/Loader";

const PackageList = ({ packages, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container py-10">
      <h2 className="section-title text-center">Available Tour Packages</h2>

      <div className="grid-responsive">
        {packages?.length ? (
          packages.map((pkg) => (
            <PackageCard key={pkg.package_id} pkg={pkg} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No packages found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageList;
