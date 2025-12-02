import React, { useState } from "react";
import { post } from "../../services/api";
import Button from "../common/Button";
import Input from "../common/Input";
import { useAuth } from "../../hooks/useAuth";

const BookingForm = ({ packageId, onSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    travelers: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated())
    return (
      <p className="text-center text-gray-600">
        Please <span className="link-primary">login</span> to book this package.
      </p>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await post("/bookings", { ...formData, packageId, user: user._id });
      onSuccess && onSuccess();
      alert("Booking request submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Book This Package</h3>
      <Input
        label="Start Date"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <Input
        label="End Date"
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <Input
        label="Travelers"
        type="number"
        name="travelers"
        value={formData.travelers}
        min="1"
        onChange={handleChange}
        required
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <Button type="submit" variant="primary" className="w-full mt-4" loading={loading}>
        Confirm Booking
      </Button>
    </form>
  );
};

export default BookingForm;
