// import connectMongoDB from "@/libs/mongodb";
// import Booking from "@/models/booking";
// import User from "@/models/users";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { eliminateServiceProviders, bookingId } = await request.json();

//     eliminateServiceProviders.map(async (serviceProvider) => {
//       const sp = await User.findById(serviceProvider._id);
//       sp.bookings = sp.bookings.map((booking) => {
//         return booking !== bookingId;
//       });
//       await sp.save();
//     });

//     return NextResponse.json(body, { status: 201 });
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch bookings" },
//       { status: 500 }
//     );
//   }
// }

import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB(); // Ensure MongoDB connection is established

    const { eliminateServiceProviders, bookingId } = await request.json();

    const providerIds = eliminateServiceProviders.map(sp => sp._id);

    await User.updateMany(
      { _id: { $in: providerIds } },
      { $pull: { bookings: bookingId } }
    );

    return NextResponse.json({ message: "Bookings updated successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error updating bookings:", error);
    return NextResponse.json(
      { error: "Failed to update bookings" },
      { status: 500 }
    );
  }
}

