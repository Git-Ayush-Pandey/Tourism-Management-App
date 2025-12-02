import React from "react";

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  icon: Icon,
  className = "",
}) => {
  const baseClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : "btn-outline";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} flex items-center justify-center gap-2 ${className}`}
    >
      {loading && (
        <span className="loader border-white border-t-transparent"></span>
      )}
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
