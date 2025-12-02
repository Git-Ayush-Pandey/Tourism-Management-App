import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

import Dashboard from "./AdminDashboard";
import ManageHotels from "./ManageHotels";
import ManagePackages from "./ManagePackages";
import MyVehicles from "./MyVehicles";
import MyTransportServices from "./MyTransportServices";
import MyBookings from "./MyBookings";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="hotels" element={<ManageHotels />} />
          <Route path="packages" element={<ManagePackages />} />
          <Route path="vehicles" element={<MyVehicles />} />
          <Route path="transport-services" element={<MyTransportServices />} />
          <Route path="bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
