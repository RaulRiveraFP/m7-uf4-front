'use client'

import { useClickContext } from './ClickContext';

export function TotalClicks() {
  const { totalClicks } = useClickContext();

  return (
    <div className="mt-4 text-lg font-semibold text-indigo-600">
      Total clicks: {totalClicks}
    </div>
  );
}
