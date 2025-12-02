import React from "react";

const RatingStars = ({ rating = 0, onRatingChange, readOnly = false }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onRatingChange(star)}
          className={`text-3xl transition transform hover:scale-110 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
