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

  const totalMessages = Math.floor(Math.random() * 48) + 20;

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      messages: z.array(z.string()).length(totalMessages),
    }),
    prompt: `
    Generate ${totalMessages} unique gratitude messages that could complete the sentence: "I'm grateful for...".

Guidelines:
- Each message must be under 50 characters.
- Vary the length: include some that are just one word, some a few words, and some short phrases.
- Cover a wide range of themes: people, objects, food, places, small joys, daily moments, nature, experiences, etc.
- Do NOT include any religious, spiritual, or political references.
- The tone should be warm, casual, positive, and occasionally humorous.
- Avoid repeating ideas or phrasing.
- Each message should stand alone as a way to finish the sentence.
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
    return new Response(`Success. Inserted ${totalMessages} messages`, {
      status: 201,
    });
}
