"use client";

import React, { useContext } from "react";
import { GratitudeContext } from "./gratitude-context";
const GratitudeInput = () => {
  const { gratitudeMessage, setGratitudeMessage, onSubmit, done } =
    useContext(GratitudeContext);

  return (
    <form onSubmit={onSubmit} className="w-auto">
      <input
        autoFocus={!done}
        type="text"
        className="outline-none ring-0 bg-transparent disabled:cursor-default min-w-fit"
        value={gratitudeMessage}
        disabled={done}
        onChange={(e) => {
          if (!done) {
            setGratitudeMessage(e.target.value);
          }
        }}
      />
    </form>
  );
};

export default GratitudeInput;
