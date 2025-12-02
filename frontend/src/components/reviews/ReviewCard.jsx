import React from "react";
import Card from "../common/Card";
import RatingStars from "./RatingStars";

const ReviewCard = ({ review }) => {
  if (!review) return null;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">{review.user?.name || "Anonymous"}</h3>
        <RatingStars rating={review.rating} readOnly />
      </div>
      <p className="text-gray-700 mb-2">{review.comment}</p>
      <p className="text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </Card>
  );
};

export default ReviewCard;
