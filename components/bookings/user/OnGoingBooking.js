import {
  Button,
  Dialog,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBookmark, FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoMdMailOpen, IoMdOpen } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { PiGenderIntersexFill } from "react-icons/pi";
import CancelBookingDialog from "./CancelBookingDialog";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
const OnGoingBooking = ({
  booking,
  disableCancelBookingButton,
  handleCancellationReasonDialog,
  cancellationReasonDialog,
  handleInvoiceDialog,
  redirectingLoading,
  handleInvoicePayment,
  cancelled,
}) => {
  const [openServiceProviderDetailDialog, setOpenServiceProviderDetailDialog] =
    useState(false);

  const handleServiceProviderDetailDialog = () =>
    setOpenServiceProviderDetailDialog(!openServiceProviderDetailDialog);
  return (
    <div key={booking._id} className="p-6">
      <header className="flex items-center justify-start gap-2">
        {cancelled ? (
          <h1 className="text-center text-xl lg:text-2xl text-red-700">
            Cancelled Booking
          </h1>
        ) : (
          <h1 className="text-center text-xl lg:text-2xl text-gray-700">
            Booking Details
          </h1>
        )}
      </header>
      <div className="h-px bg-gray-300 w-full my-4"></div>
      <section>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {booking?.cartItems?.map((item) => {
            return (
              <div className="flex items-center gap-3" key={item._id}>
                <Image
                  width={100}
                  height={100}
                  src={item.icon?.url}
                  className="rounded-md w-28 h-28 object-cover"
                  alt="Booking"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="md:text-2xl sm:text-2xl text-xl text-gray-700 ">
                    {item.name}
                  </h3>
                  <p>
                    Price:{" "}
                    <strong className="text-teal-500 font-semibold">
                      ₹{item.price}
                    </strong>
                  </p>
                  <p>
                    Qty:{" "}
                    <strong className="text-gray-600">{item.quantity}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <h4 className="text-blue-500 font-semibold text-xl mt-4">
          Your Information
        </h4>
        <div className="h-px bg-gray-300 w-full mt-2 mb-1"></div>
        <div className="flex flex-col justify-between gap-4">
          <div>
            Full Name:{" "}
            <strong className="text-gray-600">{booking?.fullname}</strong>
          </div>
          <div>
            Phone:{" "}
            <strong className="text-gray-600">
              +91 {booking?.phoneNumber}
            </strong>
          </div>
          <div>
            Address:{" "}
            <strong className="text-gray-600">{booking?.address}</strong>
          </div>
          <div>
            Booking Date:{" "}
            <strong className="text-gray-600">
              {new Date(booking?.createdAt).toLocaleDateString(
                "en-US",
                options
              )}
            </strong>
          </div>
          <div className="text-gray-800 font-bold flex items-center gap-2">
            Status:{" "}
            <span className="text-teal-500 rounded-md">{booking?.status}</span>
          </div>
          {booking?.assignedServiceProviders?.name && (
            <div className="text-gray-800 font-bold flex flex-col gap-2">
              About Service Provider:
              <div className="flex gap-2 items-center">
                {booking?.assignedServiceProviders?.image?.url ? (
                  <Image
                    src={booking?.assignedServiceProviders?.image?.url}
                    className="rounded-full h-12 w-12 object-cover"
                    alt="Booking"
                    width={96}
                    height={96}
                  />
                ) : (
                  <div className="w-12 h-12 text-xl text-black rounded-full flex justify-center items-center font-junge bg-gray-400">
                    {booking?.assignedServiceProviders?.name &&
                      Array.from(
                        booking?.assignedServiceProviders?.name
                      )[0].toUpperCase()}
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="text-gray-700 font-semibold text-xl">
                    {booking?.assignedServiceProviders?.name}
                  </div>
                  <div className="text-gray-700 text-sm font-medium">
                    {booking?.assignedServiceProviders?.phoneNumber}
                  </div>
                </div>
                <button
                  onClick={handleServiceProviderDetailDialog}
                  className="flex items-center justify-center rounded-full bg-blue-100 w-10 h-10"
                >
                  <IoMdOpen size={15} />
                </button>
              </div>
              <Dialog
                open={openServiceProviderDetailDialog}
                handler={handleServiceProviderDetailDialog}
                size="sm"
                className="p-6"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.1, y: 500 },
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xl font-semibold text-blue-gray-500">
                    Service provider detail
                  </div>

                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={handleServiceProviderDetailDialog}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </IconButton>
                </div>
                <div className="mb-4 flex flex-col   border-b border-blue-gray-50 pb-4">
                  <div className="flex items-center gap-3">
                    {booking?.assignedServiceProviders?.image?.url ? (
                      <Image
                        src={booking?.assignedServiceProviders?.image?.url}
                        className="rounded-full h-12 w-12 object-cover"
                        alt="Booking"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <div className="w-12 h-12 text-xl text-black rounded-full flex justify-center items-center font-junge bg-gray-400">
                        {booking?.assignedServiceProviders?.name &&
                          Array.from(
                            booking?.assignedServiceProviders?.name
                          )[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <Typography
                        variant="h5"
                        color="blue"
                        className="font-semibold"
                      >
                        {booking?.assignedServiceProviders?.name}
                      </Typography>
                      {/* <div className="text-gray-800 flex items-center gap-2 mx-auto  font-bold">
                          <Rating value={4} readonly /> 4.5
                        </div> */}
                    </div>
                  </div>
                </div>
                <div
                  color="gray"
                  className="flex flex-col gap-3 items-start pr-4 font-normal"
                >
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-teal-500" size={23} />
                    Phone: +91 {booking?.assignedServiceProviders?.phoneNumber}
                  </div>
                  <div className="flex items-center gap-3">
                    <IoMdMailOpen className="text-deep-purple-500" size={23} />
                    Email: {booking?.assignedServiceProviders?.email}
                  </div>
                  <div className="flex items-center gap-3">
                    <PiGenderIntersexFill className="text-blue-500" size={23} />
                    Gender: {booking?.assignedServiceProviders?.gender}
                  </div>
                </div>
              </Dialog>
            </div>
          )}

          <div className="h-px bg-gray-300 w-full"></div>
          <div>
            Day of departure:{" "}
            <strong className="text-gray-600">{booking?.date}</strong>
          </div>
          <div>
            Time of departure:{" "}
            <strong className="text-gray-600">{booking?.time}</strong>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-2 flex-col">
              <div className="text-gray-800 font-bold flex gap-2 items-center">
                Verification OTP:{" "}
                <span className="flex items-center gap-2">
                  {booking.otp.split("").map((code, index) => {
                    return (
                      <span
                        key={index}
                        className="w-10 h-10 flex items-center justify-center text-lg rounded-md bg-gray-700 text-white"
                      >
                        {code}
                      </span>
                    );
                  })}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Verification code is used to verify the service provider when
                they reached to you!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-4">
        <table className="min-w-full  ">
          <thead>
            <tr>
              <th className="text-left text-2xl text-gray-700 font-normal">
                Summary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Subtotal</td>
              <td className="py-2 px-4 border-b text-right">
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
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Convenience Fee</td>
              <td className="py-2 px-4 border-b text-right">₹18.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold">Total</td>
              <td className="py-2 px-4 text-right font-bold">
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
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="flex gap-1 items-center">
        Contact for any query:{" "}
        <div className="flex gap-2">
          <Link
            target="_blank"
            href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER}/?text=Hello, i have created a service on ${process.env.NEXT_PUBLIC_COMPANY_NAME}!
              
              This is my booking id: ${booking._id}.
              
              
              I am facing the issue: .....`}
            className="flex items-center gap-2 text-xs px-3 py-1.5 bg-[#25D366] text-white rounded-md shadow-md hover:bg-[#20b358] transition-colors duration-200 cursor-pointer"
          >
            <FaWhatsapp className="text-lg" />
            <span className="font-semibold">WhatsApp</span>
          </Link>

          <Link
            target="_blank"
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL_ID}`}
            className="flex items-center gap-2 text-xs px-3 py-1.5 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
          >
            <IoMail className="text-lg" />
            <span className="font-semibold">Mail Us</span>
          </Link>
        </div>
      </div>
      <section className="w-full mt-4 flex justify-between items-center flex-col lg:flex-row gap-4">
        <p className="font-medium text-red-600 text-sm">
          Note: Order can be cancelled up to <strong>2 hours</strong> before the
          scheduled time.
        </p>
        <div className="flex items-center justify-end gap-2 w-fit whitespace-nowrap">
          {!cancelled && (
            <Button
              className="rounded"
              variant="outlined"
              color="red"
              disabled={disableCancelBookingButton}
              onClick={handleCancellationReasonDialog}
            >
              Cancel Booking
            </Button>
          )}
          <CancelBookingDialog
            booking={booking}
            cancellationReasonDialog={cancellationReasonDialog}
            handleCancellationReasonDialog={handleCancellationReasonDialog}
          />
          {booking.invoices?.title && (
            <div className="flex gap-2">
              <Button
                variant="gradient"
                color="blue"
                className="rounded"
                onClick={handleInvoiceDialog}
              >
                View invoice
              </Button>
              {booking.invoices?.status === "Invoice Accepted" && !booking.invoices.paid && (
                <Button
                  variant="gradient"
                  color="teal"
                  className="rounded"
                  loading={redirectingLoading}
                  onClick={handleInvoicePayment}
                >
                  Pay ₹{booking.invoices.total}
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OnGoingBooking;
