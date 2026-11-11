"use client";

import { useEffect, useState } from "react";

const TZ = "America/Denver";
const fmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });

/**
 * Current time in Denver (Mountain Time), e.g. "7:44 AM MT".
 * Rendered only in the browser (the page itself is pre-built), then updated on each new minute.
 */
export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const d = new Date();
      setNow(d);
      // Wake up right after the next minute starts.
      timer = setTimeout(tick, 60_000 - (d.getSeconds() * 1000 + d.getMilliseconds()) + 50);
    };
    tick();
    // Catch up immediately when a phone wakes or the tab comes back into view.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timer);
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <time className="live-clock" dateTime={now?.toISOString()} title="Current time in Denver (Mountain Time)">
      {now ? (
        <>
          {fmt.format(now)} <abbr title="Mountain Time">MT</abbr>
        </>
      ) : (
        // Reserve the space so nothing shifts when the time appears.
        <span aria-hidden="true">&nbsp;</span>
      )}
    </time>
  );
}
