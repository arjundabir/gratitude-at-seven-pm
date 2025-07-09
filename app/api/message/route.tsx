import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const body = await request.json();
  const message: string = body.message;

  try {
    cookieStore.set("gratitudeMessage", JSON.stringify(message), {
      expires: new Date(new Date().setHours(19, 0, 0, 0) + 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ message }, { status: 201 });
}
