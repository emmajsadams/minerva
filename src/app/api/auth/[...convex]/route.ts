import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await convexAuthNextjsToken();
  return NextResponse.json({ token });
}

export async function POST() {
  const token = await convexAuthNextjsToken();
  return NextResponse.json({ token });
}
