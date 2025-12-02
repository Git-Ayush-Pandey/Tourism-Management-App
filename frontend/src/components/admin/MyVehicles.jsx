import React, { useEffect, useState } from "react";
import adminService from "../../services/adminServices";

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await adminService.getMyTransports();
    setVehicles(data);
  };

  const deleteVehicle = async (id) => {
    await adminService.deleteTransport(id);
    loadVehicles();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Vehicles</h2>

      {vehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <div className="space-y-4">
          {vehicles.map((t) => (
            <div key={t._id} className="border p-4 rounded flex justify-between">
              <div>
                <p><strong>Type:</strong> {t.vehicle_type}</p>
                <p><strong>Capacity:</strong> {t.capacity}</p>
                <p><strong>Price/KM:</strong> ₹{t.price_per_km}</p>
              </div>

              <button
                onClick={() => deleteVehicle(t._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
