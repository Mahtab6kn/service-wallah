import { NextResponse } from "next/server";

export async function GET(req, res) {
  // Clear the cookie by setting it to empty and expired
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0), // Set cookie expiration to a past date to remove it
  });

  return response;
}
