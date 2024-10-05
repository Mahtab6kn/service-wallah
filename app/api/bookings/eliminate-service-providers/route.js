import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB(); // Ensure MongoDB connection is established

    const { eliminateServiceProviders, bookingId } = await request.json();

    await User.updateMany(
      { _id: { $in: eliminateServiceProviders } },
      { $pull: { bookings: bookingId } }
    );

    return NextResponse.json(
      { success: true, message: "Bookings updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error updating bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update bookings" },
      { status: 500 }
    );
  }
}
