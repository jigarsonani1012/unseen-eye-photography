"use client";

import { IMAGES, px } from "@/lib/data";
import { Camera, Eye, FlipHorizontal, Grid, Search, Sparkles } from "lucide-react";
import { useState } from "react";

const TLR_PLATES = [
  { name: "Tomás Roofer Portrait", photo: IMAGES.portrait03, location: "Lisbon, Portugal", aperture: "f/2.8", speed: "1/125s" },
  { name: "Geese on Lake Ashi", photo: IMAGES.travel04, location: "Hakone, Japan", aperture: "f/4.0", speed: "1/250s" },
  { name: "Naples Old Quarter", photo: IMAGES.street01, location: "Naples, Italy", aperture: "f/5.6", speed: "1/500s" },
];

export default function RolleiflexFinder() {
  const [plateIdx, setPlateIdx] = useState(0);
  const [loupe, setLoupe] = useState(false); // Flip-up magnifying loupe
  const [reversed, setReversed] = useState(true); // Lateral mirror inversion

  const plate = TLR_PLATES[plateIdx];

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-2xl border hairline bg-[var(--panel)] text-[var(--fg)] shadow-2xl overflow-hidden transition-colors duration-500">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Camera size={13} />
              <span>ROLLEIFLEX 2.8F · WAIST-LEVEL 6×6 GROUND GLASS FINDER</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">
              Looking Down from the Waist
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLoupe((p) => !p)}
              className={`px-3 py-1.5 rounded-full border text-[9px] font-mono font-bold flex items-center gap-1.5 transition-colors ${
                loupe
                  ? "bg-[var(--accent)] text-black border-[var(--accent)]"
                  : "bg-[var(--bg)] border hairline text-[var(--fg)]"
              }`}
            >
              <Search size={12} />
              <span>POP-UP LOUPE: {loupe ? "ON" : "OFF"}</span>
            </button>

            <button
              onClick={() => setReversed((p) => !p)}
              className="px-3 py-1.5 rounded-full border hairline text-[9px] font-mono hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors flex items-center gap-1.5"
            >
              <FlipHorizontal size={12} />
              <span>MIRROR: {reversed ? "REVERSED" : "NORMAL"}</span>
            </button>

            <button
              onClick={() => setPlateIdx((p) => (p + 1) % TLR_PLATES.length)}
              className="px-3 py-1.5 rounded-full border hairline text-[9px] font-mono hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
            >
              NEXT FRAME
            </button>
          </div>
        </div>

        {/* 6×6 Square Focusing Hood */}
        <div className="py-8 flex flex-col items-center justify-center">
          {/* Outer Black Metal Hood Frame */}
          <div className="relative w-full max-w-md aspect-square rounded-lg p-5 sm:p-7 bg-[#1c1a16] border-8 border-[#2e2a23] shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
            {/* Square 1:1 Frosted Matte Ground Glass */}
            <div className="relative w-full h-full rounded-xs overflow-hidden border-2 border-black/80 shadow-inner bg-black">
              {/* Image with Lateral Mirror Reflection */}
              <img
                src={px(plate.photo.src, 1200)}
                alt=""
                className={`w-full h-full object-cover filter contrast-115 brightness-95 transition-all duration-300 ${
                  reversed ? "scale-x-[-1]" : ""
                } ${loupe ? "scale-150" : ""}`}
              />

              {/* Classic Red 6×6 Grid Lines */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-red-500/30">
                <div className="border-r border-b border-red-500/25" />
                <div className="border-r border-b border-red-500/25" />
                <div className="border-b border-red-500/25" />
                <div className="border-r border-b border-red-500/25" />
                <div className="border-r border-b border-red-500/25 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-red-500/30" />
                </div>
                <div className="border-b border-red-500/25" />
                <div className="border-r border-red-500/25" />
                <div className="border-r border-red-500/25" />
                <div />
              </div>

              {/* Frosted Grain Texture */}
              <div className="absolute inset-0 bg-yellow-950/10 mix-blend-color-burn pointer-events-none" />

              {/* Pop-up Magnifying Reticle Circle (When Loupe Active) */}
              {loupe && (
                <div className="absolute inset-0 border-4 border-amber-400/60 rounded-full pointer-events-none animate-pulse" />
              )}
            </div>

            {/* Rolleiflex Hood Plate Badge */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[7.5px] font-mono tracking-[0.2em] text-[#eae6dd]/40 uppercase">
              FRANKE & HEIDECKE · BRAUNSCHWEIG
            </div>
          </div>
        </div>

        {/* Technical Telemetry Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[9px] font-mono opacity-80">
          <div>VIEWING LENS: Heidosmat 80mm f/2.8</div>
          <div>TAKING LENS: Carl Zeiss Planar 80mm f/2.8</div>
          <div>EXPOSURE: {plate.aperture} · {plate.speed}</div>
          <div>FILM: 120 Roll Film (6×6 Square Negative)</div>
        </div>
      </div>
    </div>
  );
}
