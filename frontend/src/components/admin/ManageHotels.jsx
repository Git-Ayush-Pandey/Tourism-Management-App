import React, { useEffect, useState } from "react";
import adminService from "../../services/adminServices";

const HotelForm = ({ initial = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    region: initial.region || "",
    description: initial.description || "",
    price_per_night: initial.price_per_night || 0,
    image: initial.image || "",
    ...initial,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-3"
    >
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      <input
        value={form.region}
        onChange={(e) => setForm({ ...form, region: e.target.value })}
        placeholder="Region"
        className="w-full border p-2 rounded"
      />
      <input
        value={form.price_per_night}
        onChange={(e) => setForm({ ...form, price_per_night: e.target.value })}
        placeholder="Price per night"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <input
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="Image URL"
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2">
        <button type="submit" className="btn-primary">
          Save
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
};

const MyHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminService.getHotels();
      setHotels(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (payload) => {
    try {
      await adminService.createHotel(payload);
      setShowCreate(false);
      load();
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await adminService.updateHotel(id, payload);
      setEditing(null);
      load();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this hotel?")) return;
    try {
      await adminService.deleteHotel(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Hotels</h1>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>
          Add Hotel
        </button>
      </div>

      {showCreate && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Create Hotel</h3>
          <HotelForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
          />
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          hotels.map((h) => (
            <div
              key={h._id}
              className="p-3 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{h.name}</div>
                <div className="text-sm text-gray-500">{h.region}</div>
              </div>

              <div className="flex gap-2">
                <button className="btn-outline" onClick={() => setEditing(h)}>
                  Edit
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(h._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="font-bold mb-3">Edit Hotel</h3>
            <HotelForm
              initial={editing}
              onSubmit={(payload) => handleUpdate(editing._id, payload)}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHotels;
