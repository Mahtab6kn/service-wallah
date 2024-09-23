import { Avatar, IconButton } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import formatDate from "@/utils/formatDate";

export default function BookingsTable({ bookings }) {
  return (
    <div className="overflow-x-auto p-4 shadow-lg bg-white rounded-lg">
      <div className="min-w-full text-left text-sm">
        <div className="bg-blue-50 flex rounded-lg">
          <div className="p-4 font-semibold text-blue-700 w-1/6 text-center">
            Booking ID
          </div>
          <div className="p-4 font-semibold text-blue-700 w-2/6">Booked By</div>
          <div className="p-4 font-semibold text-blue-700 w-1/6 text-center">
            Created Date
          </div>
          <div className="p-4 font-semibold text-blue-700 w-1/6 text-center">
            Status
          </div>
          <div className="p-4 font-semibold text-blue-700 w-1/6 text-center">
            Total Amount
          </div>
          <div className="p-4 font-semibold text-blue-700 w-1/6 text-center">
            Action
          </div>
        </div>
        {bookings.map((booking) => (
          <div key={booking._id} className="flex">
            <div className="p-4 w-1/6 flex items-center justify-center truncate text-xs">
              <span className="truncate">
                {booking.bookingId}
              </span>
            </div>

            <div className="p-4 w-2/6 truncate flex items-center gap-2">
              {booking.profileImage.url ? (
                <Avatar src={booking.profileImage?.url} size="sm" />
              ) : (
                <div className="w-12 h-12 text-xl text-black rounded-full flex justify-center items-center font-junge bg-gray-400">
                  {booking?.assignedServiceProviders?.name &&
                    Array.from(
                      booking?.assignedServiceProviders?.name
                    )[0].toUpperCase()}
                </div>
              )}
              <div className="">
                <p className="font-medium">{booking.fullname}</p>
                <p className="text-gray-500 text-xs">{booking.phoneNumber}</p>
              </div>
            </div>
            <div className="p-4 w-1/6 truncate flex items-center justify-center">
              {formatDate(booking.createdAt)}
            </div>
            <div className="p-4 w-1/6 truncate flex items-center justify-center">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  booking.completed
                    ? "bg-teal-100 text-teal-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {booking.completed ? "Completed" : "Not Completed"}
              </span>
            </div>
            <div className="p-4 w-1/6 truncate flex items-center justify-center">
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
            </div>
            <div className="p-4 w-1/6 truncate flex items-center justify-center">
              <IconButton variant="text" color="blue-gray">
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
