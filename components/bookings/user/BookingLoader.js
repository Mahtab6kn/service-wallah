import { Player } from "@lottiefiles/react-lottie-player";
import { Alert, Button, Dialog, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClipboard, FaWhatsapp } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { IoMail } from "react-icons/io5";
import CancelBookingDialog from "./CancelBookingDialog";

const BookingLoader = ({
  booking,
  disableCancelBookingButton,
  cancellationReasonDialog,
  handleCancellationReasonDialog,
}) => {
  return (
    <div className="p-6">
      <div
        title="Copy booking id"
        className="flex items-center gap-2 cursor-pointer transition-colors duration-200"
        onClick={() =>
          navigator.clipboard
            .writeText(booking._id)
            .then(() => {
              toast.success("Booking ID copied!");
            })
            .catch((err) => {
              console.error("Failed to copy the text: ", err);
            })
        }
      >
        <FaClipboard className="text-teal-500 text-2xl" />{" "}
        {/* Clipboard icon */}
        <div className="flex gap-2">
          <span className="text-gray-700 font-semibold">Booking ID</span>
          <div className="text-teal-500 font-bold">{booking?._id}</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center ">
        <div className="w-full">
          <div>
            <Player
              autoplay
              loop
              keepLastFrame={true}
              src="/lottie/searching.json"
            ></Player>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-lg">
          <div className="flex gap-2 flex-col lg:flex-row items-center text-gray-700 font-semibold text-sm">
            <GrStatusInfo />
            <div>{booking?.status}</div>
          </div>
          <div className="flex gap-4 flex-col">
            {booking?.cartItems.map((item, itemIndex) => (
              <div className="flex flex-col gap-2" key={item._id}>
                <div key={itemIndex} className={`flex items-center space-x-2`}>
                  <div className="flex-shrink-0">
                    <Image
                      width={100}
                      height={100}
                      className="w-16 h-16 rounded-full object-cover"
                      src={item.icon?.url}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg text-gray-800">{item.name}</h2>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-lg font-bold text-teal-600">
                        ₹{item.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
                {itemIndex < booking.cartItems.length - 1 ? (
                  <div className="h-px bg-gray-300 w-full"></div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
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
          <Button
            className="rounded"
            variant="outlined"
            color="red"
            disabled={disableCancelBookingButton}
            onClick={handleCancellationReasonDialog}
          >
            Cancel Booking
          </Button>
          <CancelBookingDialog
            booking={booking}
            cancellationReasonDialog={cancellationReasonDialog}
            handleCancellationReasonDialog={handleCancellationReasonDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingLoader;
