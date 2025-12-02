import React from "react";
import AdminSidebar from "./AdminSidebar";
import { useFetch } from "../../hooks/useFetch";
import { get, del } from "../../services/api";
import Loader from "../common/Loader";
import Button from "../common/Button";

const ManagePackages = () => {
  const {
    data: packages,
    loading,
    error,
    refetch,
  } = useFetch(() => get("/packages"), []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await del(`/packages/${id}`);
    refetch();
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container py-10 flex flex-col md:flex-row gap-6">
      <AdminSidebar />
      <div className="flex-1">
        <h1 className="section-title">Manage Packages</h1>

        <div className="grid-responsive">
          {packages?.map((p) => (
            <div key={p._id} className="card card-hover">
              <img src={p.image} alt={p.name} className="rounded-md mb-3" />
              <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{p.duration} days</p>
              <Button variant="outline" onClick={() => handleDelete(p._id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePackages;
