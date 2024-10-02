import React from "react";
import { GoAlertFill } from "react-icons/go";

const InvoiceDetail = ({ booking }) => {
  return (
    <>
      {booking.invoices && (
        <div className="bg-white p-6 rounded-lg shadow w-full mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md md:text-xl font-semibold text-gray-800">
              Invoice Details
            </h3>
            {booking.invoices.status === "Invoice Accepted" ? (
              <div className="bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-xs capitalize">
                {booking.invoices.status}
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-xs capitalize">
                {booking.invoices.status}
              </div>
            )}
          </div>

          {booking.invoices.transactionId == undefined ? (
            <div className="my-4 bg-red-50 text-red-500 text-sm p-4 rounded-lg flex gap-2 items-center">
              <GoAlertFill />
              No invoice payment has been made, Transaction not found.
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">Payment Info</h3>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <span className="text-gray-600">
                    Method: {booking.invoices.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">
                    Transaction ID: {booking.invoices.transactionId}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="border p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start flex-col lg:flex-row mb-2 gap-2">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  Title:
                  <div className="text-gray-700 font-medium">
                    {booking.invoices?.title}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  Date & Time:
                  <div className="text-gray-700 font-medium">
                    {booking.invoices?.date}, {booking.invoices?.time}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  Total:
                  <div className="text-gray-700 font-medium">
                    ₹{booking.invoices?.total}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                {booking.invoices.paid ? (
                  <div className="bg-teal-100 flex justify-center text-teal-800 rounded-full px-3 py-1 text-sm capitalize">
                    Paid
                  </div>
                ) : (
                  <div className="bg-red-100 flex justify-center text-red-800 rounded-full px-3 py-1 text-sm capitalize">
                    Not paid
                  </div>
                )}
              </div>
            </div>
            <div className="w-full sm:bg-white rounded-lg border overflow-auto">
              {/* Header */}
              <div className="text-gray-900 bg-gray-300 flex flex-col sm:flex-row sm:rounded-none mb-2">
                <div className="p-3 text-left font-semibold flex justify-center md:w-1/4">
                  Description
                </div>
                <div className="p-3 text-left font-semibold flex justify-center md:w-1/4">
                  Quantity
                </div>
                <div className="p-3 text-left font-semibold flex justify-center md:w-1/4">
                  Unit Price
                </div>
                <div className="p-3 text-left font-semibold flex justify-center md:w-1/4">
                  Amount
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col bg-white">
                {booking.invoices?.items?.map((item, index) => (
                  <div
                    className="flex flex-col sm:flex-row mb-2 sm:mb-0 border-gray-300 border-b last:border-b-0"
                    key={index}
                  >
                    <div className="border-grey-light border-b sm:border-none p-3 truncate last:border-b-0 flex justify-center md:w-1/4">
                      {item.description}
                    </div>
                    <div className="border-grey-light border-b sm:border-none p-3 truncate last:border-b-0 flex justify-center md:w-1/4">
                      {item.quantity}
                    </div>
                    <div className="border-grey-light border-b sm:border-none p-3 truncate last:border-b-0 flex justify-center md:w-1/4">
                      ₹{item.unitPrice}
                    </div>
                    <div className="border-grey-light border-b sm:border-none p-3 truncate last:border-b-0 flex justify-center md:w-1/4">
                      ₹{item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceDetail;
