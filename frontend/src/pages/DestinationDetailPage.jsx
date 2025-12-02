import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { destinationService } from "../services/destinationService";

const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const data = await destinationService.getById(id);
        setDestination(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load destination:", err);
        setError("Failed to load destination");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fallbackImage =
    "https://via.placeholder.com/1200x700?text=Destination+Image";

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading destination...</p>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error || "Destination not found."}</p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <Link to="/destinations" className="btn-secondary">
            Browse Destinations
          </Link>
        </div>
      </div>
    );
  }

  const lat =
    destination.latitude ??
    destination.lat ??
    (destination.geometry && destination.geometry.coordinates?.[1]);
  const lng =
    destination.longitude ??
    destination.lng ??
    (destination.geometry && destination.geometry.coordinates?.[0]);

  const googleMapSrc =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&z=12&output=embed`
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-primary-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="w-full h-96 overflow-hidden">
          <img
            src={destination.image || fallbackImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500">{destination.region}</span>
            {destination.best_season && (
              <span className="text-sm px-2 py-1 bg-green-50 text-green-700 rounded">
                {destination.best_season}
              </span>
            )}
          </div>

          {destination.description && (
            <p className="text-gray-700 mb-4">{destination.description}</p>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Details</h3>
                <ul className="text-gray-600">
                  {destination.latitude && destination.longitude && (
                    <li>
                      Coordinates: {destination.latitude},{" "}
                      {destination.longitude}
                    </li>
                  )}
                  {destination.best_season && (
                    <li>Best season: {destination.best_season}</li>
                  )}
                  {destination._id && (
                    <li>
                      ID:{" "}
                      <span className="text-sm text-gray-500">
                        {destination._id}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {googleMapSrc ? (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <div className="w-full h-64 rounded overflow-hidden border">
                    <iframe
                      title="map"
                      src={googleMapSrc}
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-gray-500">
                  Location coordinates not available.
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-2">Related</h3>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    to={`/hotels?destination=${destination._id}`}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  >
                    View Hotels
                  </Link>
                  <Link
                    to={`/packages?destination=${destination._id}`}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  >
                    View Packages
                  </Link>
                </div>
              </div>
            </div>

            <aside className="p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Quick Info</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>Region:</strong> {destination.region}
                </div>
                {destination.best_season && (
                  <div>
                    <strong>Best season:</strong> {destination.best_season}
                  </div>
                )}
                {destination.phone && (
                  <div>
                    <strong>Contact:</strong> {destination.phone}
                  </div>
                )}
                {destination.website && (
                  <div>
                    <a
                      className="text-primary-600 hover:underline"
                      href={destination.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit website
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {destination.reviews && destination.reviews.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Reviews</h3>
              <div className="space-y-3">
                {destination.reviews.map((r, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {r.author || "Anonymous"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {r.date ? new Date(r.date).toLocaleDateString() : ""}
                      </div>
                    </div>
                    <div className="text-gray-700">{r.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
