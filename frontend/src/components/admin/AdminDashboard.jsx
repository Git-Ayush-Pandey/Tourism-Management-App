import React, { useEffect, useState } from "react";
import adminService from "../../services/adminServices";

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const Dashboard = () => {
  const [counts, setCounts] = useState({
    hotels: 0,
    packages: 0,
    transports: 0,
    services: 0,
    bookings: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [hotels, pkgs, trans, services, bookings] = await Promise.all([
          adminService.getHotels(),
          adminService.getPackages(),
          adminService.getTransports(),
          adminService.getTransportServices(),
          adminService.getBookings(),
        ]);
        setCounts({
          hotels: hotels.length,
          packages: pkgs.length,
          transports: trans.length,
          services: services.length,
          bookings: bookings.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Hotels" value={counts.hotels} />
        <StatCard label="Packages" value={counts.packages} />
        <StatCard label="Vehicles" value={counts.transports} />
        <StatCard label="Routes" value={counts.services} />
        <StatCard label="Bookings" value={counts.bookings} />
      </div>
    </div>
  );
};

export default Dashboard;
