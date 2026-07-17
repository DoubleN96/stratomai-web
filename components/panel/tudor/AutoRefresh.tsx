'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Live auto-refresh for server-rendered panels. Re-fetches the server component
// data on an interval (default 60s) via router.refresh(), and shows how long ago
// the underlying snapshot was taken. The feeder cron writes every ~10 min, so a
// 60s refresh keeps the view near-live without hammering anything.
export function AutoRefresh({ asOf, everyMs = 60000 }: { asOf: string; everyMs?: number }) {
  const router = useRouter();
  const [, setTick] = useState(0);

  useEffect(() => {
    const refresh = setInterval(() => router.refresh(), everyMs);
    const tick = setInterval(() => setTick((t) => t + 1), 30000);
    return () => {
      clearInterval(refresh);
      clearInterval(tick);
    };
  }, [router, everyMs]);

  const mins = Math.max(0, Math.round((Date.now() - new Date(asOf).getTime()) / 60000));
  const ago = mins < 1 ? 'hace segundos' : mins === 1 ? 'hace 1 min' : `hace ${mins} min`;

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#5bdc3d]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5bdc3d] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5bdc3d]" />
      </span>
      en vivo · datos {ago}
    </span>
  );
}
