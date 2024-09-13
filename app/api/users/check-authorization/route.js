import { isLoggedIn } from "@/libs/isLoggedIn";
import { NextResponse } from "next/server";

export async function GET(request) {
  const user = await isLoggedIn(request);
  return NextResponse.json(user);
}
