"use client";

import { useEffect, useState } from "react";
import { Film, Sparkles } from "lucide-react";

export type FilmStock = "neutral" | "trix" | "cinestill" | "portra";

const STOCKS: { id: FilmStock; name: string; tag: string; desc: string }[] = [
  { id: "neutral", name: "Clean Raw", tag: "DIGITAL", desc: "Unprocessed true-color capture" },
  { id: "trix", name: "Tri-X 400", tag: "B&W SILVER", desc: "High-contrast pushed analog grain" },
  { id: "cinestill", name: "CineStill 800T", tag: "TUNGSTEN", desc: "Cyan shadows & neon halation glow" },
  { id: "portra", name: "Portra 400", tag: "PASTEL", desc: "Warm nostalgic skin tones" },
];

export default function FilmStockSwitch() {
  const [stock, setStock] = useState<FilmStock>("neutral");
  const [grain, setGrain] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (stock === "neutral") {
      document.documentElement.removeAttribute("data-film-stock");
    } else {
      document.documentElement.setAttribute("data-film-stock", stock);
    }
  }, [stock]);

  useEffect(() => {
    if (grain) {
      document.body.classList.add("film-grain-active");
    } else {
      document.body.classList.remove("film-grain-active");
    }
  }, [grain]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && !e.metaKey && !e.ctrlKey) {
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const current = STOCKS.find((s) => s.id === stock) || STOCKS[0];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] select-none font-mono text-[9px]">
      {/* Popover Menu */}
      {open && (
        <div className="mb-2 p-3 bg-[var(--bg)]/95 backdrop-blur-md border hairline rounded-lg shadow-2xl w-[calc(100vw-32px)] max-w-xs sm:w-64 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b hairline pb-2">
            <span className="font-bold uppercase tracking-widest text-[var(--accent)] flex items-center gap-1.5">
              <Film size={12} />
              EMULSION ENGINE [M]
            </span>
            <button
              onClick={() => setGrain((prev) => !prev)}
              className={`px-1.5 py-0.5 rounded border hairline text-[8px] transition-colors ${
                grain ? "bg-[var(--accent)] text-black font-bold" : "opacity-60 hover:opacity-100"
              }`}
            >
              GRAIN {grain ? "ON" : "OFF"}
            </button>
          </div>

          <div className="space-y-1.5">
            {STOCKS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setStock(s.id);
                  if (s.id !== "neutral") setGrain(true);
                }}
                className={`w-full text-left p-2 rounded border hairline transition-all ${
                  stock === s.id
                    ? "border-[var(--accent)] bg-[var(--panel)] font-bold text-[var(--accent)]"
                    : "opacity-75 hover:opacity-100 hover:bg-[var(--panel)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px]">{s.name}</span>
                  <span className="text-[7.5px] px-1 py-0.2 rounded bg-black/40 text-[#eae6dd]">
                    {s.tag}
                  </span>
                </div>
                <div className="text-[8px] opacity-60 font-sans mt-0.5">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 bg-[var(--bg)]/90 backdrop-blur-md border hairline rounded-full shadow-lg hover:border-[var(--accent)] transition-all group"
        title="Toggle Film Emulation [M]"
      >
        <Film size={13} className="text-[var(--accent)] group-hover:rotate-45 transition-transform" />
        <span className="tracking-wider uppercase font-semibold">
          EMULSION: <span className="text-[var(--accent)]">{current.name}</span>
        </span>
      </button>
    </div>
  );
}

