import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => (
  <div className="w-64 bg-white shadow-lg h-screen p-5 space-y-3">
    <NavLink to="/admin" className="block admin-link">
      Dashboard
    </NavLink>

    <NavLink to="/admin/hotels" className="block admin-link">
      My Hotels
    </NavLink>

    <NavLink to="/admin/packages" className="block admin-link">
      My Packages
    </NavLink>

    <NavLink to="/admin/vehicles" className="block admin-link">
      My Vehicles
    </NavLink>

    <NavLink to="/admin/transport-services" className="block admin-link">
      My Transport Services
    </NavLink>

    <NavLink to="/admin/bookings" className="block admin-link">
      My Bookings
    </NavLink>
  </div>
);

export default AdminSidebar;
