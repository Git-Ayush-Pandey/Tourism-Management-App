import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin, adminMode } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Destinations", to: "/destinations" },
    { name: "Hotels", to: "/hotels" },
    { name: "Packages", to: "/packages" },
    { name: "Transport", to: "/transport" },
    { name: "Bookings", to: "/bookings" },
  ];

  return (
    <nav
      className={`fixed w-full z-40 top-0 shadow-md transition-all duration-300 
      ${adminMode ? "bg-red-600" : "bg-white"}`}
    >
      <div className="container flex justify-between items-center py-4">
        <Link
          to="/"
          className={`text-2xl font-bold ${
            adminMode ? "text-white" : "text-primary-600"
          }`}
        >
          J&K Tourism
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `font-medium ${adminMode ? "text-white" : "text-gray-700"} ${
                  isActive ? "border-b-2 border-primary-600" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isAuthenticated() ? (
            <>
              <Link
                to="/profile"
                className={`${
                  adminMode ? "text-white" : "text-gray-700"
                } font-medium hover:text-primary-300`}
              >
                {user?.name}
              </Link>

              {isAdmin() && (
                <Link to="/admin">
                  <Button variant="outline">
                    {adminMode ? "Admin Mode ON" : "Admin Mode"}
                  </Button>
                </Link>
              )}

              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
