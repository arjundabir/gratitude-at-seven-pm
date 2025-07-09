"use client";

import { supabaseClient as supabase } from "@/lib/supabase-client";
import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

interface GratitudeMessagesProps {
  id: string;
  message: string;
}

const GratitudeMessages = ({ data }: { data: GratitudeMessagesProps[] }) => {
  const [gratitudeMessages, setGratitudeMessages] =
    useState<GratitudeMessagesProps[]>(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up the channel for custom INSERT events.
    const insertChannel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "gratitudeatsevenpm",
        },
        (payload) => {
          console.log("Insert change received!", payload);
          // Update the state: prepend the new record
          setGratitudeMessages((prev) => [
            {
              id: payload.new.id,
              message: payload.new.message,
            } as GratitudeMessagesProps,
            ...prev,
          ]);
        }
      )
      .subscribe((status) => {
        console.log("Insert channel subscription status:", status);
        setIsLoading(false);
      });

    // Set up the channel for custom DELETE events.
    const deleteChannel = supabase
      .channel("custom-delete-channel")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "gratitudeatsevenpm",
        },
        (payload) => {
          console.log("Delete change received!", payload);
          // Filter out the deleted record based on its id
          setGratitudeMessages((prev) =>
            prev.filter((msg) => msg.id !== payload.old.id)
          );
        }
      )
      .subscribe((status) => {
        console.log("Delete channel subscription status:", status);
      });

    return () => {
      console.log("Cleaning up custom insert and delete channels");
      insertChannel.unsubscribe();
      deleteChannel.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-[30px] w-32" />
        <Skeleton className="h-[30px] w-16" />
        <Skeleton className="h-[30px] w-24" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 overflow-y-auto">
      {gratitudeMessages.map(({ id, message }) => (
        <Badge variant="secondary" key={id}>
          {message}
        </Badge>
      ))}
    </div>
  );
};

export default GratitudeMessages;
