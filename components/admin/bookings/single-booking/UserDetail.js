"use client";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const UserDetail = ({ booking }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Customer Details
      </h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        {/* Profile Image */}
        {booking?.profileImage?.url ? (
          <Image
            width={500}
            height={500}
            src={booking.image.url}
            alt={booking.fullname}
            className="w-16 h-16 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <div className="w-16 h-16 rounded-full flex justify-center items-center font-junge bg-gray-400 cursor-pointer">
            {booking.fullname && Array.from(booking.fullname)[0].toUpperCase()}
          </div>
        )}

        {/* User Info */}
        <div className="flex flex-col gap-1 text-gray-700">
          {/* Full Name */}
          <span className="text-xl font-semibold">{booking.fullname}</span>

          <div className="flex gap-1 items-center">
            <Tooltip
              content={booking.phoneNumber}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <IconButton variant="text">
                <FaPhoneAlt className="text-teal-500 text-xl cursor-pointer" />
              </IconButton>
            </Tooltip>
            <Tooltip
              content={booking.email}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <IconButton variant="text">
                <FaEnvelope className="text-blue-500 text-xl cursor-pointer" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
