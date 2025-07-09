import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    schema: z.object({
      messages: z.array(z.string()).length(25),
    }),
    prompt: `
    Create a list of 25 unique gratitude messages. Each message should be:

Under 100 characters

Random in theme: include people, things, food, places, life moments, etc.

For maximum of 5-10 of them, include a mix of names like Shrey, Mannat, Bardia, Meghaa, Arjun, Kiva, Ishan, Tanush, AP, Andrew, Quyen, Michele, Chris, and other common American and Indian names.

For a medium amount of them, include really short responses like Waking up today, or lunch, or the sunset, to have varied lengths as well

Sometimes refer to specific food or drinks (like boba, ramen, burritos, school, work).

Occasionally mention real coffee shops or locations around Southern California (e.g., Philz, Sidecar Donuts, In-N-Out, Alfred Coffee, Laguna Beach).

Avoid religious or political themes entirely.

Make the tone warm, casual, and positive.
    `,
  });

  const messagesToInsert = object.messages.map((message) => ({
    message,
    is_bot: true,
  }));

  const { error } = await supabase
    .from("gratitudeatsevenpm")
    .upsert(messagesToInsert);

  if (error) {
    console.error(error);
    return new Response("Error inserting bot messages", {
      status: 500,
    });
  } else
    return new Response("Success. Inserted 100 messages", {
      status: 201,
    });
}
