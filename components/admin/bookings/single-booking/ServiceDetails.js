import Image from "next/image";
import React from "react";

const ServiceDetails = ({ booking }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-800">Service Details</h3>
      {/* Cart Items */}
      <div>
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
      <div className="mt-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            ₹
            {booking?.cartItems
              ? new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                  .format(
                    booking?.cartItems.reduce(
                      (acc, cur) => acc + cur.price * cur.quantity,
                      0
                    )
                  )
                  .replace("₹", "")
                  .trim()
              : "0.00"}
          </span>
        </div>

        {/* Convenience Fee */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Convenience Fee</span>
          <span className="font-semibold">₹18.00</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 border-t border-gray-300 mt-4">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">
            ₹
            {booking?.cartItems
              ? new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                  .format(
                    booking?.cartItems.reduce(
                      (acc, cur) => acc + cur.price * cur.quantity,
                      18
                    )
                  )
                  .replace("₹", "")
                  .trim()
              : "0.00"}
          </span>
        </div>
      </div>

      {/* Payment Info */}
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
    </div>
  );
};

export default ServiceDetails;
