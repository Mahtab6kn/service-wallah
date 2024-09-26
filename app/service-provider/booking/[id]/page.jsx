"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";
import BookingDetail from "@/components/bookings/service-provider/BookingDetail";

const Page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        if (!response.ok) {
          toast.error(`Error fetching booking!`);
        }
        const data = await response.json();
        if(!data.success){
          toast.error(data.message);
          return; 
        }
        setBooking(data.booking);
      } catch (error) {
        toast.error(`Error fetching booking!`);
        console.log("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-lg font-semibold animate-spin my-56">
            <VscLoading size={50} />
          </div>
        </div>
      ) : (
        <BookingDetail booking={booking} setBooking={setBooking} />
      )}
    </div>
  );
};

export default Page;
