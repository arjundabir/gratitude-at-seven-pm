import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("gratitudeMessage");
  return new Response("Gratitude message cookie deleted");
}
