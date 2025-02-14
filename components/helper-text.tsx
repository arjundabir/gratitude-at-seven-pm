"use client";

import React, { useContext } from "react";
import { GratitudeContext } from "./gratitude-context";
import { Button } from "./ui/button";
import SharePublicSwitch from "./share-public-switch";
const HelperText = () => {
  const { done, onSubmit, gratitudeMessage } = useContext(GratitudeContext);

  return (
    <div
      className={
        "relative flex items-center justify-center w-full text-center mt-1 gap-1 group"
      }
    >
      {done ? (
        <SharePublicSwitch />
      ) : (
        <SaveResponse
          onSubmit={(e) => onSubmit(gratitudeMessage, e)}
          display={gratitudeMessage.length > 0 && !done}
        />
      )}
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
    <Button
      type="submit"
      onClick={onSubmit}
      variant={"secondary"}
      size={"sm"}
      className={`${
        display
          ? "transition-opacity duration-300 !opacity-100 "
          : "!opacity-0 pointer-events-none"
      }`}
    >
      Press Enter to Save
    </Button>
  );
};
export default HelperText;
