// src/components/hotels/HotelDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { get } from "../../services/api";
import Loader from "../common/Loader";
import Button from "../common/Button";
import AmenityList from "./AmenityList";
import RoomCard from "./RoomCard";
import ReviewList from "../reviews/ReviewList";
import ReviewForm from "../reviews/ReviewForm";

const normalizeHotel = (raw) => {
  if (!raw) return null;
  const h = raw.hotel ?? raw.data ?? raw;

  return {
    _id: h._id ?? h.id ?? null,
    name: h.name ?? "",
    description: h.description ?? "",
    image: h.image ?? "",
    amenities: Array.isArray(h.amenities) ? h.amenities : (typeof h.amenities === "string" ? h.amenities.split(",").map(s=>s.trim()).filter(Boolean) : []),
    pricePerNight: h.pricePerNight ?? h.price_per_night ?? h.price ?? null,
    rooms: Array.isArray(h.rooms) ? h.rooms : [],
    rating: h.rating ?? 0,
    address: h.address ?? h.location ?? "",
    reviews: Array.isArray(h.reviews) ? h.reviews : [],
    raw: h,
  };
};

const HotelDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(() => get(`/hotels/${id}`), [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;
  if (!data) return <p className="text-center text-gray-500 mt-10">Hotel not found.</p>;

  const hotel = normalizeHotel(data);

  console.log("Raw fetch:", data);
  console.log("Normalized hotel:", hotel);

  if (!hotel || !hotel._id) return <p className="text-center text-gray-500 mt-10">Hotel not found.</p>;

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={hotel.image && hotel.image.startsWith("http") ? hotel.image : "/images/default-hotel.jpg"}
          alt={hotel.name}
          className="rounded-lg shadow-md w-full h-80 object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <p className="text-gray-600 mb-4">{hotel.description}</p>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Amenities</h3>
            <AmenityList amenities={hotel.amenities.length ? hotel.amenities : ["No amenities listed"]} />
          </div>

          <p className="text-primary-600 text-2xl font-semibold mb-6">
            {hotel.pricePerNight != null ? `₹${hotel.pricePerNight} / night` : "Price not available"}
          </p>

          <div className="flex gap-3">
            <Button variant="primary" onClick={() => alert("Booking feature coming soon!")}>
              Book Hotel
            </Button>
            <Link to="/hotels"><Button variant="outline">Back to Hotels</Button></Link>
          </div>
        </div>
      </div>

      {hotel.rooms?.length > 0 && (
        <div className="mt-10">
          <h2 className="section-title text-center">Available Rooms</h2>
          <div className="grid-responsive">
            {hotel.rooms.map((room) => (
              <RoomCard key={room._id ?? room.id} room={room} onBook={() => alert("Room booked!")} />
            ))}
          </div>
        </div>
      )}

      <ReviewList entityId={hotel._id} entityType="hotel" />
      <ReviewForm entityId={hotel._id} entityType="hotel" onSuccess={() => {}} />
    </div>
  );
};

export default HotelDetail;
