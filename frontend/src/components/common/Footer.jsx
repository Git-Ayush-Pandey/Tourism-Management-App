import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">J&K Tourism</h3>
          <p className="text-sm leading-relaxed">
            Explore the scenic beauty, culture, and heritage of Jammu and Kashmir.
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/hotels" className="hover:text-white">Hotels</Link></li>
            <li><Link to="/packages" className="hover:text-white">Packages</Link></li>
            <li><Link to="/transport" className="hover:text-white">Transport</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <p>Email: support@jktourism.in</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} J&K Tourism Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
