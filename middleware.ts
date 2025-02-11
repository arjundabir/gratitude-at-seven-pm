import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const anonId = cookieStore.get("id");
  if (!anonId) cookieStore.set("id", uuidv4());

  return NextResponse.next();
}
