'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const calculateTimeToNext7PM = (): string => {
    const now: Date = new Date();

    // Get current time in Pacific timezone
    const pacificNow = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    );

    // Create date for 7 PM Pacific today
    const next7PM = new Date(pacificNow);
    next7PM.setHours(19, 0, 0, 0);

    // If it's already past 7 PM Pacific today, set to 7 PM Pacific tomorrow
    if (pacificNow.getHours() >= 19) {
      next7PM.setDate(next7PM.getDate() + 1);
    }

    // Convert Pacific time back to UTC equivalent for calculation
    const pacificOffset = now.getTime() - pacificNow.getTime();
    const next7PMUTC = new Date(next7PM.getTime() + pacificOffset);

    const diff: number = next7PMUTC.getTime() - now.getTime(); // Difference in milliseconds
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
    <footer className="flex flex-col items-center justify-center p-2">
      <Link href="/" className="hover:underline">
        <p className="font-medium">gratitude at 7 pm</p>
      </Link>
      <p className="text-sm">
        updates in:{' '}
        <span className="text-gray-400 font-normal">{timeToNext7PM}</span>
      </p>
    </footer>
  );
};

export default Footer;
