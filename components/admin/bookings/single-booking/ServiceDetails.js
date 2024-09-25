import ShowPricing from "@/components/ShowPricing";
import Image from "next/image";
import React from "react";
import { GoAlertFill } from "react-icons/go";

const ServiceDetails = ({ booking }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-800">Service Details</h3>
      {/* Cart Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {booking.cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center py-4 border-b"
          >
            <div className="flex items-center gap-4">
              <Image
                width={500}
                height={500}
                src={item.icon.url}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Qty: {item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Info */}
      <ShowPricing cartItems={booking.cartItems} />

      {/* Payment Info */}
      {booking.transactionId == undefined ? (
        <div className="mt-6 bg-red-50 text-red-500 text-sm p-4 rounded-lg flex gap-2 items-center">
          <GoAlertFill />
          No payment has been made, Transaction not found.
        </div>
      ) : (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Payment Info
            </h3>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                booking.paid
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {booking.paid ? "Paid" : "Not Paid"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Method:</span>{" "}
                {booking.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Transaction ID:</span>{" "}
                {booking.transactionId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
