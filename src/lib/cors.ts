// CORS middleware for Next.js API routes
import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://helpdeskpharmacy.vercel.app",
  "http://localhost:3000",
  "http://localhost"
];

export function cors(request: Request) {
  const origin = request.headers.get("origin");
  const isAllowed = origin && allowedOrigins.includes(origin);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Origin": isAllowed ? origin! : allowedOrigins[0],
  };
  return headers;
}
