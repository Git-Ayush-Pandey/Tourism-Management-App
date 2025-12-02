import React from "react";

const Card = ({ children, className = "", hoverable = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card ${
        hoverable ? "card-hover cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
