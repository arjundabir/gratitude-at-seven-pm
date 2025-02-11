"use server";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function addGratitudeMsg(message: string) {
  const cookieStore = await cookies();
  const anonId = await cookieStore.get("id");
  if (!anonId) throw new Error("No anonId saved");

  const existingMessage = db.find(anonId.value);
  console.log(existingMessage);

  if (existingMessage) throw new Error("Message already exists");

  db.add(anonId.value, message);

  return message;
}

export async function deleteAll() {
  db.clear();
  console.log(db);
}
