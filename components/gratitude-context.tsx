"use client";

import { addGratitudeMsg } from "@/actions";
import React, { createContext, useState } from "react";

interface GratitudeContextProviderProps {
  children: React.ReactNode;
  message?: string;
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
});

const GratitudeContextProvider = ({
  children,
  message,
}: GratitudeContextProviderProps) => {
  const [done, setDone] = useState(message ? true : false);
  const [gratitudeMessage, setGratitudeMessage] = useState(message);
  // ts-expect-error don't want to specify html element
  const onSubmit = async (message: string, e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedMessage = await addGratitudeMsg(message);
      if (addedMessage) {
        setGratitudeMessage(addedMessage);
        setDone(true);
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
      }}
    >
      {children}
    </GratitudeContext.Provider>
  );
};
export default GratitudeContextProvider;
