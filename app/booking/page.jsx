"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserBooking from "@/components/UserBooking";
import ServiceProviderBooking from "@/components/ServiceProviderBooking";
import { VscLoading } from "react-icons/vsc";

const Booking = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const checkingAuthorization = async () => {
    const id = localStorage.getItem("token");
    if (!id) {
      window.location.href = "/";
      return;
    }
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    checkingAuthorization();
  }, []);
  const [serviceProviderBookings, setServiceProviderBookings] = useState([]);
  const gettingUser = async () => {
    try {
      const id = localStorage.getItem("token");
      const response = await axios.get(`/api/users/${id}`);
      const data = response.data;
      const res = await axios.post(
        `/api/bookings/bookings-from-array-of-id`,
        data?.bookings
      );
      const allBookings = res.data;
      setServiceProviderBookings(allBookings);
      setUser(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after the user is fetched
    }
  };

  useEffect(() => {
    gettingUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-lg font-semibold animate-spin my-56">
            <VscLoading size={50} />
          </div>
        </div>
      ) : user?.role === "user" ? (
        <UserBooking user={user} allBookings={serviceProviderBookings} />
      ) : (
        <ServiceProviderBooking
          user={user}
          serviceProviderBookings={serviceProviderBookings}
        />
      )}
    </div>
  );
};

export default Booking;
