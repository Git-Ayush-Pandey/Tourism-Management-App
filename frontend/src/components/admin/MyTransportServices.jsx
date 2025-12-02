// src/pages/admin/MyTransportServices.jsx
import React, { useEffect, useState } from "react";
import adminService from "../../services/adminServices";

const ServiceForm = ({ initial = {}, transports = [], onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    transport_id: initial.transport_id?._id || initial.transport_id || "",
    from: initial.from || "",
    to: initial.to || "",
    departure_time: initial.departure_time ? new Date(initial.departure_time).toISOString().slice(0,16) : "",
    arrival_time: initial.arrival_time ? new Date(initial.arrival_time).toISOString().slice(0,16) : "",
    distance_km: initial.distance_km || 0,
    total_price: initial.total_price || 0,
    available_seats: initial.available_seats || 1,
    ...initial,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({
      ...form,
      // ensure departure/arrival are Date objects or ISO strings that backend accepts
      departure_time: new Date(form.departure_time),
      arrival_time: new Date(form.arrival_time),
    });}} className="space-y-2">
      <div>
        <label className="block text-sm">Vehicle</label>
        <select value={form.transport_id} onChange={(e)=>setForm({...form, transport_id: e.target.value})} className="w-full border p-2 rounded">
          <option value="">Select vehicle</option>
          {transports.map(t=> <option key={t._id} value={t._id}>{t.vehicle_type} — {t.driver_name}</option>)}
        </select>
      </div>

      <input placeholder="From" value={form.from} onChange={(e)=>setForm({...form, from:e.target.value})} className="w-full border p-2 rounded" />
      <input placeholder="To" value={form.to} onChange={(e)=>setForm({...form, to:e.target.value})} className="w-full border p-2 rounded" />
      <div className="grid grid-cols-2 gap-2">
        <input type="datetime-local" value={form.departure_time} onChange={(e)=>setForm({...form, departure_time: e.target.value})} className="w-full border p-2 rounded" />
        <input type="datetime-local" value={form.arrival_time} onChange={(e)=>setForm({...form, arrival_time: e.target.value})} className="w-full border p-2 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <input placeholder="Distance (km)" value={form.distance_km} onChange={(e)=>setForm({...form, distance_km: e.target.value})} className="border p-2 rounded" />
        <input placeholder="Seats" value={form.available_seats} onChange={(e)=>setForm({...form, available_seats: e.target.value})} className="border p-2 rounded" />
        <input placeholder="Total price" value={form.total_price} onChange={(e)=>setForm({...form, total_price: e.target.value})} className="border p-2 rounded" />
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" type="submit">Save</button>
        <button className="btn-outline" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

const MyTransportServices = () => {
  const [services, setServices] = useState([]);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const [s, t] = await Promise.all([adminService.getTransportServices(), adminService.getTransports()]);
      setServices(s);
      setTransports(t);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    try {
      await adminService.createTransportService(payload);
      setShowCreate(false);
      load();
    } catch (err) { console.error(err); alert("Create failed"); }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await adminService.updateTransportService(id, payload);
      setEditing(null);
      load();
    } catch (err) { console.error(err); alert("Update failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this route?")) return;
    try {
      await adminService.deleteTransportService(id);
      load();
    } catch (err) { console.error(err); alert("Delete failed"); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Routes</h1>
        <button className="btn-primary" onClick={()=>setShowCreate(true)}>Add Route</button>
      </div>

      {showCreate && (
        <div className="p-4 bg-white rounded mb-4">
          <ServiceForm transports={transports} onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
        </div>
      )}

      {loading ? <p>Loading...</p> : services.map(s => (
        <div key={s._id} className="p-3 bg-white rounded mb-2 flex justify-between">
          <div>
            <div className="font-semibold">{s.from} → {s.to}</div>
            <div className="text-sm text-gray-500">Vehicle: {s.transport_id?.vehicle_type} — {s.transport_id?.driver_name}</div>
            <div className="text-xs text-gray-500">Dep: {new Date(s.departure_time).toLocaleString()}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn-outline" onClick={()=>setEditing(s)}>Edit</button>
            <button className="btn-danger" onClick={()=>handleDelete(s._id)}>Delete</button>
          </div>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded w-full max-w-2xl">
            <h3 className="font-bold mb-3">Edit Route</h3>
            <ServiceForm initial={editing} transports={transports} onSubmit={(payload)=>handleUpdate(editing._id,payload)} onCancel={()=>setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTransportServices;
