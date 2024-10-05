import connectMongoDB from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const { subServiceId, id } = params;
  const data = await request.json();

  await connectMongoDB();

  console.log({data});

  try {
    // Update the subService directly in the database
    const service = await Service.findById(id);
    console.log({service});
    service.subServices.forEach((subService) => {
      console.log(subService._id.toString() === subServiceId.toString())
      if (subService._id.toString() === subServiceId.toString()) {
        subService.name = data.name;
        subService.status = data.status;
        subService.price = data.price;
        subService.icon = data.icon;
      }
    });

    await service.save();

    return NextResponse.json(
      { message: "Sub-Service updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating sub-service:", error);
    return NextResponse.json(
      { message: "Failed to update sub-service", error },
      { status: 500 }
    );
  }
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
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Successfully deleted the sub-service" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting sub-service:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
