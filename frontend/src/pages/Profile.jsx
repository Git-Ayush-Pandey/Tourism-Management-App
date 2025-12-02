import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, becomeAdmin, adminMode, toggleAdminMode } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="w-32 h-32 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-5xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
            <p className="text-gray-600 mb-4">{user?.email}</p>

            <span className="inline-block px-4 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold">
              {user?.role === "admin" ? "Administrator" : "Traveler"}
            </span>

            {/* Become Admin */}
            {user?.role !== "admin" && (
              <button
                onClick={becomeAdmin}
                className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold"
              >
                Become Admin
              </button>
            )}

            {/* Admin Mode Toggle */}
            {user?.role === "admin" && (
              <button
                onClick={toggleAdminMode}
                className={`mt-4 w-full py-2 rounded-lg font-semibold text-white ${
                  adminMode ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {adminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Information */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Personal Information</h2>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary-600 font-semibold hover:underline"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <button className="btn-primary">Save Changes</button>
              </form>
            ) : (
              <div className="space-y-4">
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Email:</b> {user?.email}</p>
                <p><b>Phone:</b> {user?.phone || "Not provided"}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
