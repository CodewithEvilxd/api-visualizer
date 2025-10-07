import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = await req.json();
    // Mock response for testing
    return NextResponse.json({
      text: "Mock Analysis: This appears to be a user data API response from Random User Generator. It provides random user profiles with details like name, location, email, login credentials, date of birth, registration info, phone numbers, ID, and profile pictures. Useful for testing applications that handle user data, populating demo databases, or UI prototyping."
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


