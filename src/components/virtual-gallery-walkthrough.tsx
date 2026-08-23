"use client";

import { IMAGES, ROOMS, px } from "@/lib/data";
import { ArrowLeft, ArrowRight, Compass, Eye, Footprints, Layers, Sparkles } from "lucide-react";
import { useState } from "react";

export default function VirtualGalleryWalkthrough() {
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const room = ROOMS[activeRoomIdx];
  const totalFrames = room.images.length;
  const currentKey = room.images[stepIdx];
  const photo = IMAGES[currentKey];

  const nextStep = () => {
    if (stepIdx < totalFrames - 1) {
      setStepIdx((p) => p + 1);
    } else {
      setActiveRoomIdx((p) => (p + 1) % ROOMS.length);
      setStepIdx(0);
    }
  };

  const prevStep = () => {
    if (stepIdx > 0) {
      setStepIdx((p) => p - 1);
    } else if (activeRoomIdx > 0) {
      setActiveRoomIdx((p) => p - 1);
      setStepIdx(ROOMS[activeRoomIdx - 1].images.length - 1);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      {/* Museum Room Environment */}
      <div className="relative rounded-2xl border hairline bg-[#0d0c0a] p-4 sm:p-10 shadow-2xl overflow-hidden text-[#eae6dd]">
        {/* Gallery Spotlights Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent blur-2xl pointer-events-none" />

        {/* Top Room Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-20">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Compass size={13} />
              <span>DIGITAL MUSEUM CORRIDOR · PARIS EXHIBITION</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1 text-white">
              Room 0{room.id} — {room.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {ROOMS.map((r, i) => (
              <button
                key={r.id}
                onClick={() => {
                  setActiveRoomIdx(i);
                  setStepIdx(0);
                }}
                className={`px-3 py-1.5 rounded text-[9px] font-mono font-bold transition-colors ${
                  activeRoomIdx === i
                    ? "bg-[var(--accent)] text-black"
                    : "bg-black/60 border border-white/10 text-[#eae6dd] opacity-60 hover:opacity-100"
                }`}
              >
                ROOM {r.id}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Museum Wall Space */}
        <div className="relative py-12 flex flex-col items-center justify-center min-h-[460px] z-10">
          {/* Framed Artwork Hung at Eye-Level with Spotlight Shadow */}
          <div className="relative max-w-xl w-full aspect-[4/3] rounded-sm p-4 sm:p-6 bg-[#161512] border-4 border-[#2b2822] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-500 transform hover:scale-[1.01]">
            <div className="relative w-full h-full overflow-hidden rounded-xs border border-black shadow-inner">
              <img
                src={px(photo.src, 1400)}
                alt={photo.alt}
                className="w-full h-full object-cover filter contrast-[1.04]"
              />
            </div>
          </div>

          {/* Museum Brass Plaque Label */}
          <div className="mt-8 text-center space-y-1">
            <span className="display text-2xl italic text-white">{photo.alt.split(",")[0]}</span>
            <div className="meta !text-[9px] font-mono text-[var(--accent)] opacity-80">
              FRAME {stepIdx + 1} OF {totalFrames} · ARCHIVAL SILVER GELATIN PRINT
            </div>
          </div>

          {/* Museum Floor Reflection Plane */}
          <div className="w-full h-12 bg-gradient-to-b from-black/40 to-transparent mt-4 rounded-full blur-sm" />
        </div>

        {/* Bottom Walk Controls & Step Forward */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-[9px] font-mono relative z-20">
          <p className="body-serif text-sm text-[var(--fg-soft)] max-w-md italic">
            “{room.note}”
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={prevStep}
              className="px-4 py-2.5 rounded border border-white/20 hover:bg-white/10 flex items-center gap-1.5 font-bold transition-all"
            >
              <ArrowLeft size={13} />
              <span>STEP BACK</span>
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2.5 rounded bg-[var(--fg)] text-[var(--bg)] hover:opacity-90 flex items-center gap-2 font-bold transition-all shadow-xl"
            >
              <Footprints size={14} />
              <span>STEP FORWARD</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
