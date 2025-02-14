"use client";
import React, { createContext, useState, useEffect } from "react";

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
        isPublic: isPublic || false,
      }}
    >
      {children}
    </GratitudeContext.Provider>
  );
};
export default GratitudeContextProvider;
