import { supabaseClient } from "@/lib/supabase-client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const response = await supabaseClient
    .from("gratitudeatsevenpm")
    .delete()
    .neq("id", -1);

  return new Response("Gratitudes deleted", {
    status: response.status,
  });
}
