import User from "@/models/users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const { value } = request.cookies.get("token");
  const token = value;
  if (!token) {
    return NextResponse.json(
      { success: false, data: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: "Invalid token" },
      { status: 401 }
    );
  }
}
