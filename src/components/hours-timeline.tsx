"use client";

import { HOURS, IMAGES, px } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

const TONE_BG: Record<string, string> = {
  dawn: "var(--tone-dawn)",
  day: "var(--tone-day)",
  dusk: "var(--tone-dusk)",
  night: "var(--tone-night)",
};
const TONE_FG: Record<string, string> = {
  dawn: "var(--fg)",
  day: "var(--fg)",
  dusk: "var(--fg)",
  night: "#eae6dd",
};

export default function HoursTimeline() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setProgress(p);
      setActive(Math.min(HOURS.length - 1, Math.floor(p * HOURS.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = HOURS[active].tone;

  return (
    <div ref={wrap} className="relative" style={{ background: TONE_BG[tone], transition: "background-color 1s ease" }}>
      {/* time rail */}
      <div className="pointer-events-none fixed bottom-6 left-5 z-40 hidden md:left-10 lg:block" aria-hidden>
        <p className="display text-4xl transition-colors duration-700" style={{ color: TONE_FG[tone] }}>
          {HOURS[active].time}
        </p>
        <div className="mt-3 h-px w-40 bg-current opacity-25" style={{ color: TONE_FG[tone] }}>
          <div className="h-px bg-[var(--accent)]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {HOURS.map((h, i) => {
        const img = IMAGES[h.image];
        const dark = h.tone === "night";
        return (
          <section key={h.time} className="hour-block flex items-center px-5 md:px-10" aria-label={`${h.time} — ${h.title}`}>
            <div className={`grid w-full items-center gap-8 md:grid-cols-12 ${i % 2 ? "" : ""}`}>
              <div className={i % 2 ? "md:order-2 md:col-span-7" : "md:col-span-7"}>
                <figure className="photo relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(img.src, 1800)} alt={img.alt} loading={i < 2 ? "eager" : "lazy"} className="aspect-[16/10] w-full object-cover" />
                </figure>
              </div>
              <div className={i % 2 ? "md:order-1 md:col-span-4 md:col-start-1" : "md:col-span-4 md:col-start-9"} style={{ color: TONE_FG[h.tone] }}>
                <p className="meta" style={{ color: "inherit", opacity: 0.65 }}>
                  {String(i + 1).padStart(2, "0")} — {h.location}
                </p>
                <p className="display mt-3 text-6xl md:text-7xl">{h.time}</p>
                <p className="display mt-2 text-2xl italic md:text-3xl">{h.title}</p>
                <p className="mt-6 max-w-sm text-sm leading-7" style={{ color: "inherit", opacity: 0.75 }}>
                  {h.note}
                </p>
                {dark && <p className="meta mt-8 !text-[#c8a06a]">The day is nearly edited.</p>}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
