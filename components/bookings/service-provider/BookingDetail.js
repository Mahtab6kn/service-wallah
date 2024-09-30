import { storage } from "@/firebase";
import { Button } from "@material-tailwind/react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import UpdateServiceStatus from "./UpdateServiceStatus";
import Invoice from "./Invoice";
import { useRouter } from "next/navigation";

const mapContainerStyle = {
  width: "100%",
  height: "60vh",
};

const BookingDetail = ({ booking, setBooking }) => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input box if the current one is filled
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDownOtp = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const [otpVerified, setOtpVerified] = useState(false);
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue != booking.otp) {
      toast.error("Invalid otp");
      return;
    }
    setOtpVerified(true);
    setOtp(["", "", "", ""]);
    const postData = {
      ...booking,
      otpVerified: true,
      status: "Service provider has been reached!",
    };

    setBooking(postData);
    const res = await axios.put(`/api/bookings/${booking._id}`, postData);
  };

  const [uploadedImage, setUploadedImage] = useState("");
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (booking?.verificationImage?.url) {
      await deleteObject(ref(storage, booking?.verificationImage?.name));
    }
    const imageRef = ref(
      storage,
      `service-provider-verification-image/${
        file.lastModified + file.size + file.name
      }`
    );
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef); // Get the image URL directly
    setUploadedImage(imageUrl);
    const imageObject = { url: imageUrl, name: imageRef._location.path_ };
    const postData = {
      ...booking,
      verificationImage: imageObject,
    };
    await axios.put(`/api/bookings/${booking._id}`, postData);
  };
  useEffect(() => {
    if (booking?.otpVerified === true) {
      setOtpVerified(true);
    }
    if (booking?.otpVerified !== true) {
      setOtpVerified(false);
    }
    if (booking?.verificationImage?.url) {
      setUploadedImage(booking?.verificationImage?.url);
    }
  }, [booking]);

  const handleRejectRequest = async (id) => {
    try {
      // Filter out the rejected booking from user's bookings
      const filteredBookings = user.bookings?.filter(
        (bookingId) => bookingId !== id
      );
      const updateServiceProviderData = {
        ...user,
        bookings: filteredBookings,
      };

      // Update the user data to remove the rejected booking
      const existingServiceProviderResponse = await axios.post(
        `/api/users/update`,
        updateServiceProviderData
      );
      // Get the current booking data
      const selectedBookingResponse = await axios.get(`/api/bookings/${id}`);
      const newBooking = selectedBookingResponse.data.booking;

      // Filter out the current service provider from available service providers
      const filteredAvailableServiceProviders =
        newBooking.availableServiceProviders.filter(
          (sp) => sp._id !== user._id
        );

      // Update booking data to remove the current service provider
      const bookingData = {
        ...newBooking,
        availableServiceProviders: filteredAvailableServiceProviders,
      };

      // If there's no next service provider available
      if (filteredAvailableServiceProviders.length === 0) {
        const updateNoServiceProviderAvailableData = {
          ...bookingData,
          noServiceProviderAvailable: true,
        };

        // Mark booking as no service provider available
        const updateBookingResponse = await axios.put(
          `/api/bookings/${id}`,
          updateNoServiceProviderAvailableData
        );
        console.log({ updateBookingResponse });
        router.push(`/service-provider/booking?page=1`);
        return;
      }
      router.push(`/service-provider/booking?page=1`);
    } catch (err) {
      console.log("Error occurred:", err);
    }
  };

  const handleAcceptRequest = async (id) => {
    const eliminateServiceProviders = booking.availableServiceProviders.filter(
      (serviceProvider) => {
        return serviceProvider._id !== user._id;
      }
    );
    if (eliminateServiceProviders.length > 0) {
      const res = await axios.post(`api/bookings/eliminate-service-providers`, {
        eliminateServiceProviders,
        bookingId: id,
      });
      const response = res.data;

      if (!response.success) {
        toast.error(response.message);
        return;
      }
    }
    const postData = {
      ...booking,
      acceptedByServiceProvider: true,
      assignedServiceProviders: user,
      status: "Service is not started",
    };
    try {
      const response = await axios.put(`/api/bookings/${id}`, postData);
      if (response.status === 201) {
        setBooking(postData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-8 py-2">
      <div className="mb-8">
        <h3 className="text-blue-700 text-2xl font-medium whitespace-nowrap">
          Booking details
        </h3>
        <hr className="mb-2 mt-1" />
        <div className="text-gray-500 mb-2">
          Booking ID: {booking.bookingId}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
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
        <h3 className="text-blue-700 text-xl font-medium whitespace-nowrap">
          Customer Information
        </h3>
        <div className=" flex flex-col gap-4 sm:flex-row justify-between">
          <div className="w-full md:w-1/2 flex flex-col gap-1">
            <p>
              Full Name:{" "}
              <strong className="text-gray-600">{booking?.fullname}</strong>
            </p>
            <p>
              Phone:{" "}
              <strong className="text-gray-600">
                +91 {booking?.phoneNumber}
              </strong>
            </p>
            <p>
              Address:{" "}
              <strong className="text-gray-600">{booking?.address}</strong>
            </p>

            <p>
              Booking Date:{" "}
              <strong className="text-gray-600">{booking?.date}</strong>
            </p>
            <p>
              Status:{" "}
              <strong className="text-gray-600">{booking?.status}</strong>
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-1">
            <p>
              Day of departure:{" "}
              <strong className="text-gray-600">{booking?.date}</strong>
            </p>
            <p>
              Time of departure:{" "}
              <strong className="text-gray-600">{booking?.time}</strong>
            </p>
          </div>
        </div>
      </div>
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        loading="lazy"
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={booking?.location}
        >
          <Marker position={booking?.location} />
        </GoogleMap>
      </LoadScriptNext>
      <div className="mb-8 mt-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-julius lg:text-2xl md:text-xl sm:text-xl text-xl text-gray-700 font-bold">
                Summary
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
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
                        booking.cartItems.reduce(
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
            <tr className="text-gray-700 font-semibold">
              <td className="py-2 px-4 border-b">Total</td>
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
                        booking.cartItems.reduce(
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
      </div>
      {booking?.acceptedByServiceProvider && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {otpVerified ? (
            <div className="bg-white rounded-lg shadow-md w-full min-h-44 p-4 flex items-center flex-col justify-center">
              <div className="text-2xl font-julius text-teal-500 font-bold flex flex-col items-center gap-1">
                <RiVerifiedBadgeFill size={75} /> OTP Verified
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md w-full min-h-44 p-4 flex items-center flex-col justify-center">
              <h2 className="md:text-xl sm:text-xl text-lg text-gray-500 font-normal">
                Enter reached verification OTP
              </h2>

              <div className="w-full px-6 flex items-center flex-col md:flex-row justify-center gap-4 mt-4">
                <div className="flex items-center justify-center gap-4">
                  {otp.map((data, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        name="otp"
                        maxLength="1"
                        className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={data}
                        onChange={(e) => handleChangeOtp(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        onKeyDown={(e) => handleKeyDownOtp(e, index)}
                      />
                    );
                  })}
                </div>
                <button
                  variant="gradient"
                  color="teal"
                  className="rounded px-4 py-2 flex items-center gap-1 bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-100 transition-all font-semibold"
                  onClick={handleVerifyOtp}
                >
                  Verify <FaCheckCircle />
                </button>
              </div>
            </div>
          )}

          <div className="bg-white flex justify-center items-center rounded-lg shadow-md w-full min-h-44 p-4">
            <div className="flex gap-4 flex-col md:flex-row items-center justify-center">
              <div className="flex justify-center">
                <Image
                  width={500}
                  height={500}
                  src={uploadedImage || "https://placehold.co/400"}
                  alt="Uploaded"
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-start justify-center gap-2">
                <h2 className="md:text-xl sm:text-xl text-md text-gray-500 font-normal">
                  Upload verification image
                </h2>
                <label
                  htmlFor="verification-image"
                  className="flex items-center gap-1 w-fit cursor-pointer text-sm bg-blue-500 text-white px-4 py-2 rounded uppercase font-semibold hover:shadow-lg hover:shadow-blue-100 transition-all"
                >
                  Upload Image <MdOutlineCloudUpload />
                </label>
                <input
                  id="verification-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          {booking.otpVerified && (
            <Invoice
              selectedBooking={booking}
              setSelectedBooking={setBooking}
            />
          )}

          {booking.otpVerified && (
            <UpdateServiceStatus
              selectedNewBooking={booking}
              setSelectedNewBooking={setBooking}
            />
          )}
        </div>
      )}

      <section className="mb-8 mt-4">
        <h3 className="text-xl font-bold text-red-600">Caution:</h3>
        <ol className="list-decimal ml-6 mt-2 text-gray-700">
          <li>Accept the booking as soon as possible.</li>
          <li>Rejection cannot be undone later.</li>
          <li>Verify OTP from the customer.</li>
          <li>Attach an image of doing servicing</li>
          <li>Update the status of service According to you!</li>
          <li>
            Generate an invoice after reviewing the customer problem with the
            necessary details.
          </li>
        </ol>
      </section>
      {!booking?.acceptedByServiceProvider && (
        <div className="my-4 flex justify-end">
          <div className="flex gap-2 w-full md:w-fit">
            <Button
              variant="outlined"
              color="teal"
              ripple
              className="w-full md:w-fit md:px-10 rounded"
              onClick={() => {
                handleRejectRequest(booking?._id);
              }}
            >
              Reject
            </Button>
            <Button
              variant="gradient"
              color="teal"
              ripple
              className="w-full md:w-fit md:px-10 rounded"
              onClick={() => {
                handleAcceptRequest(booking?._id);
              }}
            >
              Accept
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
