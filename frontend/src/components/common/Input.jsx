import React from "react";

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
  icon: Icon,
  textarea = false,
  required = false,
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-700 mb-2 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />}
        {textarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field ${Icon ? "pl-10" : ""}`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field ${Icon ? "pl-10" : ""}`}
          />
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
