import React from "react";

const BookingDetails = ({booking}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Booking Information
      </h3>

      <div className="flex justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500">Booking Date</p>
          <p className="text-lg font-semibold text-gray-700">{booking.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Booking Time</p>
          <p className="text-lg font-semibold text-gray-700">{booking.time}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">One-Time Password (OTP)</p>
          <p className="text-lg font-semibold text-gray-700">{booking.otp}</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            booking.otpVerified
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {booking.otpVerified ? "Verified" : "Not Verified"}
        </span>
      </div>
    </div>
  );
};

export default BookingDetails;
