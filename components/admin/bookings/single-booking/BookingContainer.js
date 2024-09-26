"use client";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import UserDetail from "./UserDetail";
import ServiceDetails from "./ServiceDetails";
import LocationDetails from "./LocationDetails";
import BookingDetails from "./BookingDetails";
import InvoiceDetail from "./InvoiceDetail";
import { Button } from "@material-tailwind/react";

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
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <BookingDetails booking={booking} />

      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center w-full mb-6">
        <div className="bg-white p-6 rounded-lg shadow w-full">
          <h3 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
            Customer Details
          </h3>
          <UserDetail
            name={booking.fullname}
            profileImage={booking.profileImage}
            email={booking.email}
            phoneNumber={booking.phoneNumber}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow w-full">
          {booking.assignedServiceProviders ? (
            <>
              <h3 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
                Assigned Service Provider
              </h3>
              <UserDetail
                name={booking.assignedServiceProviders.name}
                profileImage={booking.assignedServiceProviders.image}
                email={booking.assignedServiceProviders.email}
                phoneNumber={booking.assignedServiceProviders.phoneNumber}
              />
            </>
          ) : (
            <div className="flex flex-col gap-4 py-1">
              <h3 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
                No service provider assigned
              </h3>

              {/* Button Section */}
              <Button
                size="md"
                variant="gradient"
                color="blue"
                className="flex gap-3 items-center justify-center"
              >
                <FaPlus className="text-lg" />
                <span>Assign Service Provider</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <ServiceDetails booking={booking} />

      <InvoiceDetail booking={booking} />

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
        <h3 className="text-lg font-semibold mb-2">
          Available Service providers
        </h3>
        <span className="text-sm text-gray-600">
          {booking.noServiceProviderAvailable ? (
            "No service provider available"
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
              {booking.availableServiceProviders.map((sp, index) => {
                return (
                  <UserDetail
                    name={sp.name}
                    profileImage={sp.image}
                    email={sp.email}
                    phoneNumber={sp.phoneNumber}
                  />
                );
              })}
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default BookingContainer;

// Left to do in admin single booking page:

// Create a service provider assign dialog and assign the service provider

// if a service provider reject a service request remove the service provider from available service providers list

// if the booking has not been accepted yet, show available service provider information

// If there is no service provider available give a dialog to manually assign the service provider

// Create a section if the booking has been cancelled with the reason
