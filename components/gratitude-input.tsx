"use client";

import React, { useContext, useEffect, useRef } from "react";
import { GratitudeContext } from "./gratitude-context";

const GratitudeInput = () => {
  const { onSubmit, done, gratitudeMessage, setGratitudeMessage } =
    useContext(GratitudeContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [gratitudeMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // ts-expect-error don't want to specify html element
      onSubmit(gratitudeMessage, e);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => onSubmit(gratitudeMessage, e)}
        className="inline-flex"
      >
        <textarea
          ref={textareaRef}
          autoFocus
          className="outline-none ring-0 bg-transparent disabled:opacity-100 disabled:text-inherit w-full resize-none overflow-hidden text-black dark:text-white"
          value={gratitudeMessage}
          disabled={done}
          onChange={(e) => setGratitudeMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
      </form>
    </div>
  );
};

export default GratitudeInput;
