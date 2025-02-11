import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  db.clear();
  return NextResponse.json({ message: "Database cleared" }, { status: 200 });
}
