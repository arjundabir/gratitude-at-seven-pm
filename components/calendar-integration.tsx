"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CalendarIntegration = () => {
  const createGoogleCalendarEvent = () => {
    const event = {
      text: "gratitude",
      dates: {
        start: new Date(),
        end: new Date(),
      },
      recurrence: "RRULE:FREQ=DAILY",
      location: "gratitudeatsevenpm.com",
    };

    // Set the time to 7 PM for both start and end
    event.dates.start.setHours(19, 0, 0, 0);
    event.dates.end.setHours(19, 5, 0, 0); // 5-minute duration

    const googleCalendarUrl = new URL(
      "https://calendar.google.com/calendar/render"
    );
    googleCalendarUrl.searchParams.append("action", "TEMPLATE");
    googleCalendarUrl.searchParams.append("text", event.text);
    googleCalendarUrl.searchParams.append(
      "dates",
      `${event.dates.start
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")}/` +
        `${event.dates.end
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "")}`
    );
    googleCalendarUrl.searchParams.append("recur", event.recurrence);
    googleCalendarUrl.searchParams.append("location", event.location);

    window.open(googleCalendarUrl.toString(), "_blank");
  };

  const createAppleCalendarEvent = () => {
    const event = {
      text: "gratitude",
      dates: {
        start: new Date(),
        end: new Date(),
      },
      recurrence: "FREQ=DAILY",
      location: "gratitudeatsevenpm.com",
    };

    // Set the time to 7 PM for both start and end
    event.dates.start.setHours(19, 0, 0, 0);
    event.dates.end.setHours(19, 5, 0, 0); // 5-minute duration

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//gratitudeatsevenpm.com//Daily Gratitude//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.text}`,
      `DTSTART:${event.dates.start
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")}`,
      `DTEND:${event.dates.end
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")}`,
      `LOCATION:${event.location}`,
      `RRULE:${event.recurrence}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "gratitudeatsevenpm.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-2 ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-sm underline px-2 py-1.5 focus:outline-none">
            Add Daily Reminder
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent collisionPadding={10} side="bottom">
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={createGoogleCalendarEvent}
          >
            Google Calendar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={createAppleCalendarEvent}
          >
            Apple Calendar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CalendarIntegration;
