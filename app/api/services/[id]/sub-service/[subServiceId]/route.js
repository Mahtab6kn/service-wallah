import connectMongoDB from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

export async function POST(request, { params }) {
  const { subServiceId, id } = params;
  const { data } = await request.json();
  await connectMongoDB();

  // Update the subService directly in the database without fetching the whole document
  await Service.updateOne(
    { _id: id, "subServices._id": subServiceId },
    {
      $set: {
        "subServices.$.name": data.name,
        "subServices.$.status": data.status,
        "subServices.$.price": data.price,
        "subServices.$.icon": data.icon,
      },
    }
  );

  return NextResponse.json("Sub Services Updated Successfully", {
    status: 201,
  });
}

export async function DELETE(request, { params }) {
  const { subServiceId, id } = params;

  try {
    // Connect to the database
    await connectMongoDB();

    // Convert subServiceId to ObjectId using 'new'
    const objectId = new mongoose.Types.ObjectId(subServiceId);

    // Pull the sub-service from the Service's subServices array
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $pull: { subServices: { _id: objectId } } }, // Correct comparison using ObjectId
      { new: true } // Return the updated document
    ).lean();

    if (!updatedService) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully deleted the sub-service' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting sub-service:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}