"use client";

import React, { createContext, useState } from "react";

interface GratitudeContextProviderProps {
  gratitudeMessageCookie?: string;
  children: React.ReactNode;
}

export const GratitudeContext = createContext({
  gratitudeMessage: "",
  setGratitudeMessage: (message: string) => {
    console.log(message);
  },
  done: false,
  setDone: (done: boolean) => {
    console.log(done);
  },
  onSubmit: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    console.log(e);
  },
  gratitudeMessageCookie: "",
});

const GratitudeContextProvider = ({
  gratitudeMessageCookie,
  children,
}: GratitudeContextProviderProps) => {
  const [gratitudeMessage, setGratitudeMessage] = useState(
    gratitudeMessageCookie || ""
  );
  const [done, setDone] = useState(gratitudeMessageCookie ? true : false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({ message: gratitudeMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setGratitudeMessage(data.message);
        setDone(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GratitudeContext.Provider
      value={{
        gratitudeMessage,
        setGratitudeMessage,
        done,
        setDone,
        onSubmit,
        gratitudeMessageCookie: gratitudeMessageCookie || "",
      }}
    >
      <div className="w-full">{children}</div>
    </GratitudeContext.Provider>
  );
};

export default GratitudeContextProvider;
