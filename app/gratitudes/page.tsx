import { Badge } from "@/components/ui/badge";
import React from "react";

const gratitudeMessages = [
  "short message",
  "a bit longer message than the previous one",
  "this is a medium length message for testing",
  "this is a much longer message to test the variable length functionality in the application",
  "tiny",
  "another medium length message to ensure variety",
  "a very very very long message to thoroughly test the variable length feature and see how it handles different lengths of text in the application",
];

const page = () => {
  return (
    <div className="h-svh w-full flex flex-col justify-center max-w-2xl mx-auto p-2">
      <p className="mr-1 max-w-lg text-left mb-1">I&apos;m grateful for:</p>
      <div className="flex flex-wrap gap-1 px-2">
        {gratitudeMessages.map((message) => (
          <Badge variant={"outline"} key={message}>
            {message}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default page;
