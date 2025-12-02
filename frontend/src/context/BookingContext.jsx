import React, { createContext, useState } from "react";

export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookingCart, setBookingCart] = useState([]);
  return (
    <BookingContext.Provider value={{ bookingCart, setBookingCart }}>
      {children}
    </BookingContext.Provider>
  );
};
