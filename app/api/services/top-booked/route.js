import connectMongoDB from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get("limit")) || 5;
  await connectMongoDB();
  const services = await Service.find({ status: "active" })
    .sort({
      createdAt: -1,
    })
    .limit(limit);
  return NextResponse.json(services, { status: 201 });
}
