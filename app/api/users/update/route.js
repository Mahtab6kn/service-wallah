import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

//Update user

export async function POST(request) {
  const data = await request.json();
  await connectMongoDB();
  const user = await User.findByIdAndUpdate(data._id, data, { new: true });
  return NextResponse.json(user, { status: 201 });
}

// Forgot Password

export async function PUT(request) {
  const data = await request.json();
  await connectMongoDB();
  const user = await User.findOne({ phoneNumber: data.phoneNumber });
  user.password = data.password;
  await user.save();
  return NextResponse.json(user, { status: 201 });
}
