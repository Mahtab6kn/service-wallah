import User from "@/models/users";
import jwt from "jsonwebtoken";
import connectMongoDB from "./mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function isLoggedIn(request) {
  const token = request.cookies.get("token");
  if (!token) {
    return { message: "Unauthorized" };
  }

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET);
    connectMongoDB();
    const user = await User.findById(decoded.id);
    if (!user) {
      return { success: false, message: "User not found!" };
    }
    return { success: true, user };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}
