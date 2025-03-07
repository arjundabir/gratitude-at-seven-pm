"use client";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface GratitudeContextProviderProps {
  children: React.ReactNode;
  message?: string;
  isPublic?: boolean;
}

export const GratitudeContext = createContext({
  gratitudeMessage: "",
  setGratitudeMessage: (message: string) => {
    console.log(message);
  },
  // ts-expect-error don't want to specify html element
  onSubmit: (message: string, e: React.FormEvent) => {
    console.log(message, e);
  },
  done: true,
  isPublic: false,
});

const GratitudeContextProvider = ({
  children,
  message,
  isPublic,
}: GratitudeContextProviderProps) => {
  const [done, setDone] = useState(message ? true : false);
  const [gratitudeMessage, setGratitudeMessage] = useState(message);
  const [isPublicState, setIsPublicState] = useState(isPublic || false);

  useEffect(() => {
    const interval = setInterval(() => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("gm="));
      const currentMessage = cookie
        ? decodeURIComponent(cookie.split("=")[1])
        : "";

      if (done) {
        if (!currentMessage && gratitudeMessage) {
          setGratitudeMessage("");
          setDone(false);
        } else if (currentMessage && currentMessage !== gratitudeMessage) {
          setGratitudeMessage(currentMessage);
          setDone(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gratitudeMessage, done]);

  // Check for public cookie value
  useEffect(() => {
    const publicCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("public="));
    if (publicCookie) {
      setIsPublicState(publicCookie.split("=")[1] === "true");
    }
  }, []);

  const publishGratitude = async (message: string) => {
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        toast("Gratitude Published", {
          description: "View yours, and others",
          action: {
            label: "View Gratitudes",
            onClick: () => {
              window.open("/gratitudes", "_blank");
            },
          },
        });
      } else {
        console.error("Failed to publish gratitude");
      }
    } catch (error) {
      console.error("Error publishing gratitude:", error);
    }
  };

  const onSubmit = async (message: string, e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Set cookie to expire at 7 PM local time
      const now = new Date();
      const expires = new Date();
      expires.setHours(19, 0, 0, 0);

      // If it's already past 7 PM, set for next day
      if (now >= expires) {
        expires.setDate(expires.getDate() + 1);
      }

      document.cookie = `gm=${encodeURIComponent(
        message
      )};expires=${expires.toUTCString()};path=/`;
      setGratitudeMessage(message);
      setDone(true);

      // If isPublic is true, automatically publish the gratitude
      if (isPublicState) {
        await publishGratitude(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GratitudeContext.Provider
      value={{
        gratitudeMessage: gratitudeMessage || "",
        setGratitudeMessage,
        onSubmit,
        done,
        isPublic: isPublicState,
      }}
    >
      {children}
    </GratitudeContext.Provider>
  );
};
export default GratitudeContextProvider;
