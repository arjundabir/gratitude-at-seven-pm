"use client";

import React, { useContext } from "react";
import { GratitudeContext } from "./gratitude-context";

const HelperText = () => {
  const { done, onSubmit, gratitudeMessage } = useContext(GratitudeContext);

  return (
    <div
      className={
        "relative flex items-center justify-center w-full text-center mt-1 gap-1 group"
      }
    >
      {done && <div className="absolute inset-0 w-full h-full z-10" />}
      <SaveResponse
        onSubmit={(e) => onSubmit(gratitudeMessage, e)}
        display={gratitudeMessage.length > 0 && !done}
      />
    </div>
  );
};

const SaveResponse = ({
  onSubmit,
  display,
}: {
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  display: boolean;
}) => {
  return (
    <button type="submit" onClick={onSubmit} disabled={!display}>
      <kbd
        className={`transition-opacity duration-300 p-3 rounded-md w-fit h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 dark:text-gray-300 font-medium font-sans ${
          display ? "opacity-100 " : "opacity-0 pointer-events-none h-6"
        }`}
      >
        Press Enter to Save
      </kbd>
    </button>
  );
};
export default HelperText;
