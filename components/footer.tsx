"use client";

import React, { useEffect, useState } from "react";

const Footer = () => {
  const calculateTimeToNext7PM = (): string => {
    const now: Date = new Date();
    const next7PM: Date = new Date();
    next7PM.setHours(19, 0, 0, 0); // Set to 7 PM today

    if (now.getHours() >= 19) {
      // If it's already past 7 PM today, set to 7 PM tomorrow
      next7PM.setDate(next7PM.getDate() + 1);
    }

    const diff: number = next7PM.getTime() - now.getTime(); // Difference in milliseconds
    const hours: number = Math.floor(diff / (1000 * 60 * 60));
    const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeToNext7PM, setTimeToNext7PM] = useState(calculateTimeToNext7PM());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToNext7PM(calculateTimeToNext7PM());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center absolute z-10 bottom-1 inset-x-0">
      <p className="font-medium">gratitude at 7 pm</p>
      <p className="text-sm">
        updates in:{" "}
        <span className="text-gray-400 font-normal">{timeToNext7PM}</span>
      </p>
    </div>
  );
};

export default Footer;
