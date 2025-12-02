import React, { useState } from "react";
import RatingStars from "./RatingStars";
import Button from "../common/Button";
import Input from "../common/Input";
import { post } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const ReviewForm = ({ entityId, entityType, onSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated()) {
    return (
      <p className="text-center text-gray-600">
        Please <span className="link-primary">login</span> to leave a review.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      setError("Please provide both rating and comment");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await post("/reviews", {
        entityType,
        entityId,
        rating,
        comment,
        user: user._id,
      });
      setComment("");
      setRating(0);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mt-6"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Write a Review
      </h3>
      <RatingStars rating={rating} onRatingChange={setRating} />
      <Input
        textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mt-3"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="mt-4"
      >
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
