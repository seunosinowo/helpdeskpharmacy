import { NextResponse } from "next/server";
import { cors } from "@/lib/cors";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Use credentials from .env
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username === adminUsername && password === adminPassword) {
    const headers = cors(request);
    const response = new NextResponse(JSON.stringify({ success: true }), { status: 200, headers });
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return response;
  }

  const headers = cors(request);
  return new NextResponse(JSON.stringify({ success: false }), { status: 401, headers });
}
