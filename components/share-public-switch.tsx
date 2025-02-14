"use client";
import React, { useContext, useState } from "react";
import { Switch } from "./ui/switch";
import { GratitudeContext } from "./gratitude-context";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";

const SharePublicSwitch = () => {
  const { gratitudeMessage, done, isPublic } = useContext(GratitudeContext);
  const [isPublicState, setIsPublicState] = useState(isPublic);

  const togglePublic = async () => {
    const newValue = !isPublicState;

    if (newValue) {
      const response = await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({ message: gratitudeMessage }),
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
        toast("Error Publishing Gratitude", {
          description: "Please try again",
        });
      }
    } else {
      const response = await fetch("/api/db", {
        method: "DELETE",
        body: JSON.stringify({ message: gratitudeMessage }),
      });
      if (response.ok) {
        toast("Gratitude Unpublished", {
          description: "View others",
          action: {
            label: "View Gratitudes",
            onClick: () => {
              window.open(
                "https://gratitudeatsevenpm.com/gratitudes",
                "_blank"
              );
            },
          },
        });
      }
    }

    setIsPublicState(newValue);
    document.cookie = `public=${newValue}; path=/;`;
  };

  return (
    done && (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="flex justify-center items-center gap-1 h-8 cursor-pointer"
        onClick={togglePublic}
        asChild
      >
        <div>
          <Switch checked={isPublicState} />
          <Label className="cursor-pointer">Publish</Label>
        </div>
      </Button>
    )
  );
};

export default SharePublicSwitch;
