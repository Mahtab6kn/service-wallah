"use client";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";
import UserDetail from "./UserDetail";
import ServiceDetails from "./ServiceDetails";
import LocationDetails from "./LocationDetails";
import BookingDetails from "./BookingDetails";

const BookingContainer = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchingBooking = useCallback(async () => {
    try {
      const response = await fetch(`/api/bookings/${id}`);
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      console.log(data.booking);
      setBooking(data.booking);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchingBooking();
  }, [fetchingBooking]);

  if (loading) return <Loading />;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto my-6">
      {/* Booking ID & Status */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Booking ID: {booking.bookingId}
        </h2>
        <span
          className={`text-xs px-4 py-2 rounded-full ${
            booking.paid
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <BookingDetails booking={booking} />

      <UserDetail booking={booking} />

      <ServiceDetails booking={booking} />

      <LocationDetails booking={booking} />

      {/* <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Info</h3>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <span className="text-gray-600">
              Method: {booking.paymentMethod}
            </span>
          </div>
          <div>
            <span className="text-gray-600">
              Transaction ID: {booking.transactionId}
            </span>
          </div>
        </div>
      </div> */}

      {/* Service Provider Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Service Provider Info</h3>
        <span className="text-sm text-gray-600">
          {booking.noServiceProviderAvailable
            ? "No service provider available"
            : "Assigned to a service provider"}
        </span>
      </div>
    </div>
  );
};

export default BookingContainer;

// Left to do:

// show service provider working image

// Show service provider information

// show a button to alter the payment status

// Show invoice if available

// Show a button to alter invoice payment status

// if the booking has not been accepted yet, show available service provider information

// If there is no service provider available give a dialog to manually assign the service provider

// create a section if the booking has been cancelled with the reason


