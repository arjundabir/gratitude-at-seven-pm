import React from "react";
import CalendarIntegration from "./calendar-integration";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <div className="w-full flex items-center h-10 p-2">
      <Link href="/gratitudes" className="mr-4 text-sm underline">
        View Gratitudes
      </Link>
      <CalendarIntegration />
    </div>
  );
};

export default NavigationBar;
