import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { get } from "../../services/api";
import ReviewCard from "./ReviewCard";
import Loader from "../common/Loader";

const ReviewList = ({ entityId, entityType }) => {
  const {
    data: reviews,
    loading,
    error,
    refetch,
  } = useFetch(() => get(`/reviews?entityType=${entityType}&entityId=${entityId}`), [
    entityId,
    entityType,
  ]);

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="mt-10">
      <h3 className="section-title text-center">User Reviews</h3>
      {reviews?.length ? (
        <div className="grid gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
