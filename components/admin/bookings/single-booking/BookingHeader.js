import React from "react";

const BookingHeader = ({booking}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Booking ID: {booking.bookingId}</h2>
      <span
        className={`text-xs px-4 py-2 rounded-full ${
          booking.paid
            ? "bg-green-100 text-green-600"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {booking.status}
      </span>
    </div>
  );
};

export default BookingHeader;
